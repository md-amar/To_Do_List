const routes=['dashboard','all-tasks','today','upcoming','completed','settings'];
const meta={dashboard:['dashboard','Dashboard'], 'all-tasks':['checklist','All Tasks'],today:['wb_sunny','Today'],upcoming:['schedule','Upcoming'],completed:['check_circle','Completed'],settings:['tune','Settings']};
let current='dashboard';
let listener=()=>{};
function normalize(hash){const r=(hash||'').replace(/^#/,''); return routes.includes(r)?r:'dashboard';}
export function getRoute(){ return normalize(location.hash); }
export function navigate(route){ const target=normalize(route); if(getRoute()!==target) location.hash=target; else listener(target); }
export function onNavigate(cb){ listener=cb; window.addEventListener('hashchange',()=>cb(getRoute())); }
export function routeMeta(route){return meta[route]||meta.dashboard;}
export function initNavigation(){ current=getRoute(); return current; }
export function renderSidebar(tasks,route){
  const counts={
    'all-tasks':tasks.filter(t=>!t.completed).length,
    today:tasks.filter(t=>t.dueDate===new Date().toISOString().slice(0,10)&&!t.completed).length,
    upcoming:tasks.filter(t=>t.dueDate>new Date().toISOString().slice(0,10)&&!t.completed).length,
    completed:tasks.filter(t=>t.completed).length,
  };
  const links=routes.map(r=>{const [icon,label]=meta[r];const count=counts[r];return `<a href="#${r}" class="nav-link ${route===r?'active':''}" data-route="${r}" aria-current="${route===r?'page':'false'}"><span class="nav-main"><span class="material-symbols-outlined">${icon}</span><span>${label}</span></span>${count!==undefined?`<span class="nav-count ${r==='today'?'success':''}">${count}</span>`:''}</a>`}).join('');
  return `<div><div class="brand"><div class="brand-left"><div class="logo"><span class="material-symbols-outlined">done</span></div><span class="brand-name">TaskFlow</span></div><span class="pro">PRO</span></div><div class="new-task-sidebar"><button class="btn primary" style="width:100%" data-action="new-task"><span class="material-symbols-outlined">add</span>New Task <span class="kbd" style="position:static;margin-left:auto;background:rgba(6,14,32,.32);color:white">⌘K</span></button></div><nav class="nav">${links}</nav></div><div class="sidebar-bottom"><div class="streak-card"><div class="streak-head"><span>🔥 7 Day Streak</span><span class="mono">${Math.min(100,Math.round((tasks.filter(t=>t.completed).length/Math.max(1,tasks.length))*100))}%</span></div><div class="streak-sub">${tasks.filter(t=>t.completed).length}/${tasks.length||0} tasks done</div><div class="progress"><span style="width:${tasks.length?Math.round(tasks.filter(t=>t.completed).length/tasks.length*100):0}%"></span></div></div><div class="profile"><div class="profile-main"><div class="avatar">AM</div><div class="profile-text"><strong>Alex Morgan</strong><span>alex@taskflow.io</span></div></div><button class="icon-btn" aria-label="Workspace actions"><span class="material-symbols-outlined">unfold_more</span></button></div></div>`;
}
export function renderMobileNav(route){ const mobile=['dashboard','all-tasks','today','upcoming','completed','settings']; return mobile.map(r=>{const [icon,label]=meta[r];return `<a href="#${r}" class="${route===r?'active':''}"><span class="material-symbols-outlined">${icon}</span><span>${label}</span></a>`}).join(''); }
