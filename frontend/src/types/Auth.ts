export interface Admin {
    id: number;
    name: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginData {
    admin: Admin;
    token: string;
    token_type: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: LoginData;
}
