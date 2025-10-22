const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const ROOT = __dirname;

app.use(express.static(ROOT, { extensions: ['html'] }));

app.get('/__api/folders', (req, res) => {
  fs.readdir(ROOT, { withFileTypes: true }, (err, entries) => {
    if (err) return res.status(500).json({ error: err.message });
    const folders = entries
      .filter(e => e.isDirectory())
      .map(e => e.name)
      .filter(name => !name.startsWith('.') && name !== 'node_modules')
      .sort();
    res.json({ folders });
  });
});

const port = process.env.PORT || 5173;
app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
