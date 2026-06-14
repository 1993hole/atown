/* ============================================================
   A Tale of Two Nights — prototype engine (vanilla JS)
   데이터(JSON) 구동 비주얼 노벨 + 허브 내비게이션 + 단서/수사노트
   ============================================================ */
'use strict';
const $ = s => document.querySelector(s);

let CH = {}, CL = {}, ACT = null;        // characters / clues / current act data
const S = {                              // runtime state
  scene: null, beats: [], i: 0, playerName: '', curLoc: null,
  talked: new Set(), clues: [], notes: [],
  goal: null, uiUnlocked: false, lastPortrait: null, tutorialShown: false
};
let _typeTimer = null, _typeFull = '';   // 타이핑 효과

/* ── 클릭음 (Web Audio 오실레이터 합성 — 파일 불필요·지연 0) ── */
let _actx = null;
function playClick(){
  try{
    if(!_actx) _actx = new (window.AudioContext || window.webkitAudioContext)();
    if(_actx.state === 'suspended') _actx.resume();
    const t = _actx.currentTime;
    const o = _actx.createOscillator(), g = _actx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(600, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.10, t + 0.004);   // 빠른 어택
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);  // 짧은 감쇠 → "톡"
    o.connect(g); g.connect(_actx.destination);
    o.start(t); o.stop(t + 0.08);
  }catch(e){}
}

/* 배경 키 → 상단바 장소 표시명 */
const PLACES = {
  manor_exterior_night:'그레이번 저택 — 외관', manor_exterior_dawn:'그레이번 저택 — 새벽',
  manor_entrance_night:'저택 현관', ballroom_full_night:'연회장', ballroom_corner_night:'연회장 한편',
  ballroom_entrance_night:'연회장 입구', ballroom_invitation_table:'연회장 입구',
  hall_night:'홀', hall_window_night:'홀 — 창가', hall_corner_night:'홀 — 구석',
  bar_corner_night:'바 코너', bar_corner_inner_night:'바 코너 안쪽',
  parlor_night:'응접실', corridor_night:'복도',
  corridor_crime_scene_night:'복도 — 현장', corridor_crime_scene_night_red:'복도 — 현장',
  corridor_office_front_night:'집무실 앞 복도', study_night:'서재', office_night:'집무실',
  corridor_2nd_floor_night:'2층 복도', lucian_room_night:'루시안의 방',
  attic_night:'다락', attic_secret_night:'다락 — 비밀 공간', attic_secret_dawn:'다락 — 비밀 공간'
};

/* ── boot ── (데이터는 index.html의 <script>로 미리 로드된 전역) ── */
function boot(){
  try{
    CH = window.DATA_CHARACTERS; CL = window.DATA_CLUES; ACT = window.DATA_ACT1;
    if(!CH || !CL || !ACT) throw new Error('데이터 스크립트가 로드되지 않았습니다 (data/*.js 확인).');
    $('#loading').style.display = 'none';
  }catch(e){
    $('#loading').textContent = '데이터 로드 실패: ' + e.message;
    console.error(e);
  }
}

/* ── helpers ── */
const esc = s => (s||'').replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
const allTalks = () => ACT.hub.locations.flatMap(l => l.talks);
function show(id){ document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id===id)); }
function setBg(el, key){ if(key) el.style.backgroundImage = `url('assets/backgrounds/bg_${key}.png')`; }
/* 씬 배경 — 바뀔 때 페이드(아웃→교체→인) */
let _bgTimer = null;
function setSceneBg(key){
  if(!key) return;
  const el=$('#scene-bg'), url=`url('assets/backgrounds/bg_${key}.png')`;
  if(el.style.backgroundImage===url) return;
  clearTimeout(_bgTimer);
  el.style.opacity='0';
  _bgTimer=setTimeout(()=>{ el.style.backgroundImage=url; el.style.opacity='1'; }, 340);
}
/* 즉시 교체 (다른 화면→씬 진입 시: 화면 크로스페이드가 전환 담당, 옛 배경 안 비침) */
function setSceneBgInstant(key){
  if(!key) return;
  clearTimeout(_bgTimer);
  const el=$('#scene-bg');
  el.style.backgroundImage=`url('assets/backgrounds/bg_${key}.png')`;
  el.style.opacity='1';
}
function updateLocation(key){ const el=$('#tb-loc'); if(el) el.textContent = PLACES[key] || (ACT && ACT.hub && ACT.hub.title) || ''; }
function setActPips(actId){ const n={act1:1,act2:2,act3:3}[actId]||1; [1,2,3].forEach(i=>$('#pip'+i).classList.toggle('on', i===n)); }
function revealUI(){ ['btn-notes','btn-inv'].forEach(id=>{ const e=$('#'+id); e.classList.remove('hidden'); e.classList.add('revealed'); }); }
function hideUI(){ ['btn-notes','btn-inv'].forEach(id=>{ const e=$('#'+id); e.classList.add('hidden'); e.classList.remove('revealed'); }); }
function showTutorial(){ if(S.tutorialShown) return; S.tutorialShown=true; $('#tutorial').classList.add('show'); $('#topbar').classList.add('tut-raise'); }
function dismissTutorial(){ $('#tutorial').classList.remove('show'); $('#topbar').classList.remove('tut-raise'); }

function setPortrait(src){
  const p=$('#scene-portrait'), img=p.querySelector('img');
  if(img.getAttribute('src')===src && p.classList.contains('show')) return;   // 같은 인물 → 유지
  const wasShown = p.classList.contains('show');
  p.classList.remove('show');                       // 페이드 아웃
  const swap = ()=>{ img.src=src; setTimeout(()=> p.classList.add('show'), 30); };
  if(wasShown) setTimeout(swap, 200); else swap();   // 인물 교체 시 잠깐 뒤 페이드 인
  S.lastPortrait=src;
}
function clearPortrait(){ $('#scene-portrait').classList.remove('show'); S.lastPortrait=null; }   /* 페이드 아웃(이미지는 opacity로 숨김) */

/* ── act / scene flow ── */
function resetState(){ S.talked=new Set(); S.clues=[]; S.notes=[]; S.goal=null; S.uiUnlocked=false; S.curLoc=null; S.tutorialShown=false;
  hideUI(); dismissTutorial(); $('#goal-text').textContent='—'; $('#goal-prog').textContent=''; renderNotes(); renderInv(); }

function startAct(act){ ACT=act; resetState(); setActPips(act.id); runScene(act.start); }

function runScene(id){
  const sc = ACT.scenes[id];
  if(!sc){ console.error('no scene', id); return; }
  S.scene = id;
  S.beats = JSON.parse(JSON.stringify(sc.beats));   // clone (choices splice into it)
  S.i = 0;
  clearPortrait();
  $('#blackout').classList.remove('on');
  $('#choices').style.display='none';
  show('sc-scene');
  step();
}

function step(){
  while(S.i < S.beats.length){
    const b = S.beats[S.i++];
    if('bg' in b){ setSceneBg(b.bg); clearPortrait(); updateLocation(b.bg); }
    if('blackout' in b){ $('#blackout').classList.toggle('on', !!b.blackout); }
    // bgm/se: 오디오 에셋 없음 — 무시 (추후 연결). tint/color: 사용 안 함(사용자가 배경 이미지에 직접)

    if(b.quest){ setGoal(b.quest); continue; }
    if(b.note){ addNote(b.note.title, b.note.body); continue; }
    if(b.unlockUI){ S.uiUnlocked=true; revealUI(); showTutorial(); continue; }
    if('goto' in b){ runScene(b.goto); return; }
    if(b.hub){ finishToHub(); return; }
    if(b.end){ actEnd(); return; }

    if(b.clue){ showClue(b.clue); return; }                       // blocking
    if(b.options){ showChoices(b); return; }                      // blocking
    if(('text' in b) || ('who' in b)){ renderLine(b); return; }   // blocking
    // 그 외(bg/tint/blackout 전용 비트)는 즉시 다음으로
  }
}

/* ── 타이핑 효과 ── */
function typeText(el, text){
  clearInterval(_typeTimer); _typeFull=text; el.textContent='';
  let i=0;
  _typeTimer=setInterval(()=>{ el.textContent=text.slice(0, ++i);
    if(i>=text.length){ clearInterval(_typeTimer); _typeTimer=null; } }, 22);
}
const typingActive = ()=> _typeTimer !== null;
function finishTyping(){ if(_typeTimer){ clearInterval(_typeTimer); _typeTimer=null; $('#dlg-text').textContent=_typeFull; } }

function renderLine(b){
  $('#choices').style.display='none';
  $('#dialogue').classList.remove('compact');        // 일반 대화 땐 대화창 기본 높이 복원
  const nameEl=$('#dlg-name'), txtEl=$('#dlg-text');
  nameEl.className='dlg-name'; txtEl.className='dlg-text';
  if(!b.who){                                       // 나레이션(독백) — 캐릭터 헤더 제거
    nameEl.classList.add('narrator'); txtEl.classList.add('narrator'); nameEl.textContent='';
    clearPortrait();
  } else if(b.who==='player'){                       // 플레이어 (이름 표시, 직전 포트레이트 유지)
    nameEl.classList.add('player'); nameEl.textContent = S.playerName || '나';
  } else {                                           // 캐릭터
    const c = CH[b.who] || {name:b.who, portrait:null};
    nameEl.textContent=c.name; if(c.portrait) setPortrait(c.portrait);
  }
  typeText(txtEl, (b.text || '').replace(/\{플레이어\}/g, S.playerName || ''));
}

/* 나레이션 한 줄 (접근 안내 등) */
function renderNarration(text){
  $('#choices').style.display='none';
  const n=$('#dlg-name'), t=$('#dlg-text');
  n.className='dlg-name narrator'; t.className='dlg-text narrator'; n.textContent='';
  typeText(t, text);
}

/* 선택지 렌더 (분기 · 접근 공통) — items:[{label, onPick}] */
function renderChoices(items){
  const box=$('#choices'); box.innerHTML=''; box.style.display='flex';
  $('#dialogue').classList.add('compact');           // 선택지 뜰 땐 대화창 빈 공간 제거
  items.forEach(it=>{
    const btn=document.createElement('button'); btn.className='choice-btn'; btn.textContent=it.label;
    btn.addEventListener('click', e=>{ e.stopPropagation(); playClick(); box.style.display='none'; it.onPick(); });
    box.appendChild(btn);
  });
}

function showChoices(b){
  renderChoices(b.options.map(opt=>({
    label: opt.label,
    onPick: ()=>{ if(opt.then && opt.then.length) S.beats.splice(S.i, 0, ...opt.then); step(); }
  })));
}

/* ── 공간 접근 (대화창 리스트 — "누구에게 다가갈까") ── */
function enterLocation(locId){
  const loc = ACT.hub.locations.find(l=>l.id===locId);
  const undone = loc.talks.filter(t=>!S.talked.has(t));
  if(!undone.length){ S.curLoc=null; showHub(); return; }
  S.curLoc = locId;
  const onScene = $('#sc-scene').classList.contains('active');   // 이미 씬이면 페이드, 허브에서 진입이면 즉시
  if(loc.bg){ (onScene ? setSceneBg : setSceneBgInstant)(loc.bg); updateLocation(loc.bg); }
  clearPortrait();
  show('sc-scene');
  renderNarration(`${loc.name}. 손님들이 여전히 대화를 나누고 있다.\n누구에게 다가갈까.`);
  const items = undone.map(t=>{ const c=CH[t.replace('talk_','')]||{name:t};
    return { label:`${c.name}에게 다가간다`, onPick:()=>runScene(t) }; });
  items.push({ label:'다른 공간을 둘러본다', onPick:()=>{ S.curLoc=null; showHub(); } });
  renderChoices(items);
}

function showClue(id){
  const c = CL[id]; if(!c){ step(); return; }
  const ov=$('#clue-overlay'), img=$('#clue-img');
  if(c.img){ img.src=c.img; img.style.display='block'; } else { img.style.display='none'; }
  $('#clue-title').textContent=c.title;
  $('#clue-desc').textContent=c.desc||'';
  ov.classList.add('show');
  if(!S.clues.some(x=>x.id===id)){ S.clues.push({id, ...c}); renderInv(); }
  addNote(c.title, (c.tag ? '['+c.tag+'] ' : '') + (c.desc||''));
  ov.onclick = ()=>{ playClick(); ov.classList.remove('show'); ov.onclick=null; step(); };
}

/* ── hub ── */
function finishToHub(){
  if(allTalks().includes(S.scene)) S.talked.add(S.scene);
  updateGoal();
  if(S.talked.size >= allTalks().length){ S.curLoc=null; runScene(ACT.hub.onComplete); return; }
  if(S.curLoc){ enterLocation(S.curLoc); return; }   // 같은 공간 접근 리스트로 복귀
  showHub();
}

function showHub(){
  const h=ACT.hub, talks=allTalks();
  setBg($('#hub-bg'), h.background);
  $('#hub-title').textContent = h.title;
  $('#hub-sub').textContent = (h.subtitle||'') + `   (${S.talked.size}/${talks.length})`;
  const list=$('#hub-list'); list.innerHTML='';
  h.locations.forEach(loc=>{
    const undone = loc.talks.filter(t=>!S.talked.has(t));
    const box=document.createElement('button');
    box.className='hub-box' + (undone.length ? '' : ' done');
    box.textContent=loc.name;
    if(undone.length){ box.addEventListener('click', ()=> enterLocation(loc.id)); }
    list.appendChild(box);
  });
  show('sc-hub');
}

/* ── quest / notes / inventory ── */
function setGoal(q){
  if(q.action==='complete' && S.goal && S.goal.id===q.id){ S.goal={...S.goal, done:true}; }
  else { S.goal={id:q.id, label:q.label, done:q.action==='complete'}; }
  updateGoal();
}
function updateGoal(){
  if(!S.goal){ $('#goal-text').textContent='—'; $('#goal-prog').textContent=''; return; }
  $('#goal-text').textContent = S.goal.label || '';
  let p='';
  if(S.goal.done) p='완료 ✓';
  else if(S.goal.id==='M1-1') p=`${S.talked.size} / ${allTalks().length}`;
  $('#goal-prog').textContent = p;
}

function addNote(t,b){ S.notes.push({t,b}); renderNotes(); }
function renderNotes(){
  const body=$('#notes-body'); if(!body) return;
  body.innerHTML = S.notes.length
    ? S.notes.map(n=>`<div class="note-item"><div class="nt">${esc(n.t)}</div><div class="nb">${esc(n.b)}</div></div>`).join('')
    : '<div class="panel-empty">아직 기록된 단서가 없습니다.</div>';
}
function renderInv(){
  const g=$('#inv-grid'); if(!g) return;
  g.innerHTML = S.clues.length
    ? S.clues.map(c=> c.img
        ? `<div class="inv-cell" title="${esc(c.title)}"><img src="${c.img}" alt="${esc(c.title)}"></div>`
        : `<div class="inv-cell"><span class="txt">${esc(c.title)}</span></div>`).join('')
    : '<div class="panel-empty">없음</div>';
}
function togglePanel(id){
  document.querySelectorAll('.panel').forEach(p=>{ if(p.id!==id) p.classList.remove('open'); });
  $('#'+id).classList.toggle('open');
}

/* ── act end ── */
function actEnd(){
  const act2 = window.DATA_ACT2 || null;   // act2.js 로드 시 자동 활성화
  const card=$('#act-card'), btn=$('#act-card-btn');
  $('#act-card-title').textContent = ACT.title || 'ACT';
  if(act2){
    $('#act-card-msg').textContent = '인터랙티브 핵심 — 선택지 시연으로 이어집니다.';
    btn.textContent = 'ACT 2 (선택지 데모)';
    btn.onclick = ()=>{ card.classList.remove('show'); startAct(act2); };
  } else {
    $('#act-card-msg').textContent = '여기까지 ACT 1 데모입니다.\n(ACT 2 이후는 발표 후 제작 예정)';
    btn.textContent = '타이틀로';
    btn.onclick = ()=>{ card.classList.remove('show'); show('sc-title'); };
  }
  card.classList.add('show');
}

/* ── 게임 시작 (이름 입력 후) ── */
function startGame(){
  S.playerName = ($('#name-input').value || '').trim() || '탐정';
  if(CH.player) CH.player.name = S.playerName;
  startAct(ACT);
}

/* ── input wiring ── */
function tryAdvance(){    // 대화 진행은 무음 (클릭음 없음)
  if(typingActive()){ finishTyping(); return; }     // 타이핑 중 클릭 → 즉시 완성
  if($('#choices').style.display !== 'none') return;
  if($('#clue-overlay').classList.contains('show')) return;
  if(document.querySelector('.panel.open')) return;
  step();
}
$('#stage').addEventListener('click', tryAdvance);
$('#dialogue').addEventListener('click', tryAdvance);
$('#tutorial').addEventListener('click', dismissTutorial);   // 튜토리얼 클릭 시 닫기

/* 버튼류 클릭음 (선택지는 renderChoices에서 직접 처리) */
document.addEventListener('click', e=>{
  if(e.target.closest('.btn,.pro-btn,.name-ok,.hub-box,.ic-btn,.panel-close')) playClick();
});

$('#btn-start').addEventListener('click', ()=> show('sc-prologue'));        // 타이틀 → 초대장
$('#btn-accept').addEventListener('click', ()=> show('sc-name'));           // 응한다 → 이름
$('#btn-decline').addEventListener('click', ()=> show('sc-title'));         // 거절 → 타이틀
$('#btn-enter').addEventListener('click', startGame);                       // 저택에 들어간다
$('#name-input').addEventListener('keydown', e=>{ if(e.key==='Enter') startGame(); });

$('#btn-notes').addEventListener('click', ()=>togglePanel('panel-notes'));
$('#btn-inv').addEventListener('click', ()=>togglePanel('panel-inv'));
document.querySelectorAll('.panel-close').forEach(b=> b.addEventListener('click', ()=>$('#'+b.dataset.close).classList.remove('open')));

boot();
