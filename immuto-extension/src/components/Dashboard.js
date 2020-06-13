import React from "react";

export default function Dashboard({ redirect }) {
  return (
    <>
      <h3>Dashboard</h3>
      <button onClick={() => redirect("login")}>Login</button>
      <a href="https://app.immuto.io/register">
        <button>Register</button>
      </a>
    </>
  );
}
