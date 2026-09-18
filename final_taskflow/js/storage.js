import { uid } from './utils.js';
const TASKS_KEY='taskflow_tasks_v1';
const SETTINGS_KEY='taskflow_settings_v1';
const THEME_KEY='taskflow_theme';
const validPriorities=new Set(['high','medium','low']);
const validCategories=new Set(['Engineering','Design','Product','Personal','Operations']);
function safeSave(tasks){ try { saveTasks(tasks); } catch (_) {} }
function sanitizeTask(t){
  if(!t || typeof t!=='object' || typeof t.title!=='string' || !t.title.trim()) return null;
  return {
    id:typeof t.id==='string'&&t.id?t.id:uid(),
    title:t.title.trim(),
    description:typeof t.description==='string'?t.description:'',
    completed:Boolean(t.completed),
    priority:validPriorities.has(t.priority)?t.priority:'medium',
    category:validCategories.has(t.category)?t.category:'Product',
    dueDate:typeof t.dueDate==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(t.dueDate)?t.dueDate:'',
    dueTime:typeof t.dueTime==='string'?t.dueTime:'',
    createdAt:typeof t.createdAt==='string'?t.createdAt:new Date().toISOString(),
    updatedAt:typeof t.updatedAt==='string'?t.updatedAt:new Date().toISOString(),
    completedAt:typeof t.completedAt==='string'?t.completedAt:'',
  };
}
export function loadTasks(seed=[]) {
  try {
    const raw=localStorage.getItem(TASKS_KEY);
    if(raw===null){ const safe=seed.map(sanitizeTask).filter(Boolean); safeSave(safe); return safe; }
    const parsed=JSON.parse(raw); if(!Array.isArray(parsed)) throw new Error('invalid task payload');
    return parsed.map(sanitizeTask).filter(Boolean);
  } catch (_) { try { localStorage.removeItem(TASKS_KEY); } catch (__) {} const safe=seed.map(sanitizeTask).filter(Boolean); safeSave(safe); return safe; }
}
export function saveTasks(tasks){ localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)); }
export function updateStoredTasks(updater){ const next=updater(loadTasks()); saveTasks(next); return next; }
export function clearStoredTasks(){ localStorage.removeItem(TASKS_KEY); }
export function loadSettings(defaults={}) { try { const parsed=JSON.parse(localStorage.getItem(SETTINGS_KEY)||'{}'); return {...defaults,...(parsed&&typeof parsed==='object'?parsed:{})}; } catch(_){ return {...defaults}; } }
export function saveSettings(settings){ localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings)); }
export function loadTheme(){ return localStorage.getItem(THEME_KEY)||'dark'; }
export function saveTheme(theme){ localStorage.setItem(THEME_KEY,theme); }
