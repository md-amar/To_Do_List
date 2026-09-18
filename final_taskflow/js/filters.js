import { searchTasks } from './search.js';
import { sortTasks } from './utils.js';
export function filterTasks(tasks,filters={}){
  const {status='all',priority='all',category='all',due='all',query=''}=filters;
  let out=searchTasks(tasks,query);
  if(status==='active') out=out.filter(t=>!t.completed);
  if(status==='completed') out=out.filter(t=>t.completed);
  if(priority!=='all') out=out.filter(t=>t.priority===priority);
  if(category!=='all') out=out.filter(t=>t.category===category);
  if(due==='today') out=out.filter(t=>t.dueDate && t.dueDate===new Date().toISOString().slice(0,10));
  if(due==='upcoming') out=out.filter(t=>!t.completed && t.dueDate && t.dueDate>new Date().toISOString().slice(0,10));
  if(due==='overdue') out=out.filter(t=>!t.completed && t.dueDate && t.dueDate<new Date().toISOString().slice(0,10));
  return sortTasks(out,filters.sort||'due-asc');
}
export function deriveStats(tasks){
  const total=tasks.length, completed=tasks.filter(t=>t.completed).length, active=total-completed;
  const today=new Date().toISOString().slice(0,10);
  const todayTasks=tasks.filter(t=>t.dueDate===today);
  const completedToday=todayTasks.filter(t=>t.completed).length;
  const upcoming=tasks.filter(t=>!t.completed&&t.dueDate>today);
  const overdue=tasks.filter(t=>!t.completed&&t.dueDate&&t.dueDate<today);
  const pct=total?Math.round(completed/total*100):0;
  const priorities=['high','medium','low'].map(p=>({priority:p,count:tasks.filter(t=>!t.completed&&t.priority===p).length}));
  return {total,completed,active,todayTasks,completedToday,upcoming,overdue,pct,priorities};
}
