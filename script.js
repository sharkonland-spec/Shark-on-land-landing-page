document.getElementById('year').textContent = new Date().getFullYear();

const audio = document.getElementById('bg-audio'),
      gate = document.getElementById('audio-gate'),
      gateBtn = document.getElementById('audio-cta'),
      soundToggle = document.getElementById('sound-toggle');
let audioUnlocked = false;

async function unlockAndPlay(){
  if(audioUnlocked) return;
  try {
    await audio.play();
    audioUnlocked = true;
    gate.style.display='none';
    soundToggle.setAttribute('aria-pressed','true');
  } catch(e){ console.warn('Autoplay blocked',e); }
}
gateBtn.addEventListener('click', unlockAndPlay);
window.addEventListener('click', unlockAndPlay, {once:true});
window.addEventListener('touchstart', unlockAndPlay, {once:true});

soundToggle.addEventListener('click', async()=>{
  if(!audioUnlocked){ await unlockAndPlay(); return; }
  if(audio.paused){
    await audio.play(); soundToggle.textContent="🔊";
  } else {
    audio.pause(); soundToggle.textContent="🔈";
  }
});

// Form handler with Formspree integration + takeover
const form = document.getElementById('lead-form');
const status = document.getElementById('form-status');
const signupBox = document.querySelector('.signup-box');

form.addEventListener('submit', async function(e){
  e.preventDefault();
  const data = new FormData(form);
  try {
    let res = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      status.textContent = "welcome to the land of sharks and sirènes";
      signupBox.classList.add('success');   // takeover
      form.reset();
    } else {
      status.textContent = "Something went wrong. Please try again.";
      signupBox.classList.add('success');
    }
  } catch (err) {
    status.textContent = "Error sending. Please try again.";
    signupBox.classList.add('success');
  }
});
