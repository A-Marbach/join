const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname)));
app.use(express.json());

let jsonFromServer = {};

// Daten beim Start laden
try {
    jsonFromServer = JSON.parse(fs.readFileSync('database.json', 'utf8'));
} catch (err) {
    jsonFromServer = {};
}

// GET Endpoint zum Laden
app.get('/load_json', (req, res) => {
    res.json(jsonFromServer);
});

// POST Endpoint zum Speichern
app.post('/save_json', (req, res) => {
    jsonFromServer = req.body;
    fs.writeFileSync('database.json', JSON.stringify(jsonFromServer));
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
