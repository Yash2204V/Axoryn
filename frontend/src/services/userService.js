import axios from 'axios';
import conf from '../conf/conf.js';

export class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: `${conf.backendUrl}/users`, // e.g., 'http://localhost:8000/api/v1'
        });
    }

    async registerUser({ fullName, email, username, password, avatar, coverImage }) {
        try {
            const res = await this.api.post('/register', {
                fullName,
                email,
                username,
                password,
                avatar,
                coverImage
            });
            return res.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    async login({ username, email, password }) {
        try {

            const payload = { password };

            if (username) {
                payload.username = username;
            } else if (email) {
                payload.email = email;
            } else {
                throw new Error("Username and Email not found.");
            }

            const res = await this.api.post('/login', payload);

            console.log("login data", res.data);

            return res.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    async logout() {
        try {
            const res = await this.api.post('/logout');
            return res.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    async getCurrentUser() {
        try {
            const res = await this.api.get('/current-user');
            return res.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
}

const userService = new UserService();
export default userService;