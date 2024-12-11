import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/pages/Login';

test('submits the login form', () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Username/i), {
        target: { value: 'testuser' },
    });

    fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: 'testpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Add assertions to verify the form submission behavior
    // For example: Check if API call is triggered
});
