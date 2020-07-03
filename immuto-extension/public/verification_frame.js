var params = location.href.split("?")[1].split("&");
data = {};
for (x in params) {
    data[params[x].split("=")[0]] = params[x].split("=")[1];
}

function exit() {
    chrome.runtime.sendMessage({
        action: "no_store",
    });
}

function DOM_loaded() {
    document.getElementById("exit").addEventListener("click", exit);
    document.getElementById("creator").innerHTML = data["creator"];
    document.getElementById("timeStamp").innerHTML = data["timeStamp"];
}

document.addEventListener("DOMContentLoaded", DOM_loaded);
