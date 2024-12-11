import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CreateNote from '../src/pages/CreateNote';
import { useNavigate } from 'react-router-dom';

// Mock the `useNavigate` hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

// Mock the fetch API
beforeAll(() => {
    global.fetch = jest.fn((url, options) => {
        const formData = options.body;

        // Validate FormData contents
        if (formData instanceof FormData) {
            const title = formData.get('title');
            const description = formData.get('description');
            const audioFile = formData.get('audio_file');

            expect(title).toBe('Test Note Title');
            expect(description).toBe('Test Note Description');
            expect(audioFile).toBeInstanceOf(Blob); // Validate audio file type
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
                        const mockAudioBlob = new Blob(['mock audio data'], { type: 'audio/webm' });
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
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        render(<CreateNote />);

        // Fill in the note title
        fireEvent.change(screen.getByPlaceholderText(/Enter title/i), {
            target: { value: 'Test Note Title' },
        });

        // Fill in the note description
        fireEvent.change(screen.getByPlaceholderText(/Enter description/i), {
            target: { value: 'Test Note Description' },
        });

        // Simulate starting and saving audio recording
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


        expect(mockNavigate).toHaveBeenCalledWith('/notes');
    });
});
