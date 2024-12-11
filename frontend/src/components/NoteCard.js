import React from 'react';
import { Link } from 'react-router-dom';

const NoteCard = ({ note, onDelete }) => {
    return (
        <div className="note-card">
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <div>
                <Link to={`/edit-note/${note.id}`}>Edit</Link>
                <button onClick={() => onDelete(note.id)}>Delete</button>
            </div>
        </div>
    );
};

export default NoteCard;

