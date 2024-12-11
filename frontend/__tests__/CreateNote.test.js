import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CreateNote from '../src/pages/CreateNote';

// Mock the fetch API
beforeAll(() => {
    global.fetch = jest.fn((url, options) => {
        const formData = options.body;

        if (formData instanceof FormData) {
            expect(formData.get('title')).toBe('Test Note Title');
            expect(formData.get('description')).toBe('Test Note Description');
            expect(formData.get('audio_file')).toBeTruthy(); // Ensure audio file is included
        }

        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: true }),
        });
    });
});

afterAll(() => {
    global.fetch.mockClear();
});

// Mock the AudioRecorder component
jest.mock('../src/components/AudioRecorder', () => {
    return function MockAudioRecorder({ onSave }) {
        return (
            <div>
                <button
                    onClick={() => {
                        const mockAudioBlob = new Blob(['audio'], { type: 'audio/webm' });
                        onSave(mockAudioBlob);
                    }}
                >
                    Start Recording
                </button>
            </div>
        );
    };
});

describe('CreateNote Component', () => {
    it('creates a note with sound recording', async () => {
        render(<CreateNote />);

        // Fill in the note title
        fireEvent.change(screen.getByPlaceholderText(/Enter title/i), {
            target: { value: 'Test Note Title' },
        });

        // Fill in the note description
        fireEvent.change(screen.getByPlaceholderText(/Enter description/i), {
            target: { value: 'Test Note Description' },
        });

        // Start recording audio
        fireEvent.click(screen.getByText(/Start Recording/i));

        // Submit the form
        fireEvent.click(screen.getByTestId('create-note-button'));

        // Wait for the backend call
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                'http://localhost:8000/api/notes/',
                expect.objectContaining({
                    method: 'POST',
                    body: expect.any(FormData),
                })
            );
        });

        // Assert post-creation behavior
        expect(screen.getByText(/Note created successfully/i)).toBeInTheDocument();
    });
});
