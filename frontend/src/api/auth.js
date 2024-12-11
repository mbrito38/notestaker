import axiosInstance from './axios';

export const signup = async (data) => {
    return await axiosInstance.post('/accounts/signup/', data);
};

export const login = async (data) => {
    return await axiosInstance.post('/token/', data);
};

