import React, { useState } from "react";

const Immuto = window.Immuto; // Load global, injected by pre-built immuto.js
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

        let recordID = await im
            .upload_file_data(
                fileContent,
                file.name,
                window.localStorage.password
            )
            .catch((err) => {
                console.error(err);
            });

        let verification = await im
            .verify_data_management(recordID, "basic", fileContent)
            .catch((err) => {
                console.error(err);
            });

        if (verification) {
            console.log("File successfully uploaded");
        } else {
            console.error("File upload was unsuccessful");
        }
    };

    const get_file_content = (file) => {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = (evt) => {
                resolve(evt.target.result.toString());
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
