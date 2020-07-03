const Immuto = window.Immuto; // Load global, injected by pre-built immuto.js
let im = Immuto.init(true, "https://dev.immuto.io");

function store() {
    let name = document.getElementById("name").value;
    chrome.runtime.sendMessage({
        action: "store backup",
        name: name,
    });
}

function exit() {
    chrome.runtime.sendMessage({
        action: "no_store",
    });
}

function DOM_loaded() {
    document.getElementById("store").addEventListener("click", store);
    document.getElementById("exit").addEventListener("click", exit);
}

document.addEventListener("DOMContentLoaded", DOM_loaded);
