const glow=document.querySelector('.cursor-glow');

window.addEventListener('mousemove',e=>{
  glow.style.left=e.clientX+'px';
  glow.style.top=e.clientY+'px';
});

let audio;
function ping(freq=620,duration=.055){
  try{
    audio ||= new (window.AudioContext||window.webkitAudioContext)();
    if(audio.state==='suspended') audio.resume();
    const o=audio.createOscillator(), g=audio.createGain();
    o.type='sine';
    o.frequency.setValueAtTime(freq,audio.currentTime);
    o.frequency.exponentialRampToValueAtTime(freq*1.06,audio.currentTime+duration);
    g.gain.setValueAtTime(.0001,audio.currentTime);
    g.gain.exponentialRampToValueAtTime(.018,audio.currentTime+.008);
    g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+duration);
    o.connect(g);g.connect(audio.destination);
    o.start();o.stop(audio.currentTime+duration+.01);
  }catch(e){}
}

document.querySelectorAll('.sound-btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>ping(680,.045));
  el.addEventListener('click',()=>ping(430,.07));
});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id && id!=='#'){
      const target=document.querySelector(id);
      if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
    }
  });
});

document.querySelectorAll('[data-modal]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const modal=document.getElementById(btn.dataset.modal);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  });
});

document.querySelectorAll('.modal').forEach(modal=>{
  const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');};
  modal.querySelector('.close').addEventListener('click',close);
  modal.addEventListener('click',e=>{if(e.target===modal)close();});
});

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    document.querySelectorAll('.modal.open').forEach(m=>{
      m.classList.remove('open');m.setAttribute('aria-hidden','true');
    });
    document.body.classList.remove('modal-open');
  }
});

document.querySelectorAll('.primary').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*.04;
    const y=(e.clientY-r.top-r.height/2)*.04;
    el.style.transform=`translate(${x}px,${y}px)`;
  });
  el.addEventListener('mouseleave',()=>el.style.transform='');
});
