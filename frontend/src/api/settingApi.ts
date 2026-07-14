import api from "./axios";

import type { ApiResponse, Setting } from "../types/Api";

const get = async (): Promise<Setting> => {
    const response = await api.get<ApiResponse<Setting>>("/settings");

    return response.data.data;
};

const update = async (payload: Setting): Promise<Setting> => {
    const response = await api.put<ApiResponse<Setting>>("/settings", payload);

    return response.data.data;
};

export default { get, update };
