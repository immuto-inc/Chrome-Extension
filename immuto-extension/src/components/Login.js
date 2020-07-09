import React, { useState } from "react";
const Immuto = window.Immuto;
let im = Immuto.init(true, "https://dev.immuto.io");

export default function Login({ redirect }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Logs in the user
    const handleSubmit = async (e) => {
        e.preventDefault();

        await im.deauthenticate().catch((err) => console.error(err));

        await im
            .authenticate(email, password)
            .then((authToken) => {
                if (authToken) {
                    console.log("Login Successful");
                    window.localStorage.IMMUTO_EXTENSION_password = password;
                    redirect("dashboard");
                }
            })
            .catch((err) => {
                console.error(err);
            });
        setEmail("");
        setPassword("");
        setError("incorrect credentials");
    };

    return (
        <>
            <h2>Login</h2>
            {error ? error : null}
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={() => redirect("dashboard")}>Back</button>
                <button type="submit">Login</button>
            </form>
        </>
    );
}
