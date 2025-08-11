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
