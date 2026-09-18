# TaskFlow

TaskFlow is a modular, responsive single-page to-do application rebuilt from the supplied Google Stitch screens. The Stitch visual system is treated as the design source of truth; the implementation adds real task data and client-side behavior without turning the product into a different visual template.

## Features

- True SPA navigation using hash routes: Dashboard, All Tasks, Today, Upcoming, Completed, Settings
- Create, edit, delete, view details, complete and reopen tasks
- Priority, category, due date and due time support
- Case-insensitive search across task title, description and category
- Combined status, category, priority, due-date and sort controls
- Dashboard metrics calculated from live task data
- Empty states and confirmation dialogs
- localStorage persistence with corrupted-data recovery
- Dark/light theme preference persistence
- Responsive desktop/tablet/mobile layouts with mobile navigation
- Completed-task JSON export and history clearing
- Keyboard focus support, Escape-to-close dialogs and accessible labels

## Technology

Vanilla HTML, CSS and modern JavaScript ES modules. No frontend framework. Google-hosted Plus Jakarta Sans, JetBrains Mono and Material Symbols are used to retain the visual language of the supplied Stitch screens.

## Run locally

Because the app uses ES modules, serve the project from a small local HTTP server instead of opening `index.html` directly.

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Project structure

```text
index.html
css/
  styles.css
js/
  app.js
  navigation.js
  tasks.js
  filters.js
  search.js
  storage.js
  theme.js
  modal.js
  utils.js
  views.js
assets/
DESIGN.md
README.md
```

## How the SPA works

`index.html` is the only HTML document. Navigation changes the hash (`#dashboard`, `#all-tasks`, etc.) and `app.js` re-renders the appropriate view into the single `<main>` mount point without reloading the document. The sidebar and top bar are shared shell components.

## Data persistence

Tasks and settings are stored in browser `localStorage`. On first run, a small set of starter tasks is created so the UI demonstrates each view. After that, all counts and views come from the stored task data. Invalid task payloads are discarded safely and replaced with the starter set.

## Future improvements

A backend could replace localStorage, integrations could become real API connections, and richer calendar/time-blocking views could use the same task model without changing the SPA shell.
