var fileID = -1;
var tabID = -1;
var currentFileContent;

chrome.downloads.onChanged.addListener(async (delta) => {
    if (!delta.state || delta.state.current != "complete") {
        return;
    }
    chrome.downloads.search({ id: delta.id }, async (res) => {
        let fileUrl = res[0].url;
        currentFileContent = await getFileDataFromUrl(fileUrl).catch((err) => {
            console.error(err);
        });

        chrome.tabs.query({ active: true, currentWindow: true }, function (
            tabs
        ) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "does_record_exist",
                fileContent: currentFileContent,
            });
        });

        chrome.tabs.executeScript({
            file: "content.js",
        });
    });
});

chrome.runtime.onMessage.addListener(function (message, sender) {
    tabID = sender.tab.id;
    if (message.action == "store backup") {
        console.log("name", message.name);
        chrome.tabs.sendMessage(tabID, {
            action: "immuto_store",
            fileContent: currentFileContent,
            fileName: message.name,
        });
    } else if (message.action == "no_store") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (
            tabs
        ) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "no_store",
            });
        });
        console.log("sending to content.js");
    }
});

chrome.contextMenus.create({
    id: "open",
    title: chrome.i18n.getMessage("openContextMenuTitle"),
    contexts: ["link"],
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    let fileUrl = info.linkUrl;

    let fileContent = await getFileDataFromUrl(fileUrl).catch((err) => {
        console.error(err);
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tab.id, {
            action: "immuto_store",
            fileContent: fileContent,
            fileName: "PLACEHOLDER",
        });
    });
});

function getFileDataFromUrl(fileUrl) {
    return new Promise(async (resolve, reject) => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
        };

        await fetch(fileUrl, options)
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                fileContent = data;
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
