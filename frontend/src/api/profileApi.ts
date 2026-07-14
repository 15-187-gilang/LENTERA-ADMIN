import api from "./axios";

import type { ApiResponse } from "../types/Api";
import type {
    Profile,
    UpdateProfilePayload,
    ChangePasswordPayload,
} from "../types/Profile";

/**
 * Mengambil data profil admin yang sedang login.
 *
 * GET /api/profile
 */
const show = async (): Promise<Profile> => {
    const response = await api.get<ApiResponse<Profile>>("/profile");
    return response.data.data;
};

/**
 * Memperbarui nama dan email admin.
 *
 * PUT /api/profile
 */
const update = async (payload: UpdateProfilePayload): Promise<Profile> => {
    const response = await api.put<ApiResponse<Profile>>("/profile", payload);
    return response.data.data;
};

/**
 * Mengganti password admin.
 *
 * PUT /api/profile/password
 */
const changePassword = async (
    payload: ChangePasswordPayload
): Promise<void> => {
    await api.put("/profile/password", payload);
};

export default { show, update, changePassword };
