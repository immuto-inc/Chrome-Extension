var im;
var iframe;
var fileInfo;

chrome.runtime.onMessage.addListener(async (message) => {
    im = Immuto.init(true, "https://dev.immuto.io");
    if (message.action == "no_store") {
        if (iframe) {
            document.body.removeChild(iframe);
        }
    } else if (message.action == "immuto_store") {
        await handleFileUpload(message.fileInfo, message.fileName)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
        document.body.removeChild(iframe);
    } else if (message.action == "does_record_exist") {
        await im.deauthenticate().catch((err) => reject(err));
        await im
            .authenticate("immuto.test@gmail.com", "Test12345!")
            .catch((err) => {
                reject(err);
            });

        await im
            .search_records_by_content(message.fileContent)
            .then((result) => {
                if (!result || !result.records || result.records.length <= 0) {
                    return;
                }
                im.verify_data_management(
                    result.records[0].contractAddr,
                    "editable",
                    message.fileContent
                )
                    .then((verification) => {
                        iframe = document.createElement("iframe");
                        if (verification !== false) {
                            iframe.src = chrome.runtime.getURL(
                                "verification_frame.html"
                            );
                            iframe.style.cssText =
                                "position:fixed;top:10px;right:10px;display:block;" +
                                "width:270px;height:180px;z-index:10000;";
                            let f = document.body.querySelectorAll("iframe");
                            console.log(f);
                            console.log(f[f.length - 1]);
                            // f[f.length - 1].getElementById("creator").value =
                            //     "i am the creator";
                        } else {
                            iframe.src = chrome.runtime.getURL(
                                "upload_frame.html"
                            );
                            iframe.style.cssText =
                                "position:fixed;top:10px;right:10px;display:block;" +
                                "width:270px;height:180px;z-index:10000;";
                        }
                        document.body.appendChild(iframe);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            })
            .catch((err) => console.error(err));
    }
});

function handleFileUpload(fileContent, fileName) {
    return new Promise(async (resolve, reject) => {
        await im.deauthenticate().catch((err) => reject(err));
        await im
            .authenticate("immuto.test@gmail.com", "Test12345!")
            .catch((err) => {
                reject(err);
            });

        let backedUpAlready = false;
        await im
            .search_records_by_content(fileContent)
            .then((result) => {
                if (result && result.records && result.records.length > 0) {
                    resolve("The document is already backed up by immuto");
                    backedUpAlready = true;
                }
            })
            .catch((err) => reject(err));

        if (backedUpAlready) {
            return;
        }

        await im
            .upload_file_data(fileContent, fileName, "Test12345!")
            .then(() => {
                resolve("Successfully Backed Up File");
            })
            .catch((err) => {
                console.error(err);
            });
    });
}
