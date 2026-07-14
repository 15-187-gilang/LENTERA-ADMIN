export const saveToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const saveAdmin = (admin: unknown) => {
    localStorage.setItem("admin", JSON.stringify(admin));
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getAdmin = () => {
    const admin = localStorage.getItem("admin");

    return admin ? JSON.parse(admin) : null;
};

export const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
};

export const isAuthenticated = () => {
    return !!getToken();
};
