import api from "./axios";
import type { LoginRequest, LoginResponse } from "../types/Auth";

class AuthApi {
    async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>("/login", data);

        return response.data;
    }

    async logout(): Promise<void> {
        await api.post("/logout");
    }

    async me() {
        const response = await api.get("/me");

        return response.data;
    }
}

export default new AuthApi();
