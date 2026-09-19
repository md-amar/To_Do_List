const views = ['dashboard', 'all-tasks', 'today', 'upcoming', 'completed', 'settings'];

let activeView = 'dashboard';
let changeListener = () => {};

export function normalizeView(viewName) {
  return views.includes(viewName) ? viewName : 'dashboard';
}

export function getActiveView() {
  return activeView;
}

export function navigate(viewName, { focus = true } = {}) {
  const nextView = normalizeView(viewName);
  if (nextView === activeView) {
    renderView(nextView, { focus });
    return;
  }

  activeView = nextView;
  changeListener(nextView, { focus });
}

export function onViewChange(listener) {
  changeListener = listener;
}

/**
 * Shows one view panel and updates every navigation control to match it.
 * This is the only function that changes which application view is visible.
 */
export function renderView(viewName, { focus = true } = {}) {
  activeView = normalizeView(viewName);

  document.querySelectorAll('[data-view-panel]').forEach((panel) => {
    const isActive = panel.dataset.viewPanel === activeView;
    panel.classList.toggle('is-active', isActive);
    panel.hidden = !isActive;
    panel.setAttribute('aria-hidden', String(!isActive));
  });

  document.querySelectorAll('[data-view]').forEach((button) => {
    const isActive = button.dataset.view === activeView;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-current', isActive ? 'page' : 'false');
    button.tabIndex = isActive ? 0 : -1;
  });

  if (focus) {
    document.querySelector(`[data-view-panel="${activeView}"]`)?.focus();
  }
}

/**
 * Adds pointer and roving-keyboard navigation to one navigation container.
 */
export function bindNavigation(container) {
  if (!container) return;

  const getButtons = () => [...container.querySelectorAll('[data-view]')];
  container.addEventListener('click', (event) => {
    const button = event.target.closest('[data-view]');
    if (button && container.contains(button)) navigate(button.dataset.view);
  });

  container.addEventListener('keydown', (event) => {
    const button = event.target.closest('[data-view]');
    if (!button || !container.contains(button)) return;

    const buttons = getButtons();
    const currentIndex = buttons.indexOf(button);
    const direction = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    let nextIndex = currentIndex;

    if (direction) nextIndex = (currentIndex + direction + buttons.length) % buttons.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = buttons.length - 1;
    else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(button.dataset.view);
      return;
    } else return;

    event.preventDefault();
    buttons[nextIndex]?.focus();
  });
}

export { views };
