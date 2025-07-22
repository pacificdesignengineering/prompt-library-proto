# How to Save Work (Commit & Push)

You can save your work (stage, commit, and push changes) using either manual git commands or the provided script.

## Option 1: Manual Git Commands
1. Stage all changes:
   ```sh
   git add .
   ```
2. Commit with a descriptive message:
   ```sh
   git commit -m "Your descriptive message"
   ```
3. Push to the remote repository:
   ```sh
   git push
   ```

## Option 2: Use the Script (save-work.sh)
1. Make sure you have bash (WSL, Git Bash, or similar).
2. In your project root, run:
   ```sh
   ./save-work.sh "Your descriptive message"
   ```
   - If you omit the message, the script will prompt you for one.

---

**Shortcut:**
Just tell the assistant: `save work` — and these steps will be performed for you automatically! 