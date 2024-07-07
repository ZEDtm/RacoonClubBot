import axios from 'axios';

export async function getTokenTGWebApp(initData) {
    try {
        const response = await axios.post('http://localhost:8000/auth/telegramwebapp', {
            init_data: initData
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getTokenTG(initData) {
    try {
        const response = await axios.post('http://localhost:8000/auth/telegram', {
            init_data: initData
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function checkJWTAuth(token) {
    try {
        const response = await axios.get('http://localhost:8000/api/checkAuth', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getEvents(token) {
    try {
        const response = await axios.get('http://localhost:8000/events', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}