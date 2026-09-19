import { bindNavigation, renderView } from './navigation.js';
import { formatLongDate } from './utils.js';

const viewMeta = {
  dashboard: ['dashboard', 'Dashboard'],
  'all-tasks': ['checklist', 'All Tasks'],
  today: ['wb_sunny', 'Today'],
  upcoming: ['schedule', 'Upcoming'],
  completed: ['check_circle', 'Completed'],
  settings: ['tune', 'Settings'],
};

function navButton(viewName, route, count) {
  const [icon, label] = viewMeta[viewName];
  const active = route === viewName;
  return `<button type="button" class="nav-link ${active ? 'active' : ''}" data-view="${viewName}" aria-controls="view-${viewName}" aria-current="${active ? 'page' : 'false'}" tabindex="${active ? '0' : '-1'}"><span class="nav-main"><span class="material-symbols-outlined">${icon}</span><span>${label}</span></span>${count === undefined ? '' : `<span class="nav-count ${viewName === 'today' ? 'success' : ''}">${count}</span>`}</button>`;
}

function viewCounts(tasks) {
  const today = new Date().toISOString().slice(0, 10);
  return {
    'all-tasks': tasks.filter((task) => !task.completed).length,
    today: tasks.filter((task) => task.dueDate === today && !task.completed).length,
    upcoming: tasks.filter((task) => task.dueDate > today && !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  };
}

function renderSidebar(tasks, route) {
  const counts = viewCounts(tasks);
  const buttons = Object.keys(viewMeta).map((viewName) => navButton(viewName, route, counts[viewName])).join('');
  return `<div><div class="brand"><div class="brand-left"><div class="logo"><span class="material-symbols-outlined">done</span></div><span class="brand-name">TaskFlow</span></div><span class="pro">PRO</span></div><div class="new-task-sidebar"><button class="btn primary" style="width:100%" data-action="new-task"><span class="material-symbols-outlined">add</span>New Task <span class="kbd" style="position:static;margin-left:auto;background:rgba(6,14,32,.32);color:white">⌘K</span></button></div><nav class="nav" aria-label="Task views">${buttons}</nav></div><div class="sidebar-bottom"><div class="streak-card"><div class="streak-head"><span>🔥 7 Day Streak</span><span class="mono">${Math.min(100, Math.round((tasks.filter((task) => task.completed).length / Math.max(1, tasks.length)) * 100))}%</span></div><div class="streak-sub">${tasks.filter((task) => task.completed).length}/${tasks.length || 0} tasks done</div><div class="progress"><span style="width:${tasks.length ? Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100) : 0}%"></span></div></div><div class="profile"><div class="profile-main"><div class="avatar">AM</div><div class="profile-text"><strong>Alex Morgan</strong><span>alex@taskflow.io</span></div></div><button class="icon-btn" aria-label="Workspace actions"><span class="material-symbols-outlined">unfold_more</span></button></div></div>`;
}

function renderMobileNav(route) {
  return Object.keys(viewMeta).map((viewName) => navButton(viewName, route)).join('');
}

const viewRenderers = {
  dashboard: (state, renderers) => renderers.renderDashboard(state.tasks),
  'all-tasks': (state, renderers) => renderers.renderAllTasks(state.tasks, state),
  today: (state, renderers) => renderers.renderToday(state.tasks),
  upcoming: (state, renderers) => renderers.renderUpcoming(state.tasks),
  completed: (state, renderers) => renderers.renderCompleted(state.tasks, state),
  settings: (state, renderers) => renderers.renderSettings(state.settings),
};

export function updateShell({ sidebar, mobileNav, topbar }, state) {
  sidebar.innerHTML = renderSidebar(state.tasks, state.route);
  mobileNav.innerHTML = renderMobileNav(state.route);
  topbar.innerHTML = `<div class="top-search"><span class="material-symbols-outlined search-icon">search</span><input id="global-search" class="search-input" value="${state.filters.query.replace(/&/g, '&amp;').replace(/\"/g, '&quot;')}" placeholder="Search tasks, tags, projects..." aria-label="Global task search"><span class="kbd">⌘K</span></div><div class="topbar-actions"><button class="btn secondary" data-action="toggle-filter"><span class="material-symbols-outlined">filter_list</span>Filter</button><div class="top-date"><span class="material-symbols-outlined" style="font-size:16px">calendar_today</span>${formatLongDate()}</div><button class="icon-btn" data-action="test-alert" aria-label="Notifications"><span class="material-symbols-outlined">notifications</span></button><button class="avatar" style="width:32px;height:32px;border:1px solid var(--border);font-size:10px" aria-label="Profile">AM</button></div>`;
  bindNavigation(sidebar);
  bindNavigation(mobileNav);
}

export function updateViews(main, state, renderers, { focus = true } = {}) {
  main.innerHTML = Object.entries(viewRenderers).map(([viewName, renderer]) => `\n    <section id="view-${viewName}" class="view-panel" data-view-panel="${viewName}" role="region" aria-label="${viewName.replace('-', ' ')} view" tabindex="-1">\n      ${renderer(state, renderers)}\n    </section>`).join('');
  renderView(state.route, { focus });
}
