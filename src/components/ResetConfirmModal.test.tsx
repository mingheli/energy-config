import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetConfirmModal from './ResetConfirmModal';

describe('ResetConfirmModal Component', () => {
    const mockOnConfirm = jest.fn();
    const mockOnCancel = jest.fn();

    beforeEach(() => {
        mockOnConfirm.mockClear();
        mockOnCancel.mockClear();
    });

    test('renders modal text correctly', () => {
        render(
            <ResetConfirmModal
                showModal={true}
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        expect(screen.getByText(/are you sure you want to reset\?/i)).toBeInTheDocument();
    });

    test('calls onConfirm when confirm button is clicked', () => {
        render(
            <ResetConfirmModal
                showModal={true}
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        fireEvent.click(screen.getByText(/confirm/i));
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    test('calls onCancel when cancel button is clicked', () => {
        render(
            <ResetConfirmModal
                showModal={true}
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        fireEvent.click(screen.getByText(/cancel/i));
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    test('does not render modal when showModal is false', () => {
        render(
            <ResetConfirmModal
                showModal={false}
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        expect(screen.queryByText(/are you sure you want to reset\?/i)).not.toBeInTheDocument();
    });
});