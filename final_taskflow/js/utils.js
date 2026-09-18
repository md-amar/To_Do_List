export function uid(prefix='task') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
}
export function todayKey(date=new Date()) {
  const d=new Date(date); d.setHours(0,0,0,0); return d.toISOString().slice(0,10);
}
export function parseDate(value) { return value ? new Date(`${value}T00:00:00`) : null; }
export function formatDate(value, opts={year:'numeric',month:'short',day:'numeric'}) {
  if(!value) return 'No due date';
  const d=parseDate(value); if(Number.isNaN(d?.getTime())) return 'Invalid date';
  return new Intl.DateTimeFormat(undefined, opts).format(d);
}
export function formatLongDate(date=new Date()) { return new Intl.DateTimeFormat(undefined,{weekday:'long',month:'short',day:'numeric',year:'numeric'}).format(date); }
export function formatShortDate(date=new Date()) { return new Intl.DateTimeFormat(undefined,{month:'short',day:'numeric'}).format(date); }
export function isToday(value) { return value === todayKey(); }
export function startOfWeek(date=new Date()) { const d=new Date(date); const day=d.getDay(); const diff=day===0?-6:1-day; d.setHours(0,0,0,0); d.setDate(d.getDate()+diff); return d; }
export function daysFromToday(value) { const d=parseDate(value); if(!d) return Infinity; return Math.round((d - parseDate(todayKey()))/86400000); }
export function relativeDue(value) {
  const diff=daysFromToday(value);
  if(diff===0) return 'Today'; if(diff===1) return 'Tomorrow'; if(diff===-1) return 'Yesterday'; if(diff<0) return `${Math.abs(diff)}d overdue`; if(diff<7) return `In ${diff} days`; return formatDate(value,{month:'short',day:'numeric'});
}
export function escapeHtml(value='') { return String(value).replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
export function humanizeCategory(value='') { return value.replace(/[-_]/g,' ').replace(/\b\w/g,m=>m.toUpperCase()); }
export function sortTasks(tasks, sort='due-asc') {
  const copy=[...tasks];
  const priorityRank={high:0,medium:1,low:2};
  return copy.sort((a,b)=>{
    if(sort==='due-desc') return (b.dueDate||'9999').localeCompare(a.dueDate||'9999');
    if(sort==='priority') return (priorityRank[a.priority]??9)-(priorityRank[b.priority]??9) || b.createdAt.localeCompare(a.createdAt);
    if(sort==='alphabetical') return a.title.localeCompare(b.title);
    if(sort==='created-oldest') return a.createdAt.localeCompare(b.createdAt);
    return (a.dueDate||'9999').localeCompare(b.dueDate||'9999') || b.createdAt.localeCompare(a.createdAt);
  });
}
export function getGreeting(hour=new Date().getHours()) { return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'; }
export function clamp(n,min,max){return Math.min(max,Math.max(min,n));}
