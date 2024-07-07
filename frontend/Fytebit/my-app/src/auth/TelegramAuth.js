import { useEffect } from 'react';
import { getTokenTGWebApp }  from '../api/Client'

const TelegramAuth = () => {

    useEffect(() => {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.enableClosingConfirmation()
        
       
        const initData = window.Telegram.WebApp.initData
        if (initData) {
            getTokenTGWebApp(initData)
            .then(data => {
                if (data.success) {
                    localStorage.setItem('access_token', data.access_token);
                } else {
                    console.error('Authentication failed:', data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, []);

    return null;
};



export default TelegramAuth;