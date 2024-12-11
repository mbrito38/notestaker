import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNotes, updateNote } from '../api/notes';

const EditNote = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({ title: '', description: '' });
    const navigate = useNavigate();
    const token = localStorage.getItem('access');

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await getNotes(token);
                const note = response.data.find((note) => note.id === parseInt(id));
                setFormData(note || { title: '', description: '' });
            } catch (error) {
                console.error('Error fetching note:', error);
            }
        };
        fetchNote();
    }, [id, token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateNote(id, formData, token);
            navigate('/notes');
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Edit Note</h1>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="form-group mb-3">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        placeholder="Enter title"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={formData.description}
                        placeholder="Enter description"
                        rows="5"
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-block w-100">
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditNote;

