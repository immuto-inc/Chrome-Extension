var im;

chrome.runtime.onMessage.addListener(async (message) => {
    console.log("in verification frame");
    // im = Immuto.init(true, "https://dev.immuto.io");
    // if (message.action == "does_record_exist") {
    //     await im
    //         .search_records_by_content(message.fileContent)
    //         .then((result) => {
    //             if (!result || !result.records || result.records.length <= 0) {
    //                 return;
    //             }
    //             im.verify_data_management(
    //                 result.records[0].contractAddr,
    //                 "editable",
    //                 message.fileContent
    //             )
    //                 .then((verification) => {
    //                     if (verification !== false) {
    //                         iframe = document.createElement("iframe");

    //                         iframe.src = chrome.runtime.getURL(
    //                             "verification_frame.html"
    //                         );
    //                         iframe.style.cssText =
    //                             "position:fixed;top:10px;right:10px;display:block;" +
    //                             "width:270px;height:180px;z-index:10000;";
    //                         iframe.getElementById("creator").value =
    //                             "i am creator";
    //                         iframe.getElementById("timeStamp").value =
    //                             "the beginning of time";
    //                         document.body.appendChild(iframe);
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     console.error(err);
    //                 });
    //         })
    //         .catch((err) => console.error(err));
    // }
});

// function store() {
//     let name = document.getElementById("name").value;
//     chrome.runtime.sendMessage({
//         action: "store backup",
//         name: name,
//     });
// }

// function exit() {
//     chrome.runtime.sendMessage({
//         action: "no_store",
//     });
// }

// function DOM_loaded() {
// document.getElementById("store").addEventListener("click", store);
// document.getElementById("exit").addEventListener("click", exit);
// }

// document.addEventListener("DOMContentLoaded", DOM_loaded);
