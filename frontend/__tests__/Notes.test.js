import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Notes from '../src/pages/Notes';
import { getNotes } from '../src/api/notes';

jest.mock('../src/api/notes');

const mockNotes = [
    { id: 1, title: 'Note 1', description: 'Description 1', audio_file: null },
    { id: 2, title: 'Note 2', description: 'Description 2', audio_file: null },
];

test('renders notes table', async () => {
    getNotes.mockResolvedValueOnce({ data: mockNotes });

    // Use `act` to ensure React processes all updates
    await act(async () => {
        render(<Notes />);
    });

    expect(screen.getByText(/Note 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Note 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 2/i)).toBeInTheDocument();
});
