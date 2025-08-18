document.getElementById('year').textContent=new Date().getFullYear();
const audio=document.getElementById('bg-audio'),gate=document.getElementById('audio-gate'),gateBtn=document.getElementById('audio-cta'),soundToggle=document.getElementById('sound-toggle');let audioUnlocked=false;
async function unlockAndPlay(){if(audioUnlocked)return;try{await audio.play();audioUnlocked=true;gate.style.display='none';soundToggle.setAttribute('aria-pressed','true')}catch(e){console.warn('Autoplay blocked',e)}}
gateBtn.addEventListener('click',unlockAndPlay);window.addEventListener('click',unlockAndPlay,{once:true});window.addEventListener('touchstart',unlockAndPlay,{once:true});
soundToggle.addEventListener('click',async()=>{if(!audioUnlocked){await unlockAndPlay();return;}if(audio.paused){await audio.play();soundToggle.textContent="🔊"}else{audio.pause();soundToggle.textContent="🔈"}});
