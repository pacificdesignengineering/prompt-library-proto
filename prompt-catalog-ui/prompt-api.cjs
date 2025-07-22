const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

const PROMPTS_DIR = path.join(__dirname, '../prompts');

app.use(cors());

// List all prompt files
app.get('/api/prompts', (req, res) => {
  const files = [];
  
  function getFiles(dir) {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        getFiles(fullPath);
      } else {
        files.push(path.relative(PROMPTS_DIR, fullPath).replace(/\\/g, '/'));
      }
    });
  }

  getFiles(PROMPTS_DIR);
  res.json(files);
});

// Get prompt content (supports subfolders)
app.get('/api/prompts/*', (req, res) => {
  console.log('Matched wildcard route:', req.url);
  let filename = req.params[0].replace(/\\/g, '/');
  const filepath = path.join(PROMPTS_DIR, filename);
  console.log('Requested:', filename, 'Resolved:', filepath);

  if (!filepath.startsWith(PROMPTS_DIR)) {
    return res.status(400).send('Invalid path.');
  }

  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('File not found.');
    }
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Prompt API running on http://localhost:${PORT}`);
});
