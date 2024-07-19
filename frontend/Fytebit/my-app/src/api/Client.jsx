import axios from 'axios';


export async function getTokenTGWebApp(baseUrl, initData) {
    try {
        const response = await axios.post(`${baseUrl}/auth/telegramwebapp`, {
            init_data: initData
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getTokenTG(baseUrl, initData) {
    try {
        const response = await axios.post(`${baseUrl}/auth/telegram`, {
            init_data: initData
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function checkJWTAuth(baseUrl, token) {
    try {
        const response = await axios.get(`${baseUrl}/api/checkAuth`, {
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


export async function getEvents(baseUrl, token) {
    try {
        const response = await axios.get(`${baseUrl}/events`, {
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

export async function newEvent(baseUrl, token) {
    try {
        const response = await axios.get(`${baseUrl}/events/new`, {
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

export async function getEventById(baseUrl, token, event_id) {
    try {
        const response = await axios.get(`${baseUrl}/events/getByID/${event_id}`, {
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

export async function uploadImageToEvent(baseUrl, token, event_id, formData) {
    try {
        const response = await axios.post(`${baseUrl}/events/upload/image/${event_id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}