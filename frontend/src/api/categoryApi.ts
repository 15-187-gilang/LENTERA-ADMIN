import api from "./axios";

import type { ApiResponse, Category, CategoryListResponse } from "../types/Api";

const list = async (
    params?: {
        page?: number;
        per_page?: number;
        search?: string;
    }
): Promise<CategoryListResponse> => {
    const response = await api.get("/categories", { params });

    return {
        data: response.data.data,
        pagination: response.data.pagination,
    };
};

const create = async (
    name: string,
    description?: string,
): Promise<Category> => {
    const response = await api.post<ApiResponse<Category>>("/categories", {
        name,
        description,
    });

    return response.data.data;
};

const update = async (
    id: number,
    name: string,
    description?: string,
): Promise<Category> => {
    const response = await api.put<ApiResponse<Category>>(`/categories/${id}`, {
        name,
        description,
    });

    return response.data.data;
};

const show = async (id: number): Promise<Category> => {
    const response = await api.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data;
};

const remove = (id: number) => api.delete(`/categories/${id}`);

export default { list, create, update, show, remove };
