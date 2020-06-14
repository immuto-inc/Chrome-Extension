import React from "react";
const Immuto = window.Immuto; // Load global, injected by pre-built immuto.js
let im = Immuto.init(true, "https://dev.immuto.io");
export default function LoggedInDashboard({ redirect }) {
  const handleLogout = async () => {
    await im
      .deauthenticate()
      .then((res) => {
        console.log("logged out");
      })
      .catch((err) => console.error(err));
    redirect("login");
  };

  return (
    <>
      <div style={{ display: "inline-flex" }}>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    </>
  );
}
