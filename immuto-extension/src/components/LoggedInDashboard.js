import React from "react";
import FileUpload from "./FileUpload";
const Immuto = window.Immuto; // Load global, injected by pre-built immuto.js
let im = Immuto.init(true, "https://dev.immuto.io");
export default function LoggedInDashboard({ redirect }) {
    const handleLogout = async () => {
        await im
            .deauthenticate()
            .then((res) => {
                window.localStorage.password = "";
                console.log("logged out");
            })
            .catch((err) => console.error(err));
        redirect("login");
    };

    return (
        <>
            <div style={{ display: "inline-flex" }}>
                <FileUpload />
                <button onClick={() => handleLogout()}>Logout</button>
            </div>
        </>
    );
}
