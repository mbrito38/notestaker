import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNote } from '../api/notes';
import AudioRecorder from '../components/AudioRecorder';

const CreateNote = () => {
    const [formData, setFormData] = useState({ title: '', description: '', audio: null });
    const navigate = useNavigate();
    const token = localStorage.getItem('access');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAudioSave = (audioBlob) => {
        setFormData({ ...formData, audio: audioBlob });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const noteData = new FormData();

        noteData.append('title', formData.title);
        noteData.append('description', formData.description);

        // Add the audio file if present
        if (formData.audio) {
            noteData.append('audio_file', formData.audio, 'recording.webm');
        }

        try {
            await createNote(noteData, token); // Use the abstracted API function
            navigate('/notes'); // Redirect to notes page
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Create Note</h1>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="form-group mb-3">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Enter title"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        placeholder="Enter description"
                        rows="5"
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="audio-recorder">Audio Recorder</label>
                    <AudioRecorder onSave={handleAudioSave} />
                </div>
                <button id="audio-recorder" type="submit" className="btn btn-primary btn-block w-100 mt-3" data-testid="create-note-button">
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateNote;
