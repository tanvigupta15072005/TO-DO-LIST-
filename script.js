
const app = document.getElementById('app');
const modeBtn = document.getElementById('modeBtn');
const input = document.getElementById('taskInput');
const lists = document.getElementById('lists');
function setTheme(t){ if(t==='light') document.documentElement.setAttribute('data-theme','light'); else document.documentElement.removeAttribute('data-theme'); localStorage.setItem('theme', t||'dark'); modeBtn.textContent = t==='light'?'🌙':'☀️'; }
modeBtn.addEventListener('click', ()=> setTheme(localStorage.getItem('theme')==='light'?'dark':'light'));
setTheme(localStorage.getItem('theme')||'dark');
let tasks = JSON.parse(localStorage.getItem('tasks')||'[]');
function render(){
  lists.innerHTML='';
  tasks.forEach((t, idx)=>{
    const div = document.createElement('div');
    div.className = 'task' + (t.done? ' completed':'');
    div.innerHTML = `<span>${t.text}</span><button class="del">✕</button>`;
    div.querySelector('span').addEventListener('dblclick', ()=> {
      const val = prompt('Edit task', t.text);
      if(val!==null){ t.text = val; save(); render(); }
    });
    div.addEventListener('click', (e)=>{ if(e.target.classList.contains('del')) return; t.done = !t.done; save(); render(); });
    div.querySelector('.del').addEventListener('click', ()=> { tasks.splice(idx,1); save(); render(); });
    lists.appendChild(div);
  });
}
function save(){ localStorage.setItem('tasks', JSON.stringify(tasks)); }
input.addEventListener('keydown', e=>{ if(e.key==='Enter' && input.value.trim()){ tasks.unshift({text: input.value.trim(), done: false}); input.value=''; save(); render(); } });
render();
