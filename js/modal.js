import { escapeHtml, formatDate } from './utils.js';
let root;
export function initModal(){ root=document.getElementById('modal-root'); }
export function closeModal(){ if(root) root.innerHTML=''; document.body.style.overflow=''; }
export function showModal({title,subtitle='',body='',actions=''}){
  if(!root) initModal();
  root.innerHTML=`<div class="modal-backdrop" data-modal-backdrop><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-head"><div><h2 id="modal-title">${title}</h2><p>${subtitle}</p></div><button class="icon-btn" data-close-modal aria-label="Close dialog"><span class="material-symbols-outlined">close</span></button></div><div class="modal-body">${body}</div>${actions?`<div class="modal-actions">${actions}</div>`:''}</section></div>`;
  root.querySelector('[data-close-modal]')?.focus(); document.body.style.overflow='hidden';
  root.addEventListener('click',e=>{if(e.target.matches('[data-modal-backdrop]')||e.target.closest('[data-close-modal]')) closeModal();},{once:true});
}
export function taskForm(task={}){
  return `<form id="task-form" novalidate><div class="form-grid"><div class="form-field full"><label for="task-title">Task title *</label><input id="task-title" name="title" class="input" maxlength="140" value="${escapeHtml(task.title||'')}" placeholder="e.g. Finalize Q4 roadmap" required></div><div class="form-field full"><label for="task-description">Description</label><textarea id="task-description" name="description" class="textarea" placeholder="Add technical context or deliverables...">${escapeHtml(task.description||'')}</textarea></div><div class="form-field"><label for="task-priority">Priority</label><select id="task-priority" name="priority" class="select"><option value="high" ${task.priority==='high'?'selected':''}>High</option><option value="medium" ${(!task.priority||task.priority==='medium')?'selected':''}>Medium</option><option value="low" ${task.priority==='low'?'selected':''}>Low</option></select></div><div class="form-field"><label for="task-category">Category</label><select id="task-category" name="category" class="select">${['Engineering','Design','Product','Personal','Operations'].map(c=>`<option ${task.category===c?'selected':''}>${c}</option>`).join('')}</select></div><div class="form-field"><label for="task-due">Due date</label><input id="task-due" name="dueDate" class="input" type="date" value="${task.dueDate||''}"></div><div class="form-field"><label for="task-time">Due time</label><input id="task-time" name="dueTime" class="input" type="time" value="${task.dueTime||''}"></div><div id="task-form-error" class="form-field full" style="display:none;color:#ffb4ab;font-size:11px"></div></div></form>`;
}
export function showTaskEditor(task,onSave){
  const isEdit=Boolean(task?.id);
  showModal({title:isEdit?'Edit task':'Create task',subtitle:isEdit?'Update the existing task without losing its history.':'Capture the next thing that needs to move.',body:taskForm(task||{}),actions:`<button class="btn secondary" type="button" data-close-modal>Cancel</button><button class="btn primary" type="submit" form="task-form"><span class="material-symbols-outlined">${isEdit?'save':'add_task'}</span>${isEdit?'Save changes':'Create task'}</button>`});
  root.querySelector('#task-form').addEventListener('submit',e=>{
    e.preventDefault(); const fd=new FormData(e.currentTarget); const data=Object.fromEntries(fd.entries()); const error=root.querySelector('#task-form-error');
    if(!data.title.trim()){ error.textContent='Please enter a task title.'; error.style.display='block'; root.querySelector('#task-title').focus(); return; }
    if(data.dueDate && Number.isNaN(new Date(`${data.dueDate}T00:00:00`).getTime())){ error.textContent='Please choose a valid due date.'; error.style.display='block'; return; }
    onSave(data); closeModal();
  });
}
export function showTaskDetails(task,{onEdit,onToggle,onDelete}){
  const completed=task.completed;
  showModal({title:escapeHtml(task.title),subtitle:completed?'Completed task':'Task details',body:`<div class="detail-grid"><div class="detail-row"><span>Status</span><span>${completed?'Completed':'Active'}</span></div><div class="detail-row"><span>Priority</span><span class="badge ${task.priority}">${escapeHtml(task.priority)}</span></div><div class="detail-row"><span>Category</span><span>${escapeHtml(task.category)}</span></div><div class="detail-row"><span>Due</span><span>${task.dueDate?formatDate(task.dueDate):'No due date'}${task.dueTime?` · ${escapeHtml(task.dueTime)}`:''}</span></div><div class="detail-row"><span>Created</span><span>${new Date(task.createdAt).toLocaleString()}</span></div><div class="detail-row"><span>Updated</span><span>${new Date(task.updatedAt).toLocaleString()}</span></div><div class="detail-row" style="display:block"><span>Description</span><p style="margin:6px 0 0;color:var(--muted);font-size:11px">${escapeHtml(task.description||'No description added.')}</p></div></div>`,actions:`<button class="btn danger" type="button" data-delete-detail><span class="material-symbols-outlined">delete</span>Delete</button><button class="btn secondary" type="button" data-toggle-detail><span class="material-symbols-outlined">${completed?'undo':'check'}</span>${completed?'Reopen':'Complete'}</button><button class="btn primary" type="button" data-edit-detail><span class="material-symbols-outlined">edit</span>Edit</button>`});
  root.querySelector('[data-edit-detail]')?.addEventListener('click',()=>{onEdit(task);});
  root.querySelector('[data-toggle-detail]')?.addEventListener('click',()=>{onToggle(task);});
  root.querySelector('[data-delete-detail]')?.addEventListener('click',()=>{onDelete(task);});
}
export function confirmDialog({title,message,confirmLabel='Confirm',danger=false,onConfirm}){
  showModal({title,subtitle:'This action changes saved workspace data.',body:`<p style="margin:0;color:var(--muted);font-size:12px;line-height:1.6">${message}</p>`,actions:`<button class="btn secondary" type="button" data-close-modal>Cancel</button><button class="btn ${danger?'danger':'primary'}" type="button" data-confirm>${escapeHtml(confirmLabel)}</button>`});
  root.querySelector('[data-confirm]').addEventListener('click',()=>{closeModal();onConfirm();});
}
export function trapEscape(){ document.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal();}); }
