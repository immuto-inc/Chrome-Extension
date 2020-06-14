import React from "react";
const Immuto = window.Immuto; // Load global, injected by pre-built immuto.js
let im = Immuto.init(true, "https://dev.immuto.io");
export default function LoggedOutDashboard({ redirect }) {
  return (
    <>
      <button onClick={() => redirect("login")}>Login</button>
      <a href="https://app.immuto.io/register">
        <button>Register</button>
      </a>
    </>
  );
}
