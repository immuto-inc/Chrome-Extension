import React, { useEffect, useState } from "react";

export default function AutoPrompt() {
    const [autoPrompt, setAutoPrompt] = useState("off");

    useEffect(() => {
        setAutoPrompt(window.localStorage.IMMUTO_EXTENSION_autoPrompt);
    }, []);

    const handleClick = () => {
        if (autoPrompt === "on") {
            setAutoPrompt("off");
            window.localStorage.IMMUTO_EXTENSION_autoPrompt = "off";
        } else {
            setAutoPrompt("on");
            window.localStorage.IMMUTO_EXTENSION_autoPrompt = "on";
        }
    };

    return (
        <div>
            Auto-Prompt:
            <button onClick={() => handleClick()}>{autoPrompt}</button>
        </div>
    );
}
