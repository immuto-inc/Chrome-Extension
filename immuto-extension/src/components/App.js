import React, { useState } from "react";
import Dashboard from "./Dashboard";
import LoggedOutDashboard from "./LoggedOutDashboard";
import Login from "./Login";
export default function App() {
    const [view, setView] = useState("dashboard");

    const redirect = (v) => {
        setView(v);
    };

    let viewComponent = null;
    switch (view) {
        case "dashboard":
            viewComponent = <Dashboard redirect={redirect} />;
            break;
        case "login":
            viewComponent = <Login redirect={redirect} />;
            break;
        case "loggedOutDashboard":
            viewComponent = <LoggedOutDashboard redirect={redirect} />;
            break;
        default:
            viewComponent = <Dashboard />;
    }

    return viewComponent;
}
