import axios from 'axios';
import conf from '../conf/conf.js';


export class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: `${conf.backendUrl}/users`, // e.g., 'http://localhost:8000/api/v1'
        }); // The Instance of Axios.

        this.api.interceptors.request.use((config) => { 
            // "Interceptor ensures before you send any request, run this function.”

            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

    }



    async registerUser({ formData }) {
        // Here, formData is the instance of new FormData(): That's why it contains all text and file field. (To avoid JSON Data in place of multer files.)

        try {
            // console.log("Form Data", formData);

            const res = await this.api.post('/register', formData);
            return res.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    async login({ username, email, password }) {
        try {
            // console.log(username, email, password);

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