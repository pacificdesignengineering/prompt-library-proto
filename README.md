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

---

## Requirements

- Node.js v16+ (https://nodejs.org/)
- npm v8+

---

## Notes

- The backend API serves prompt files from the `prompts/` directory.
- The frontend fetches prompt lists and content from the API.
- For best results, run both servers at the same time in separate terminals.

---

## Troubleshooting

- If you see a blank or unstyled page, make sure you ran `npm install` in `prompt-catalog-ui` and restarted the dev server.
- If you get a CORS error, make sure the backend is running before the frontend.
- If you change prompt files, refresh the browser to see updates.

---

## Want to Deploy?

- See the comments in `prompt-api.cjs` for how to serve the frontend and backend together in production.
- For a cloud demo, consider Render, Railway, or Heroku for the backend, and Vercel or Netlify for the frontend.
