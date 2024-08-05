let jsonFromServer = {};
let BASE_SERVER_URL = 'https://join.artur-marbach.de';
/**
 * This jSON inserts, loads it out again, updates the data
 * 
 * 
 */
const backend = {
    setItem: function (key, item) {
        jsonFromServer[key] = item;
        return saveJSONToServer();
    },
    getItem: function (key) {
        if (!jsonFromServer[key]) {
            return null;
        }
        return jsonFromServer[key];
    },
    deleteItem: function (key) {
        delete jsonFromServer[key];
        return saveJSONToServer();
    }
};
window.onload = async function () {
    downloadFromServer();
}
/**
 * download data from user
 * 
 * 
 */
async function downloadFromServer() {
    let result = await loadJSONFromServer();
    jsonFromServer = JSON.parse(result);
    // console.log('Loaded', result);
}
/**
 * this function give the right url from ftp server
 * 
 * 
 * @param {string} url  - this is the url from ftp server
 */
function setURL(url) {
    BASE_SERVER_URL = url;
}
/**
 * Loads a JSON or JSON Array to the Server
 * 
 * 
 */
async function loadJSONFromServer() {
    let response = await fetch(BASE_SERVER_URL + '/nocors.php?json=database&noache=' + (new Date().getTime()));
    return await response.text();

}
/**
 * this function load JSON from server
 * 
 * 
 */
function loadJSONFromServerOld() {
    return new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        let proxy = determineProxySettings();
        let serverURL = proxy + BASE_SERVER_URL + '/nocors.php?json=database&noache=' + (new Date().getTime());
        xhttp.open('GET', serverURL);
        xhttp.onreadystatechange = function (oEvent) {
            if (xhttp.readyState === 4) {
                if (xhttp.status >= 200 && xhttp.status <= 399) {
                    resolve(xhttp.responseText);
                } else {
                    reject(xhttp.statusText);
                }
            }
        };
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send();
    });
}
/** 
 * Saves a JSON or JSON Array to the Server
 * 
 * 
 */
function saveJSONToServer() {
    return new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        let proxy = determineProxySettings();
        let serverURL = proxy + BASE_SERVER_URL + '/save_json.php';
        xhttp.open('POST', serverURL);

        xhttp.onreadystatechange = function (oEvent) {
            if (xhttp.readyState === 4) {
                if (xhttp.status >= 200 && xhttp.status <= 399) {
                    resolve(xhttp.responseText);
                } else {
                    reject(xhttp.statusText);
                }
            }
        };
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(jsonFromServer));
    });
}
/**
 * This function checks whether the window page was loaded correctly
 * 
 * 
 */
function determineProxySettings() {
    return '';

    if (window.location.href.indexOf('.join.artur-marbach.de') > -1) {
        return '';
    } else {
        return 'https://cors-anywhere.herokuapp.com/';
    }
}