import React, { useEffect, useState } from 'react';
import { getNotes, deleteNote } from '../api/notes';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const token = localStorage.getItem('access');

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await getNotes(token);
                setNotes(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };
        fetchNotes();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await deleteNote(id, token);
            setNotes(notes.filter((note) => note.id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Your Notes</h1>
            <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Audio</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note) => (
                        <tr key={note.id}>
                            <td>{note.title}</td>
                            <td>{note.description}</td>
                            <td>
                                {note.audio_file && (
                                    <audio controls>
                                        <source
                                            src={`http://localhost:8000${note.audio_file}`}
                                            type="audio/webm"
                                        />
                                        Your browser does not support the audio element.
                                    </audio>
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => (window.location.href = `/edit-note/${note.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    data-testid={`delete-button-${note.id}`}
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(note.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Notes;
