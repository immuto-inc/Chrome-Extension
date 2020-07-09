import React from "react";
import AutoPrompt from "./AutoPrompt";
import FileUpload from "./FileUpload";

const Immuto = window.Immuto;
let im = Immuto.init(true, "https://dev.immuto.io");

export default function LoggedInDashboard({ redirect }) {
    const handleLogout = async () => {
        await im
            .deauthenticate()
            .then(() => {
                // Clears the localStorage password
                window.localStorage.IMMUTO_EXTENSION_password = "";
            })
            .catch((err) => console.error(err));
        redirect("login");
    };

    return (
        <>
            <div style={{ display: "inline-flex" }}>
                <AutoPrompt />
                <FileUpload />
                <button onClick={() => handleLogout()}>Logout</button>
            </div>
        </>
    );
}
