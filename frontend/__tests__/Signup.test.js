import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '../src/pages/Signup';

test('submits the signup form', () => {
    render(<Signup />);

    fireEvent.change(screen.getByLabelText(/Username/i), {
        target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'testuser@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Signup/i }));

    // Add assertions for expected behavior after form submission
    expect(screen.getByLabelText(/Username/i).value).toBe('testuser');
    expect(screen.getByLabelText(/Email/i).value).toBe('testuser@example.com');
    expect(screen.getByLabelText(/Password/i).value).toBe('password123');
});
