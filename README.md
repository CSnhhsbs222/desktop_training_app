# New Hire Hub

Simplified Centerstone School-Based Services new hire training desktop app.

## Run locally

1. Install Node.js.
2. From this folder, run:

```bash
npm install
npm start
```

## Build desktop installers

```bash
npm run build:mac
npm run build:win
```

## Current build scope

This first build intentionally starts fresh and does not reuse the old hub. It includes:

- Electron desktop app shell
- Centerstone color scheme
- Three primary sections: Home, Welcome Center, Training Dashboard
- Local profile storage
- Automatic ramp-up tracker from hire date
- Daily, weekly, and monthly workflow checklists
- Dossier-style leadership profiles
- Independent training detail display
- Training feedback/completion UI
- School district calendar links inside Scheduling for Success / Training Dashboard structure

Next likely build targets:

- Add actual image/video/assets folder
- Add view-only files and resource attachments
- Replace training calendar placeholder with editable calendar data
- Build Scheduler Tool inside Scheduling for Success
