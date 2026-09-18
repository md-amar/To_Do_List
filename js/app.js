import { loadTasks, saveTasks, clearStoredTasks } from './storage.js';
import { addTask, updateTask, toggleTask, deleteTask, bulkDelete } from './tasks.js';
import { deriveStats } from './filters.js';
import { initNavigation, onNavigate, navigate, renderSidebar, renderMobileNav } from './navigation.js';
import { initTheme, setTheme, loadAppSettings, saveAppSettings } from './theme.js';
import { initModal, showTaskEditor, showTaskDetails, confirmDialog, closeModal, trapEscape } from './modal.js';
import { renderDashboard, renderAllTasks, renderToday, renderUpcoming, renderCompleted, renderSettings } from './views.js';
import { formatLongDate } from './utils.js';

const seedTasks=[
 {title:'Review Figma design system tokens',description:'Harmonize the component system with semantic color definitions and confirm dark-mode elevation surfaces.',priority:'high',category:'Design',dueDate:'',dueTime:'11:30'},
 {title:'Publish Q4 roadmap slide deck',description:'Include final headcount projections and infrastructure spending reductions requested by the executive team.',priority:'high',category:'Product',dueDate:'',dueTime:'11:55'},
 {title:'Weekly 1:1 sync with engineering lead',description:'Review GraphQL migration blockers, latency spikes on task mutation resolvers, and upcoming PTO schedule.',priority:'medium',category:'Engineering',dueDate:'',dueTime:'14:00'},
 {title:'Respond to enterprise client RFPs',description:'Complete section 4.2 data sovereignty guarantees for Nordic banking enterprise inquiry.',priority:'medium',category:'Product',dueDate:'',dueTime:'16:15'},
 {title:'Clear inbox & archive stale tickets',description:'Zero out stale ticket backlog, archive resolved requests, and clean downloads folder.',priority:'low',category:'Operations',dueDate:'',dueTime:'17:30'},
 {title:'Standup async status update to Slack',description:'Capture progress, blockers, and next actions for the team.',priority:'low',category:'Engineering',dueDate:'',dueTime:'09:00',completed:true},
 {title:'Migrate Auth Service to JWT RS256 Tokens',description:'Rotate old signing keys across staging and production clusters and verify token rollover.',priority:'high',category:'Engineering',dueDate:'',dueTime:'',},
 {title:'Design System Component Audit (Icons & Tokens)',description:'Consolidate redundant glyph variations and verify contrast ratios in high-density tables.',priority:'medium',category:'Design',dueDate:'',},
 {title:'Optimize Postgres Read Replicas & Connection Pool',description:'Deploy connection pool updates and tune idle transaction client timeouts.',priority:'medium',category:'Engineering',dueDate:'',},
 {title:'User Testing Sessions for Mobile Gesture Navigation',description:'Record user feedback and synthesize bottom-sheet interaction drop-off patterns.',priority:'low',category:'Design',dueDate:'',},
 {title:'Renew Annual AWS Solutions Architect Certification',description:'Review exam prep modules on distributed caching and serverless event architecture.',priority:'medium',category:'Personal',dueDate:'',},
 {title:'Evaluate AI Copilot Integrations for Workflow Automation',description:'Compare token cost models, zero-retention data policies, and latency benchmarks for LLM-backed workflow steps.',priority:'low',category:'Product',dueDate:'',},
 {title:'Home Studio Cable Management & Ergonomics Overhaul',description:'Mount power delivery hub beneath desk and configure articulated monitor arms.',priority:'low',category:'Personal',dueDate:'',},
 {title:'Resolve WebSocket reconnection race condition in sync daemon',description:'Patched backoff jitter algorithm to prevent synchronized reconnect loops across edge nodes.',priority:'high',category:'Engineering',dueDate:'',completed:true},
 {title:'Audit token contrast tokens for WCAG 2.1 AAA accessibility spec',description:'Verified all surface-container token ratios against design-system accessibility thresholds.',priority:'medium',category:'Design',dueDate:'',completed:true},
 {title:'Q4 Sprint 3 Retrospective document & alignment briefing',description:'Aggregated team velocity data and documented next sprint bottlenecks.',priority:'medium',category:'Product',dueDate:'',completed:true},
 {title:'Rotate production TLS certificates and automate renew hooks',description:'Automated certificate rotation and renewal validation across ingress clusters.',priority:'high',category:'Operations',dueDate:'',completed:true},
 {title:'Implement SQLite WAL mode support for local cache tier',description:'Concurrent read throughput improved across task list queries.',priority:'medium',category:'Engineering',dueDate:'',completed:true}
];

function prepareSeed(){
  const base=new Date(); base.setHours(0,0,0,0);
  return seedTasks.map((t,i)=>{ const copy={...t}; if(i===0||i===1||i===2||i===3||i===4||i===5){ const d=new Date(base); copy.dueDate=d.toISOString().slice(0,10); } else if(i===6){const d=new Date(base);d.setDate(d.getDate()-2);copy.dueDate=d.toISOString().slice(0,10);} else if(i===7){const d=new Date(base);d.setDate(d.getDate()-1);copy.dueDate=d.toISOString().slice(0,10);} else if(i===8){const d=new Date(base);d.setDate(d.getDate()+1);copy.dueDate=d.toISOString().slice(0,10);} else if(i===9){const d=new Date(base);d.setDate(d.getDate()+2);copy.dueDate=d.toISOString().slice(0,10);} else if(i===10){const d=new Date(base);d.setDate(d.getDate()+5);copy.dueDate=d.toISOString().slice(0,10);} else if(i===11){const d=new Date(base);d.setDate(d.getDate()+7);copy.dueDate=d.toISOString().slice(0,10);} else if(i===12){const d=new Date(base);d.setDate(d.getDate()+14);copy.dueDate=d.toISOString().slice(0,10);} else {copy.dueDate='';} return copy; });
}

const state={tasks:loadTasks(prepareSeed()), route:initNavigation(), filters:{status:'all',priority:'all',category:'all',query:'',sort:'due-asc'}, settings:loadAppSettings()};
initTheme(); initModal(); trapEscape();
const sidebar=document.getElementById('sidebar'); const topbar=document.getElementById('topbar'); const main=document.getElementById('main'); const mobileNav=document.getElementById('mobile-nav');

function persist(next){ state.tasks=next; saveTasks(next); }
function toast(message,type='success'){ const root=document.getElementById('toast-root'); const el=document.createElement('div'); el.className=`toast ${type}`; el.innerHTML=`<span class="material-symbols-outlined">${type==='error'?'error':'check_circle'}</span><span>${message}</span>`; root.append(el); setTimeout(()=>el.remove(),2800); }
function refreshShell(){ sidebar.innerHTML=renderSidebar(state.tasks,state.route); mobileNav.innerHTML=renderMobileNav(state.route); topbar.innerHTML=`<div class="top-search"><span class="material-symbols-outlined search-icon">search</span><input id="global-search" class="search-input" value="${state.filters.query.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" placeholder="Search tasks, tags, projects..." aria-label="Global task search"><span class="kbd">⌘K</span></div><div class="topbar-actions"><button class="btn secondary" data-action="toggle-filter"><span class="material-symbols-outlined">filter_list</span>Filter</button><div class="top-date"><span class="material-symbols-outlined" style="font-size:16px">calendar_today</span>${formatLongDate()}</div><button class="icon-btn" data-action="test-alert" aria-label="Notifications"><span class="material-symbols-outlined">notifications</span></button><button class="avatar" style="width:32px;height:32px;border:1px solid var(--border);font-size:10px" aria-label="Profile">AM</button></div>`; }
function render(){ refreshShell();
  if(state.route==='dashboard') main.innerHTML=renderDashboard(state.tasks);
  else if(state.route==='all-tasks') main.innerHTML=renderAllTasks(state.tasks,state);
  else if(state.route==='today') main.innerHTML=renderToday(state.tasks);
  else if(state.route==='upcoming') main.innerHTML=renderUpcoming(state.tasks);
  else if(state.route==='completed') main.innerHTML=renderCompleted(state.tasks,state);
  else main.innerHTML=renderSettings(state.settings);
  bindView(); main.focus();
}
function saveAndRender(next,msg){ persist(next); render(); if(msg) toast(msg); }
function getTask(id){ return state.tasks.find(t=>t.id===id); }
function openNewTask(){ showTaskEditor(null,data=>saveAndRender(addTask(state.tasks,data),'Task created.')); }
function openEdit(task){ showTaskEditor(task,data=>saveAndRender(updateTask(state.tasks,task.id,data),'Task updated.')); }
function openDetails(task){ showTaskDetails(task,{onEdit:t=>{closeModal();openEdit(t)},onToggle:t=>{closeModal();saveAndRender(toggleTask(state.tasks,t.id,!t.completed),t.completed?'Task reopened.':'Task completed.')},onDelete:t=>{closeModal();confirmDelete(t)}}); }
function confirmDelete(task){ confirmDialog({title:'Delete task?',message:`Delete “${task.title}”? This removes it from this browser and cannot be undone.`,confirmLabel:'Delete task',danger:true,onConfirm:()=>saveAndRender(deleteTask(state.tasks,task.id),'Task deleted.')}); }
function clearHistory(){ const completed=state.tasks.filter(t=>t.completed); if(!completed.length){toast('There are no completed tasks to clear.');return;} confirmDialog({title:'Clear completed history?',message:`This removes ${completed.length} completed task${completed.length===1?'':'s'} from local storage. Export the archive first if you need a copy.`,confirmLabel:'Clear history',danger:true,onConfirm:()=>saveAndRender(state.tasks.filter(t=>!t.completed),'Completed history cleared.')}); }
function exportTasks(){ const blob=new Blob([JSON.stringify(state.tasks,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url;a.download=`taskflow-archive-${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(url); toast('Task archive exported.'); }
function bindView(){
  document.querySelectorAll('[data-route]').forEach(el=>el.addEventListener('click',()=>navigate(el.dataset.route)));
  document.querySelectorAll('[data-action="new-task"]').forEach(el=>el.addEventListener('click',openNewTask));
  document.querySelectorAll('[data-action="toggle-filter"]').forEach(el=>el.addEventListener('click',()=>{ if(state.route!=='all-tasks'){navigate('all-tasks'); setTimeout(()=>document.getElementById('all-search')?.focus(),0);} else document.getElementById('all-search')?.focus(); }));
  document.querySelectorAll('[data-action="view-task"]').forEach(el=>el.addEventListener('click',()=>{const t=getTask(el.dataset.id); if(t)openDetails(t);}));
  document.querySelectorAll('[data-action="edit-task"]').forEach(el=>el.addEventListener('click',()=>{const t=getTask(el.dataset.id);if(t)openEdit(t);}));
  document.querySelectorAll('[data-action="delete-task"]').forEach(el=>el.addEventListener('click',()=>{const t=getTask(el.dataset.id);if(t)confirmDelete(t);}));
  document.querySelectorAll('[data-action="toggle-task"]').forEach(el=>el.addEventListener('click',()=>{const t=getTask(el.dataset.id); if(t) saveAndRender(toggleTask(state.tasks,t.id,!t.completed),t.completed?'Task reopened.':'Task completed.');}));
  document.querySelectorAll('[data-action="test-alert"]').forEach(el=>el.addEventListener('click',()=>toast('TaskFlow alert test — preferences are active.')));
  document.querySelectorAll('[data-action="export"]').forEach(el=>el.addEventListener('click',exportTasks));
  document.querySelectorAll('[data-action="clear-history"]').forEach(el=>el.addEventListener('click',clearHistory));
  document.querySelectorAll('[data-action="delete-workspace"]').forEach(el=>el.addEventListener('click',()=>confirmDialog({title:'Delete workspace data?',message:'This will clear every saved task from localStorage for this app. The page itself will remain installed.',confirmLabel:'Delete all tasks',danger:true,onConfirm:()=>{clearStoredTasks();state.tasks=[];render();toast('Workspace data deleted.');}})));
  document.querySelectorAll('[data-theme-choice]').forEach(el=>el.addEventListener('click',()=>{const choice=el.dataset.themeChoice;if(choice==='system'){const system=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';setTheme(system);toast(`System theme applied (${system}).`);}else{setTheme(choice);toast(`${choice==='light'?'Light':'Dark'} mode applied.`);}render();}));
  document.querySelectorAll('[data-toggle-setting]').forEach(el=>el.addEventListener('click',()=>{const key=el.dataset.toggleSetting;state.settings[key]=!state.settings[key];saveAppSettings(state.settings);render();}));
  const qa=document.getElementById('quick-add-form'); qa?.addEventListener('submit',e=>{e.preventDefault(); const input=document.getElementById('quick-add-input'); const title=input.value.trim(); if(!title){toast('Enter a task title first.','error');input.focus();return;} const due=new Date().toISOString().slice(0,10);saveAndRender(addTask(state.tasks,{title,description:'',priority:'medium',category:'Product',dueDate:due,dueTime:''}),'Task captured for today.');});
  const global=document.getElementById('global-search'); global?.addEventListener('input',e=>{const value=e.target.value; state.filters.query=value; const routeBefore=state.route; if(routeBefore!=='all-tasks'&&routeBefore!=='completed'&&value.trim()){navigate('all-tasks'); return;} render(); const restored=document.getElementById('global-search'); if(restored){restored.focus(); restored.setSelectionRange(value.length,value.length);} });
  const allSearch=document.getElementById('all-search'); allSearch?.addEventListener('input',e=>{state.filters.query=e.target.value;render();});
  const completedSearch=document.getElementById('completed-search'); completedSearch?.addEventListener('input',e=>{state.filters.query=e.target.value;render();});
  const pri=document.getElementById('all-priority'); pri?.addEventListener('change',e=>{state.filters.priority=e.target.value;render();});
  const sort=document.getElementById('all-sort'); sort?.addEventListener('change',e=>{state.filters.sort=e.target.value;render();});
  document.querySelectorAll('[data-filter-status]').forEach(el=>el.addEventListener('click',()=>{state.filters.status=el.dataset.filterStatus;render();}));
  document.querySelectorAll('[data-filter-category]').forEach(el=>el.addEventListener('click',()=>{state.filters.category=el.dataset.filterCategory;render();}));
  document.querySelectorAll('[data-filter-completed-category]').forEach(el=>el.addEventListener('click',()=>{state.filters.category=el.dataset.filterCompletedCategory==='all'?'all':el.dataset.filterCompletedCategory;render();}));
  document.querySelectorAll('[data-action="reset-filters"], [data-action="reset-completed"]').forEach(el=>el.addEventListener('click',()=>{state.filters={status:'all',priority:'all',category:'all',query:'',sort:'due-asc'};render();}));
}

onNavigate(route=>{state.route=route;state.filters.query='';render();});
window.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault(); document.getElementById('global-search')?.focus();}
});
render();
