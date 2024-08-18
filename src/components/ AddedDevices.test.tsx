import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddedDevices from './AddedDevices';

const mockDevices = [
    { name: 'Device 1', floorDimension: '10x10', energy: 100, cost: '1000', releaseDate: '2020' },
    { name: 'Device 2', floorDimension: '20x20', energy: 200, cost: '2000', releaseDate: '2021' }
];

const mockFormatPrice = (price) => `$${price}`;
const mockOnMinus = jest.fn();
const mockOnMoveUp = jest.fn();
const mockOnMoveDown = jest.fn();
const mockOnSelectDevice = jest.fn();

describe('AddedDevices Component', () => {
    test('renders device information correctly', () => {
        const { container } = render(
            <AddedDevices
                addedDevices={mockDevices}
                formatPrice={mockFormatPrice}
                onMinus={mockOnMinus}
                onMoveUp={mockOnMoveUp}
                onMoveDown={mockOnMoveDown}
                onSelectDevice={mockOnSelectDevice}
            />
        );

        expect(screen.getByText('Device 1')).toBeInTheDocument();
        expect(screen.getByText('10x10')).toBeInTheDocument();
        expect(screen.getByText('100 MWh')).toBeInTheDocument();
        expect(screen.getByText('2020')).toBeInTheDocument();

        expect(screen.getByText('Device 2')).toBeInTheDocument();
        expect(screen.getByText('20x20')).toBeInTheDocument();
        expect(screen.getByText('200 MWh')).toBeInTheDocument();
        expect(screen.getByText('2021')).toBeInTheDocument();

        // Generate snapshot
        expect(container).toMatchSnapshot();
    });

    test('calls onMinus when minus icon is clicked', () => {
        const { container } = render(
            <AddedDevices
                addedDevices={mockDevices}
                formatPrice={mockFormatPrice}
                onMinus={mockOnMinus}
                onMoveUp={mockOnMoveUp}
                onMoveDown={mockOnMoveDown}
                onSelectDevice={mockOnSelectDevice}
            />
        );

        fireEvent.click(container.querySelector('.minus'));

        // Generate snapshot
        expect(container).toMatchSnapshot();
    });

    test('calls onMoveUp when up arrow icon is clicked', () => {
        const { container } = render(
            <AddedDevices
                addedDevices={mockDevices}
                formatPrice={mockFormatPrice}
                onMinus={mockOnMinus}
                onMoveUp={mockOnMoveUp}
                onMoveDown={mockOnMoveDown}
                onSelectDevice={mockOnSelectDevice}
            />
        );

        fireEvent.click(container.querySelector('.moveup'));
        expect(mockOnMoveUp).toHaveBeenCalledWith(mockDevices[1], 1);

        // Generate snapshot
        expect(container).toMatchSnapshot();
    });

    test('calls onMoveDown when down arrow icon is clicked', () => {
        const { container } = render(
            <AddedDevices
                addedDevices={mockDevices}
                formatPrice={mockFormatPrice}
                onMinus={mockOnMinus}
                onMoveUp={mockOnMoveUp}
                onMoveDown={mockOnMoveDown}
                onSelectDevice={mockOnSelectDevice}
            />
        );

        fireEvent.click(container.querySelector('.movedown'));
        expect(mockOnMoveDown).toHaveBeenCalledWith(mockDevices[0], 0);

        // Generate snapshot
        expect(container).toMatchSnapshot();
    });
});