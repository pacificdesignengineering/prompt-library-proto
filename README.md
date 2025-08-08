# Prompt Library Proto

## Quick Start (Local Demo)

### 1. Clone the Repo

```sh
git clone https://github.com/pacificdesignengineering/prompt-library-proto.git
cd prompt-library-proto
```

### 2. Install Dependencies

```sh
cd prompt-catalog-ui
npm install
cd ..
npm install express cors
```

### 3. Start the Backend API

```sh
node prompt-catalog-ui/prompt-api.cjs
```
- This will start the API at [http://localhost:5000](http://localhost:5000).

### 4. Start the Frontend (in a new terminal)

```sh
cd prompt-catalog-ui
npm run dev
```
- This will start the React app at [http://localhost:5173](http://localhost:5173) (or another port if 5173 is taken).

### 5. Open the App

- Go to [http://localhost:5173](http://localhost:5173) in your browser.
- Visit `http://localhost:5173/template-generator` to create a new standardized `prompt.md` file.

---

## Requirements

- Node.js v16+ (https://nodejs.org/)
- npm v8+

---

## Notes

- The backend API serves prompt files from the `prompts/` directory.
- The frontend fetches prompt lists and content from the API.
- The API now exposes `GET /api/categories` which returns existing category paths derived from the `prompts/` tree. The Template Generator uses this to offer a dropdown, and also allows typing any custom path.
- For best results, run both servers at the same time in separate terminals.

---

## Troubleshooting

- If you see a blank or unstyled page, make sure you ran `npm install` in `prompt-catalog-ui` and restarted the dev server.
- If you get a CORS error, make sure the backend is running before the frontend.
- If you change prompt files, refresh the browser to see updates.
- If the port is already in use when restarting servers on Windows PowerShell, you can free the port:

  ```powershell
  # Kill API (5000)
  $p5000 = (Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select -First 1 -ExpandProperty OwningProcess); if ($p5000) { Stop-Process -Id $p5000 -Force }

  # Kill Vite (5173/5174 etc.)
  $p5173 = (Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue | Select -First 1 -ExpandProperty OwningProcess); if ($p5173) { Stop-Process -Id $p5173 -Force }
  $p5174 = (Get-NetTCPConnection -LocalPort 5174 -ErrorAction SilentlyContinue | Select -First 1 -ExpandProperty OwningProcess); if ($p5174) { Stop-Process -Id $p5174 -Force }
  ```

  Then start the servers again in two terminals:

  ```powershell
  # Terminal 1 (API)
  cd prompt-catalog-ui; node prompt-api.cjs

  # Terminal 2 (UI)
  cd prompt-catalog-ui; npm run dev
  ```

---

## Want to Deploy?

- See the comments in `prompt-api.cjs` for how to serve the frontend and backend together in production.
- For a cloud demo, consider Render, Railway, or Heroku for the backend, and Vercel or Netlify for the frontend.

---

## Standard `prompt.md` schema (used by the app)

The webapp expects the following structure (frontmatter + sections):

```markdown
---
name: "<Readable Name>"
category: "<folder/path/under/prompts>"
description: "<short description>"
version: 1.0
author: "<Your Name>"
compatible_llms: [claude, chatgpt]
compatible_interfaces: [ui, api, cli]
inputs: [VAR1, VAR2]
outputs: [some_output]
chaining_compatible: false
---

## How to Use This Prompt

### Quick Start Guide
1. **Prepare Your Input**: …
2. **Set Parameters**: …
3. **Run the Prompt**: …
4. **Review & Process**: …

### Video Tutorial
📹 **Screen Recording**: [How to Use <Name>](https://…)

---

## prompt
<the actual prompt content>
```

Tip: Use the Template Generator at `/template-generator` to produce a compliant file quickly.
