const $=(s,root=document)=>root.querySelector(s);const $$=(s,root=document)=>[...root.querySelectorAll(s)];$('#year').textContent=new Date().getFullYear();
const toast=(message)=>{const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2800)};
$('#menuToggle').addEventListener('click',()=>$('#mainNav').classList.toggle('open'));$$('#mainNav a').forEach(a=>a.addEventListener('click',()=>$('#mainNav').classList.remove('open')));
function openTab(tab){$$('.side-link').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));$$('.tab-panel').forEach(p=>p.classList.toggle('active',p.id==='panel-'+tab));}
$$('.side-link').forEach(b=>b.addEventListener('click',()=>openTab(b.dataset.tab)));$$('[data-tab]').filter(b=>!b.classList.contains('side-link')).forEach(b=>b.addEventListener('click',()=>openTab(b.dataset.tab)));
$$('[data-action="upload"]').forEach(b=>b.addEventListener('click',()=>$('#fileInput').click()));$('#fileInput').addEventListener('change',e=>{const files=[...e.target.files];if(files.length)toast(`${files.length} file(s) selected. Connect document storage and OCR to process uploads.`);e.target.value='';});
const canned=(q)=>{const s=q.toLowerCase();if(s.includes('delay')||s.includes('event')||s.includes('access'))return 'The sample record identifies a site access restriction recorded on 02 Aug 2025 (NB/CLM/018), followed by a variation instruction on 14 Aug 2025 (NB/VAR/042). Review the underlying notices, contemporaneous records and contract notice requirements before drawing an entitlement conclusion.';if(s.includes('variation'))return 'The sample correspondence includes an instruction for revised drainage scope dated 14 Aug 2025 (NB/VAR/042). A complete variation assessment would normally check the instruction authority, scope change, valuation basis, notice requirements and supporting cost/time records.';if(s.includes('contract')||s.includes('clause')||s.includes('notice'))return 'The sample contract index highlights Clause 8.4 (Extension of Time), Clause 13.1 (Right to Vary) and Clause 20.2 (Claims for Payment and/or EOT). Exact wording, amendments and notice periods must be verified against the executed contract.';return 'The sample workspace contains illustrative events, letters and clause references. Try asking about delay events, variation instructions, contract clauses or project notices. For a real answer, connect the project documents and retrieval-backed AI service.';};
function sendChat(q){if(!q.trim())return;const box=$('.assistant-message');box.textContent='“'+q+'”';const answer=document.createElement('div');answer.className='assistant-message';answer.textContent=canned(q);box.after(answer);}
$('#chatForm').addEventListener('submit',e=>{e.preventDefault();const q=$('#chatInput').value;sendChat(q);$('#chatInput').value='';});$$('[data-prompt]').forEach(b=>b.addEventListener('click',()=>sendChat(b.dataset.prompt)));
$('#docSearch').addEventListener('input',e=>{$$('.doc-row').forEach(row=>row.style.display=row.dataset.search.includes(e.target.value.toLowerCase())?'grid':'none');});
$('#timelineForm').addEventListener('submit',e=>{e.preventDefault();const q=$('#timelineInput').value;const a=$('#timelineAnswer');a.hidden=false;a.textContent=canned(q);});
$('#generateDraft').addEventListener('click',()=>{const type=$('#claimType').value,context=$('#claimContext').value;const out=$('#draftOutput');out.hidden=false;out.textContent=`DRAFT — ${type.toUpperCase()}\nNORTHBANK DEVELOPMENT (SAMPLE PROJECT)\n\n1. INTRODUCTION\nThis document is an initial working draft prepared from the illustrative project record. It is not a legal opinion or a submission-ready claim.\n\n2. RELEVANT BACKGROUND\nThe sample record refers to an access restriction recorded on 02 August 2025 (NB/CLM/018), an updated construction programme dated 21 July 2025 (NB/PLN/031), and a revised drainage scope instruction dated 14 August 2025 (NB/VAR/042).\n\n3. CONTRACTUAL FRAMEWORK\nThe sample contract index identifies Clause 8.4 (Extension of Time), Clause 13.1 (Right to Vary) and Clause 20.2 (Claims for Payment and/or EOT). The executed contract wording, amendments, notice periods and procedural requirements must be inserted and verified.\n\n4. EVENT AND PARTICULARS\n${context.trim()||'[Insert event chronology, cause, effect, mitigation measures and supporting contemporary records.]'}\n\n5. RELIEF SOUGHT\n[Insert substantiated time and/or monetary relief, supported by the programme analysis and valuation.]\n\n6. SUPPORTING DOCUMENTS\n[Attach relevant notices, instructions, programmes, site records, photographs and cost records.]\n\nREVIEW NOTE: This sample is generated from fictional demo data. Verify every fact, source document, contractual provision and calculation. Obtain review by the responsible contract and legal professionals before use.`;out.scrollIntoView({behavior:'smooth',block:'nearest'});});
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const target=$(a.getAttribute('href'));if(target&&target.id==='workspace')openTab('overview');}));
(function initBentoMocks(){
  const section=$('#platform');
  const queryEl=$('#bentoQueryText'),draftEl=$('#bentoDraftText');
  if(!section||!queryEl||!draftEl)return;
  const cards=$$('#platform .bento-card');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const queries=['Notice period under clause 8.4?','Which events trigger EOT?','Summarise variation NB/VAR/042'];
  const draftLines=['Delay event from 02 Aug with notice under clause 8.4…','Supporting records attached from project correspondence…'];
  let qi=0,di=0,active=0,timer=null,running=false;
  const typeInto=(el,text,onDone)=>{
    let i=0;
    const step=()=>{
      if(!running){el.textContent=text;return;}
      el.textContent=text.slice(0,++i);
      if(i<text.length)timer=setTimeout(step,reduced?0:32);
      else onDone();
    };
  step();
  };
  const cycle=()=>{
    if(!running)return;
    cards.forEach((c,j)=>c.classList.toggle('is-live',j===active));
    typeInto(queryEl,queries[qi],()=>{
      typeInto(draftEl,draftLines[di],()=>{
        qi=(qi+1)%queries.length;di=(di+1)%draftLines.length;active=(active+1)%cards.length;
        timer=setTimeout(cycle,reduced?2200:1400);
      });
    });
  };
  const start=()=>{running=true;cycle();};
  const stop=()=>{running=false;clearTimeout(timer);cards.forEach(c=>c.classList.remove('is-live'));};
  if(reduced){queryEl.textContent=queries[0];draftEl.textContent=draftLines[0];return;}
  new IntersectionObserver(([e])=>{e.isIntersecting?start():stop();},{threshold:0.15}).observe(section);
})();
