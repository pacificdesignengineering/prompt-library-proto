# 🚀 Cursor Git Commands for Prompt Library

Use these commands inside Cursor's agent window to automate your workflow.

---

### 🆕 Start New Feature Branch
```
start "your-feature-name"
```
Creates and checks out a new feature branch.

---

### 💾 Save Your Work
```
save "short commit message"
```
Adds and commits all changes, then pushes to remote.

**Or use the manual save workflow:**
```bash
# Add all changes
git add .

# Commit with a meaningful message
git commit -m "descriptive commit message"

# Push to remote
git push
```

**For meaningful commit messages, use this format:**
```
git commit -m "feat: brief description of what you added/changed

- Bullet point of specific changes
- Another bullet point if needed"
```

---

### 🔁 Create Pull Request
```
pr "Short PR summary title"
```
Generates the GitHub pull request link for your branch.

---

### 🔍 Check Current Git Status
```
check
```
Shows current branch and working directory status.

---

### 🔄 Sync with Main
```
sync
```
Pulls the latest changes from `main` before starting a new branch.

---

### ⚙️ Example Workflow
```bash
start "add-invoice-generator"
# (do your changes)
save "added initial invoice prompt"
pr "Add invoice prompt to finance tools"
```

**Or use the manual workflow:**
```bash
start "add-invoice-generator"
# (do your changes)
git add .
git commit -m "feat: add invoice prompt to finance tools"
git push
pr "Add invoice prompt to finance tools"
```