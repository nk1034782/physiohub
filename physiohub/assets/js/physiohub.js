(async function(){
  async function loadJSON(path){
    try{const res=await fetch(path);return await res.json()}catch(e){return []}
  }
  const conditions = await loadJSON('/data/sample.conditions.json');
  const mcqs = await loadJSON('/data/sample.mcqs.json');
  const exercises = await loadJSON('/data/sample.exercises.json');

  const studyEl = document.getElementById('studyCategories');
  if(studyEl){
    const subjects = ['Anatomy','Assessment','Exercise Therapy','Electrotherapy','Neurorehabilitation','Orthopaedics','Cardiopulmonary','Sports'];
    studyEl.innerHTML = subjects.map(s=>`<div class="card"><h3>${s}</h3><p>Introductory notes and study materials (sample)</p><a class="btn" href="/physiohub/study-hub/">Open</a></div>`).join('');
  }

  const condListEl = document.getElementById('conditionsList');
  if(condListEl){
    function renderConditions(list){
      condListEl.innerHTML = list.map(c=>`<div class="card"><h3>${c.title}</h3><p class="muted">${c.category}</p><p>${(c.definition||'').slice(0,120)}...</p><a class="btn" href="/physiohub/conditions/${c.slug}.html">Open</a></div>`).join('');
    }
    renderConditions(conditions);
    const condSearch = document.getElementById('condSearch');
    const condFilter = document.getElementById('condFilter');
    if(condSearch){condSearch.addEventListener('input', e=>{const q=e.target.value.toLowerCase();renderConditions(conditions.filter(c=>c.title.toLowerCase().includes(q)||(c.definition||'').toLowerCase().includes(q)));});}
    if(condFilter){condFilter.addEventListener('change', e=>{const v=e.target.value;renderConditions(v?conditions.filter(c=>c.category===v):conditions);});}
  }

  const exerciseList = document.getElementById('exerciseList');
  if(exerciseList){ exerciseList.innerHTML = exercises.map(ex=>`<div class="card"><h3>${ex.title}</h3><p>${ex.target}</p><p>${ex.procedure.slice(0,100)}...</p></div>`).join(''); }

  const qpList = document.getElementById('questionPapers');
  if(qpList){ qpList.innerHTML = (await loadJSON('/data/sample.question-papers.json') || []).map(p=>`<div class="card"><h3>${p.title}</h3><p>${p.subject} · ${p.year}</p><div><a class="btn" href="#">View</a> <a class="btn" href="#">Download</a></div></div>`).join(''); }

  const mcqQuestion = document.getElementById('mcqQuestion');
  if(mcqQuestion){
    let idx=0, score=0;
    function renderMCQ(){const q=mcqs[idx];mcqQuestion.innerHTML=`<h3>Q${idx+1}. ${q.question}</h3>`;document.getElementById('mcqOptions').innerHTML=q.options.map((o,i)=>`<div><label><input name="opt" type="radio" value="${i}"> ${o}</label></div>`).join('');document.getElementById('mcqResult').innerHTML='';}
    document.getElementById('mcqNext').addEventListener('click', ()=>{if(idx<mcqs.length-1) idx++; renderMCQ();});
    document.getElementById('mcqPrev').addEventListener('click', ()=>{if(idx>0) idx--; renderMCQ();});
    document.getElementById('mcqSubmit').addEventListener('click', ()=>{const sel=document.querySelector('input[name="opt"]:checked'); if(!sel){alert('Choose an option');return;} const q=mcqs[idx]; const correct=parseInt(sel.value,10)===q.correct_index; if(correct) score++; document.getElementById('mcqResult').innerHTML = correct? `<div style="color:green">Correct — ${q.explanation||''}</div>`: `<div style="color:red">Incorrect — ${q.explanation||''}</div>`;});
    document.getElementById('mcqRestart').addEventListener('click', ()=>{idx=0;score=0;renderMCQ();});
    renderMCQ();
  }

  const demoUpload = document.getElementById('demoUpload');
  if(demoUpload){ demoUpload.addEventListener('click', ()=>{const f=document.getElementById('demoFile').files[0]; const title=document.getElementById('demoTitle').value|| (f&&f.name)||'Untitled'; if(!f){alert('Select a file to demo upload');return;} const list=document.getElementById('demoFiles'); if(list) list.innerHTML = `<div class="card"><b>${title}</b><p class="muted">${f.name} (demo)</p><a class="btn" href="#">View</a></div>` + list.innerHTML; alert('Demo upload complete (file not stored — Supabase integration will be added later).');}); }

  const demoAddCondition = document.getElementById('demoAddCondition');
  if(demoAddCondition){ demoAddCondition.addEventListener('click', ()=>{ const newCond={id:'demo-'+Date.now(),slug:'demo-'+Date.now(),title:'Demo Condition',category:'Neurological',definition:'Sample condition for demo.'}; conditions.unshift(newCond); const condList=document.getElementById('conditionsList'); if(condList) condList.innerHTML = conditions.map(c=>`<div class="card"><h3>${c.title}</h3><p>${c.definition}</p></div>`).join(''); alert('Demo condition added (in-memory only).'); }); }

})();
