var tabID = -1;
var currentFileContent;

// Triggered every time a download starts or ends
chrome.downloads.onChanged.addListener(async (delta) => {
    if (localStorage.IMMUTO_EXTENSION_autoPrompt === "off") {
        // If the user toggled off the auto prompt
        return;
    }

    if (!delta.state || delta.state.current != "complete") {
        // If the download has not completed
        return;
    }

    // Once the download completes, we search for the correct download,
    // pull out the url, and make a get request to get the content
    chrome.downloads.search({ id: delta.id }, async (res) => {
        let fileUrl = res[0].url;
        currentFileContent = await getFileDataFromUrl(fileUrl).catch((err) => {
            console.error(err);
        });

        // Sends the necessary data to the content script (content.js) so that
        // it can utilize the Immuto API
        chrome.tabs.query({ active: true, currentWindow: true }, function (
            tabs
        ) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "immuto_verify",
                fileContent: currentFileContent,
                email: localStorage.IMMUTO_email,
                password: localStorage.IMMUTO_EXTENSION_password,
            });
        });

        // Provides a dialog to the user so they can see the verification info
        // or request to make a backup
        chrome.tabs.executeScript({
            file: "content.js",
        });
    });
});

// Listens for messages from the iframes or content scripts
chrome.runtime.onMessage.addListener((message, sender) => {
    tabID = sender.tab.id;
    // Sent from the iframe dialog if the user requests to create a record
    if (message.action == "store_backup") {
        // Sends a message to the content script, to utilize the immuto API to
        // upload file

        chrome.tabs.sendMessage(tabID, {
            action: "immuto_store",
            fileContent: currentFileContent,
            fileName: message.name,
            email: localStorage.IMMUTO_email,
            password: localStorage.IMMUTO_EXTENSION_password,
        });
    } else if (message.action == "no_store") {
        // Triggered if the user clicks no when asked to make a new record
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "no_store",
            });
        });
    }
});

// This creates the option that comes up when a user right clicks
chrome.contextMenus.create({
    id: "open",
    title: chrome.i18n.getMessage("openContextMenuTitle"),
    contexts: ["link"], // Only appears when the user clicks on a link
});

// Triggers when the user clicks on the immuto option in the
// context menu (right click menu)
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    let fileUrl = info.linkUrl;

    // Gets the file content
    currentFileContent = await getFileDataFromUrl(fileUrl).catch((err) => {
        console.error(err);
    });

    // Sends the content and auth info to the content script to make the correct immuto
    // api requests
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tab.id, {
            action: "immuto_verify",
            fileContent: currentFileContent,
            email: localStorage.IMMUTO_email,
            password: localStorage.IMMUTO_EXTENSION_password,
        });
    });
});

// Makes a get request to the url that the user is trying to verify.
// Returns the recieved content
function getFileDataFromUrl(fileUrl) {
    return new Promise(async (resolve, reject) => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
        };

        let fetchResponse;
        await fetch(fileUrl, options)
            .then((data) => {
                fetchResponse = data;
            })
            .catch((err) => {
                reject(err);
            });

        let responseBlob;
        await fetchResponse
            .blob()
            .then((blob) => {
                responseBlob = blob;
            })
            .catch((err) => {
                reject(err);
            });

        await get_file_content(responseBlob)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

// Converts file to string so that it can be uploaded with the immuto api
const get_file_content = (file) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (evt) => {
            resolve(new Uint8Array(evt.target.result).toString());
        };
    });
};
