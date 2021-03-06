var im;
var iframe;
var fileInfo;

// Listens for messages sent from background.js
chrome.runtime.onMessage.addListener(async (message) => {
    im = Immuto.init(true, "https://dev.immuto.io");
    if (message.action == "no_store") {
        // Clears all iframes from the dom
        let frames = document.getElementsByTagName("iframe");
        for (let i = 0; i < frames.length; ++i) {
            document.body.removeChild(frames[i]);
        }
    } else if (message.action == "immuto_store") {
        await im.deauthenticate().catch((err) => console.error(object)(err));
        await im.authenticate(message.email, message.password).catch((err) => {
            console.error(err);
        });

        // Creates an immuto upload
        await handleFileUpload(
            message.fileContent,
            message.fileName,
            message.email,
            message.password
        )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });

        // Clears all iframes from the dom
        let frames = document.getElementsByTagName("iframe");
        for (let i = 0; i < frames.length; ++i) {
            document.body.removeChild(frames[i]);
        }
    } else if (message.action == "immuto_verify") {
        let loggedIn = true;
        await im.deauthenticate().catch((err) => reject(err));
        await im.authenticate(message.email, message.password).catch((err) => {
            loggedIn = false;
            console.error("Login first!");
        });

        if (!loggedIn) {
            return;
        }

        // Looks for records with the same file content
        await im
            .search_records_by_content(message.fileContent)
            .then((result) => {
                if (!result || !result.records || result.records.length <= 0) {
                    // If no records were found with the given content, it gives the user
                    // the option to create the record by providing the following dialog
                    iframe = document.createElement("iframe");
                    iframe.src = chrome.runtime.getURL("upload_frame.html");
                    iframe.style.cssText =
                        "position:fixed;top:10px;right:10px;display:block;" +
                        "width:270px;height:240px;z-index:10000;";
                    document.body.appendChild(iframe);
                } else {
                    // If records were found with the given content, we double check its validity
                    // with the immuto api
                    im.verify_data_management(
                        result.records[0].contractAddr,
                        "editable",
                        message.fileContent
                    )
                        .then((verification) => {
                            if (verification !== false) {
                                iframe = document.createElement("iframe");
                                let creator = verification.email;
                                let timeStamp = verification.timestamp;

                                // Passes in the creator's email, and the records timestamp into
                                // the iframe
                                iframe.src = chrome.runtime.getURL(
                                    `verification_frame.html?creator=${creator}&timeStamp=${timeStamp}`
                                );
                                iframe.style.cssText =
                                    "position:fixed;top:10px;right:10px;display:block;" +
                                    "width:270px;height:240px;z-index:10000;";
                                document.body.appendChild(iframe);
                            } else {
                                console.log(
                                    "could not verify that immuto record"
                                );
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                }
            })
            .catch((err) => console.error(err));
    }
});

// Uploads the file to immuto if it is not already backed up
function handleFileUpload(fileContent, fileName, email, password) {
    return new Promise(async (resolve, reject) => {
        await im.deauthenticate().catch((err) => reject(err));
        await im.authenticate(email, password).catch((err) => {
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
