function store() {
    // Gets the record name typed by the user
    let name = document.getElementById("name").value;

    // Sends a message to the content script to create a record with immuto
    chrome.runtime.sendMessage({
        action: "store_backup",
        name: name,
    });
}

// Closes the popup
function exit() {
    chrome.runtime.sendMessage({
        action: "no_store",
    });
}

// Waits until the iframe loads before adding the functionality
function DOM_loaded() {
    document.getElementById("store").addEventListener("click", store);
    document.getElementById("exit").addEventListener("click", exit);
}
document.addEventListener("DOMContentLoaded", DOM_loaded);
