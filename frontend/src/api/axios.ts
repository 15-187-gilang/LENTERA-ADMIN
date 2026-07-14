import axios from "axios";
import { getToken } from "../utils/auth";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10 detik
});

// Menambahkan token ke setiap request jika tersedia
api.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

// Menangani response error global
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Token tidak valid atau sudah logout
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("admin");

            // Hindari redirect jika memang sedang berada di halaman login
            if (window.location.pathname !== "/") {
                window.location.href = "/";
            }
        }

        return Promise.reject(error);
    },
);

export default api;
