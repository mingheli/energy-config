import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { formatPrice } from './utils/commonUtils';

// Mock data
const mockData = {
    devices: [
        { id: 1, name: 'Device 1' },
        { id: 2, name: 'Device 2' },
    ],
};

const mockAddedDevices = [
    { id: 1, name: 'Device 1' },
];

const mockCurrentDevice = { id: 1, name: 'Device 1' };

// Mock functions
const mockHandlePlus = jest.fn();
const mockHandleMinus = jest.fn();
const mockHandleMoveDown = jest.fn();
const mockHandleMoveUp = jest.fn();
const mockHandleSelectDevice = jest.fn();
const mockHandleModalConfirm = jest.fn();
const mockHandleModalCancel = jest.fn();
const mockHandleFullClose = jest.fn();

jest.mock('./utils/commonUtils', () => ({
    formatPrice: jest.fn((price) => `$${price}`),
}));

describe('App Component', () => {
    beforeEach(() => {
        render(
            <App
                data={mockData}
                addedDevices={mockAddedDevices}
                currentDevice={mockCurrentDevice}
                handlePlus={mockHandlePlus}
                handleMinus={mockHandleMinus}
                handleMoveDown={mockHandleMoveDown}
                handleMoveUp={mockHandleMoveUp}
                handleSelectDevice={mockHandleSelectDevice}
                handleModalConfirm={mockHandleModalConfirm}
                handleModalCancel={mockHandleModalCancel}
                handleFullClose={mockHandleFullClose}
                price={19.99}
                fullWidth={100}
                energyDensity={200}
                showResetModal={false}
                showFullModal={false}
                showPowerModal={false}
            />
        );
    });

    test('renders the component correctly', () => {
        expect(screen.getByText('Industrial Energy Battery Site Configurator')).toBeInTheDocument();
        expect(screen.getByText('Choose devices below')).toBeInTheDocument();
        expect(screen.getByText('Added Devices')).toBeInTheDocument();
        expect(screen.getByText('Price:')).toBeInTheDocument();
        expect(screen.getByText('Land Dimension:')).toBeInTheDocument();
        expect(screen.getByText('100x20FT')).toBeInTheDocument();
        expect(screen.getByText('Energy Density:')).toBeInTheDocument();
    });


    // Add more tests as needed
});