import React from "react";
import LoggedInDashboard from "./LoggedInDashboard";
import LoggedOutDashboard from "./LoggedOutDashboard";

const Immuto = window.Immuto; // Load global, injected by pre-built immuto.js
let im = Immuto.init(true, "https://dev.immuto.io");

export default function Dashboard({ redirect }) {
    if (im.authToken) {
        return <LoggedInDashboard redirect={redirect} />;
    } else {
        return <LoggedOutDashboard redirect={redirect} />;
    }
}
