import { loadSettings, loadTheme, saveSettings, saveTheme } from './storage.js';
export function applyTheme(theme){
  const isLight=theme==='light';
  document.documentElement.classList.toggle('light',isLight);
  document.documentElement.classList.toggle('dark',!isLight);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',isLight?'#f2f4fb':'#0b1326');
  saveTheme(theme);
}
export function initTheme(){ const theme=loadTheme(); applyTheme(theme); return theme; }
export function setTheme(theme){ applyTheme(theme); }
export function toggleTheme(){ const next=document.documentElement.classList.contains('light')?'dark':'light'; applyTheme(next); return next; }
export function loadAppSettings(){ return loadSettings({accent:'indigo',sound:true,compact:false}); }
export function saveAppSettings(settings){ saveSettings(settings); }
