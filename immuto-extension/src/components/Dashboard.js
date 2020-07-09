import React from "react";
import LoggedInDashboard from "./LoggedInDashboard";
import LoggedOutDashboard from "./LoggedOutDashboard";

const Immuto = window.Immuto;
let im = Immuto.init(true, "https://dev.immuto.io");

export default function Dashboard({ redirect }) {
    // Sends the user to the correct dashboard depending on their auth status
    if (im.authToken) {
        return <LoggedInDashboard redirect={redirect} />;
    } else {
        return <LoggedOutDashboard redirect={redirect} />;
    }
}
