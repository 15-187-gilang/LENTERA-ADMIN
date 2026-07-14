import api from "./axios";
import type { ApiResponse, Media, MediaListResponse } from "../types/Api";

/**
 * --------------------------------------------------------------------------
 * Media API
 * --------------------------------------------------------------------------
 * Mengelola seluruh request HTTP ke endpoint /media.
 */

const list = async (params?: {
    page?: number;
    per_page?: number;
    search?: string;
}): Promise<MediaListResponse> => {
    const response = await api.get("/media", { params });
    return {
        data: response.data.data,
        pagination: response.data.pagination,
    };
};

const show = async (id: number): Promise<Media> => {
    const response = await api.get<ApiResponse<Media>>(`/media/${id}`);
    return response.data.data;
};

const upload = async (file: File): Promise<Media> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<ApiResponse<Media>>("/media", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data.data;
};

const remove = (id: number) => api.delete(`/media/${id}`);

export default { list, show, upload, remove };
