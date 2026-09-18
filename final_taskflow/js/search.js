export function searchTasks(tasks,query){
  const q=(query||'').trim().toLowerCase(); if(!q) return tasks;
  return tasks.filter(t=>[t.title,t.description,t.category].some(v=>(v||'').toLowerCase().includes(q)));
}
