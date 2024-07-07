import { useEffect, useRef } from 'react';
import { getTokenTG } from '../api/Client';
import React from "react";


export const ButtonTelegramAuth = () => {
    const scriptRef = useRef(null);
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.setAttribute('data-telegram-login', 'fytebit_bot');
        script.setAttribute('data-size', 'small');
        script.setAttribute('data-radius', '5');
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');

        const container = document.getElementById('telegram-widget-container');
        if (container) {
            container.appendChild(script);
            
        }
        scriptRef.current = script;
        window.onTelegramAuth = function (user) {
            getTokenTG(user)
            .then(data => {
                if (data.success) {
                    localStorage.setItem('access_token', data.access_token);
                } else {
                    console.error('Authentication failed:', data.error);
                }
            }).then( () => window.location.reload())
            .catch(error => {
                console.error('Error:', error);
            });
        };

    }, []);



    return (
        <div>
            <h1>Login with Telegram</h1>
            <div id="telegram-widget-container"></div>
        </div>
    );
};