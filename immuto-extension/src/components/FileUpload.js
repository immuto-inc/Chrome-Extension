import React, { useState } from "react";

const Immuto = window.Immuto;
let im = Immuto.init(true, "https://dev.immuto.io");

export default function FileUpload() {
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState("");

    const handleClick = async () => {
        if (file == null) {
            console.error("no file is given");
            return;
        }

        let fileContent = await get_file_content(file).catch((err) => {
            console.error(err);
        });

        // Uploads the stringified file
        let recordID = await im
            .upload_file_data(
                fileContent,
                file.name,
                window.localStorage.IMMUTO_EXTENSION_password
            )
            .catch((err) => {
                console.error(err);
            });

        // Verifies that the file was uploaded correctly
        let verification = await im
            .verify_data_management(recordID, "editable", fileContent)
            .catch((err) => {
                console.error(err);
            });

        if (verification) {
            console.log("File successfully uploaded");
        } else {
            console.error("File upload was unsuccessful");
        }
        setFile("");
        setFileName("");
    };

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

    return (
        <>
            <input
                type="file"
                className="form-control-file"
                id="file-input"
                value={fileName}
                onChange={(e) => {
                    setFile(e.target.files[0]);
                    setFileName(e.target.value);
                }}
            />
            <button onClick={() => handleClick()}>Upload</button>
        </>
    );
}
