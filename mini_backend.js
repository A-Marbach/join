let jsonFromServer = {};
let BASE_SERVER_URL = 'http://join.artur-marbach.de:3000';

const backend = {
    setItem: function(key, item) {
        jsonFromServer[key] = item;
        return saveJSONToServer();
    },
    getItem: function(key) {
        return jsonFromServer[key] || null;
    },
    deleteItem: function(key) {
        delete jsonFromServer[key];
        return saveJSONToServer();
    }
};

window.onload = async function() {
    await downloadFromServer();
}

async function downloadFromServer() {
    try {
        let result = await loadJSONFromServer();
        jsonFromServer = JSON.parse(result);
        console.log('Loaded', jsonFromServer);
    } catch (err) {
        console.error("Fehler beim Laden der Daten:", err);
    }
}

async function loadJSONFromServer() {
    let response = await fetch(BASE_SERVER_URL + '/load_json');
    if (!response.ok) throw new Error("Fehler beim Laden vom Server");
    return await response.text();
}

function saveJSONToServer() {
    return fetch(BASE_SERVER_URL + '/save_json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonFromServer)
    })
    .then(res => {
        if (!res.ok) throw new Error("Fehler beim Speichern auf dem Server");
        return res.text();
    });
}
