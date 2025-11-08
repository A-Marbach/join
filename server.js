const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname))); // serviert HTML/JS/CSS

// JSON-Daten
let jsonFromServer = {};
try {
    jsonFromServer = JSON.parse(fs.readFileSync('database.json', 'utf8'));
} catch (err) {
    jsonFromServer = {};
}

// GET nocors.php
app.get('/nocors.php', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(jsonFromServer));
});

// POST save_json.php
app.post('/save_json.php', (req, res) => {
    jsonFromServer = req.body;
    fs.writeFileSync('database.json', JSON.stringify(jsonFromServer, null, 2));
    res.json({ status: 'ok' });
});

app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));
