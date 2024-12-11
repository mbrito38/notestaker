import React, { useState } from 'react';
import { signup } from '../api/auth';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Signup failed');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Signup</h1>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="form-group mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Enter username"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block w-100">
                    Signup
                </button>
                {message && <p className="text-center mt-3">{message}</p>}
            </form>
        </div>
    );
};

export default Signup;

