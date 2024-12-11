import axiosInstance from './axios';

export const getNotes = async (token) => {
    return await axiosInstance.get('/notes/', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const createNote = async (data, token) => {
    return await axiosInstance.post('/notes/', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateNote = async (id, data, token) => {
    return await axiosInstance.put(`/notes/${id}/`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteNote = async (id, token) => {
    return await axiosInstance.delete(`/notes/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

