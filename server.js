const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Statische Dateien (HTML, JS)
app.use(express.static(path.join(__dirname)));

// Optional: JSON Endpoints (falls du mini-backend.js verwenden willst)
app.get('/api/data', (req, res) => {
    res.json({ message: "Hello from Dockerized backend!" });
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
