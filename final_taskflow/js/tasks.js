import { uid } from './utils.js';
export function createTask(input){
  const now=new Date().toISOString();
  return { id:uid(), title:input.title.trim(), description:(input.description||'').trim(), completed:false, priority:input.priority||'medium', category:input.category||'Product', dueDate:input.dueDate||'', dueTime:input.dueTime||'', createdAt:now, updatedAt:now, completedAt:'' };
}
export function addTask(tasks,input){ return [createTask(input),...tasks]; }
export function updateTask(tasks,id,patch){
  const now=new Date().toISOString();
  return tasks.map(t=>t.id===id?{...t,...patch,updatedAt:now}:t);
}
export function toggleTask(tasks,id,completed){
  const now=new Date().toISOString();
  return tasks.map(t=>t.id===id?{...t,completed,completedAt:completed?now:'',updatedAt:now}:t);
}
export function deleteTask(tasks,id){ return tasks.filter(t=>t.id!==id); }
export function bulkToggle(tasks,ids,completed){ const set=new Set(ids); const now=new Date().toISOString(); return tasks.map(t=>set.has(t.id)?{...t,completed,completedAt:completed?now:'',updatedAt:now}:t); }
export function bulkDelete(tasks,ids){ const set=new Set(ids); return tasks.filter(t=>!set.has(t.id)); }
