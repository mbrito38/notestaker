import axiosInstance from './axios';

// Get notes
export const getNotes = async (token) => {
    return await axiosInstance.get('/notes/', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Create a new note
export const createNote = async (formData, token) => {
    // Use FormData directly for file uploads
    return await axiosInstance.post('/notes/', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Ensure proper headers for FormData
        },
    });
};

// Update an existing note
export const updateNote = async (id, formData, token) => {
    // Use FormData directly for file uploads
    return await axiosInstance.put(`/notes/${id}/`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Ensure proper headers for FormData
        },
    });
};

// Delete a note
export const deleteNote = async (id, token) => {
    return await axiosInstance.delete(`/notes/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
