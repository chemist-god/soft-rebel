(function(){
  const startBtn = document.getElementById('startBtn');
  const captureBtn = document.getElementById('captureBtn');
  const tryAgainBtn = document.getElementById('tryAgainBtn');
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const results = document.getElementById('results');
  const toneLabel = document.getElementById('toneLabel');
  const conditionsList = document.getElementById('conditionsList');
  const confidenceEl = document.getElementById('confidence');
  const routineCards = document.getElementById('routineCards');
  const saveRoutine = document.getElementById('saveRoutine');
  const buyKit = document.getElementById('buyKit');

  let stream = null;

  async function startCamera(){
    startBtn.disabled = true;
    try{
      stream = await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'}});
      video.srcObject = stream;
      captureBtn.disabled = false;
    }catch(e){
      alert('Camera access denied or not available. Open this demo on a device with a camera.');
      startBtn.disabled = false;
    }
  }

  function stopCamera(){
    if(stream){
      stream.getTracks().forEach(t=>t.stop());
      stream=null;
    }
    startBtn.disabled = false;
    captureBtn.disabled = true;
  }

  function capture(){
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // show mock results
    const dataUrl = canvas.toDataURL('image/jpeg',0.9);
    runMockInference(dataUrl);
    tryAgainBtn.disabled = false;
    captureBtn.disabled = true;
  }

  function runMockInference(imageDataUrl){
    // Mock inference: deterministic-ish pseudo-random based on timestamp
    const seed = Date.now();
    const tones = ['Ebony', 'Deep Brown', 'Warm Brown', 'Caramel', 'Bronze'];
    const tone = tones[seed % tones.length];
    const conditionsPool = ['Dryness','Oiliness','Texture','Hyperpigmentation','Dehydration'];
    const conditions = [];
    for(let i=0;i<conditionsPool.length;i++){
      if((seed + i*17) % 3 === 0) conditions.push(conditionsPool[i]);
    }
    const conf = Math.round(70 + (seed % 30));

    // populate UI
    toneLabel.textContent = tone;
    conditionsList.innerHTML = '';
    conditions.forEach(c=>{
      const li = document.createElement('li'); li.textContent = c; conditionsList.appendChild(li);
    });
    confidenceEl.textContent = conf + '%';

    // recommendations (simple rules)
    const recs = generateRecommendations(conditions);
    routineCards.innerHTML = '';
    recs.forEach(r=>{
      const card = document.createElement('div'); card.className='card';
      card.innerHTML = `<h4>${r.title}</h4><p>${r.copy}</p>`;
      routineCards.appendChild(card);
    });

    results.hidden = false;
  }

  function generateRecommendations(conditions){
    // rule-based mapping to SoftRebel products
    const products = [
      {id:'cleanser', title:'Purifying Cleanser', copy:'Gently removes impurities while preserving moisture.'},
      {id:'moisturizer', title:'Hydrating Moisturizer', copy:'Lightweight hydration with barrier-repair ingredients.'},
      {id:'serum', title:'Radiance Serum', copy:'Brightening serum with antioxidants and AHAs.'},
      {id:'mask', title:'Rejuvenating Mask', copy:'Weekly restorative mask for texture and glow.'}
    ];
    // always include cleanser and moisturizer; include others if conditions match
    const rec = [products[0], products[1]];
    if(conditions.includes('Texture')||conditions.includes('Hyperpigmentation')) rec.push(products[2]);
    if(conditions.includes('Dehydration')||conditions.includes('Dryness')) rec.push(products[3]);
    // dedupe
    return rec;
  }

  function tryAgain(){
    results.hidden = true;
    tryAgainBtn.disabled = true;
    captureBtn.disabled = false;
  }

  function saveToLocal(){
    const routine = {
      tone: toneLabel.textContent,
      conditions: Array.from(conditionsList.children).map(li=>li.textContent),
      date: new Date().toISOString()
    };
    const saved = JSON.parse(localStorage.getItem('softrebel:routines')||'[]');
    saved.unshift(routine);
    localStorage.setItem('softrebel:routines', JSON.stringify(saved));
    saveRoutine.textContent = 'Saved ✓';
    setTimeout(()=>saveRoutine.textContent='Save routine',1500);
  }

  startBtn.addEventListener('click', startCamera);
  captureBtn.addEventListener('click', capture);
  tryAgainBtn.addEventListener('click', tryAgain);
  saveRoutine.addEventListener('click', saveToLocal);
  buyKit.addEventListener('click', ()=>alert('Mock checkout — integrate payments in next iteration'));

  // accessibility: stop camera when user leaves
  window.addEventListener('pagehide', stopCamera);
})();