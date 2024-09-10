import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from '../utils/commonUtils';
import { Device } from '../types/commonTypes';
import "../css/ConfigTable.scss";

interface ChooseDevicesProps {
    devices: Device[];
    onPlus: (device: Device) => void;
}

const ChooseDevices: React.FC<ChooseDevicesProps> = ({ devices, onPlus }) => {
    return (
        <div className="table-added-devices">
            <div className="header">Choose devices below</div>
            <table>
                <tr>
                    <th className="header-cell">Device Name</th>
                    <th className="header-cell">Floor Dimension</th>
                    <th className="header-cell">Energy</th>
                    <th className="header-cell">Cost</th>
                    <th className="header-cell">Release Year</th>
                    <th className="header-cell"></th>
                </tr>
                {devices.map((device, index) => (
                    <tr key={index}>
                        <td className="data-cell">{device.name}</td>
                        <td className="data-cell">{device.floorDimension}</td>
                        <td className="data-cell">{`${device.energy} MWh`}</td>
                        <td className="data-cell">{formatPrice(device.cost)}</td>
                        <td className="data-cell">{device.releaseDate}</td>
                        <td className="data-cell" onClick={() => onPlus(device)}>
                            <FontAwesomeIcon icon={faPlusCircle} className="plus" />
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default ChooseDevices;