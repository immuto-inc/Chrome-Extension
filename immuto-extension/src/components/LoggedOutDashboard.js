import React from "react";

export default function LoggedOutDashboard({ redirect }) {
    return (
        <>
            <h2>Immuto</h2>
            <button onClick={() => redirect("login")}>Login</button>
            <a href={"https://app.immuto.io/register"} target="_blank">
                <button>Register</button>
            </a>
        </>
    );
}
