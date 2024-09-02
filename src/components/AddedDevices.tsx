import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { AddedDevicesProps, Device } from "../types/commonTypes";
import { formatPrice } from '../utils/commonUtils';

const AddedDevices: React.FC<AddedDevicesProps> = ({ addedDevices, onMinus, onMoveUp, onMoveDown, onSelectDevice, currentDevice }) => {
    if (!addedDevices) {
        return <div>No devices available</div>;
    }
    return (
        <>

            <div className="header-row" onClick={() => onSelectDevice({
                id: "",
                name: '',
                floorDimension: '',
                energy: '',
                cost: '',
                cssName: '',
                releaseDate: '',
                type: ''
            })}>
                <div className="header-cell">Device Name</div>
                <div className="header-cell">Floor Dimension</div>
                <div className="header-cell">Energy</div>
                <div className="header-cell">Cost</div>
                <div className="header-cell">Release Year</div>
                <div className="header-cell"></div>
                <div className="header-cell"></div>
                <div className="header-cell"></div>
            </div>
            {addedDevices.map((device, index) => (
                <div className={`data-row ${currentDevice?.id === device.id ? "highlight" : ""}`} key={index} onClick={() => onSelectDevice(device)}>
                    <div className="data-cell">{device.name}</div>
                    <div className="data-cell">{device.floorDimension}</div>
                    <div className="data-cell">{`${device.energy} MWh`}</div>
                    <div className="data-cell">{formatPrice((device.cost))}</div>
                    <div className="data-cell">{device.releaseDate}</div>
                    <div className="data-cell" onClick={() => onMinus(device, index)}><FontAwesomeIcon icon={faMinusCircle} className="minus" /></div>
                    <div className="data-cell" onClick={() => onMoveUp(device, index)}>{index > 0 && <FontAwesomeIcon icon={faArrowUp} className="moveup" />}</div>
                    <div className="data-cell" onClick={() => onMoveDown(device, index)}>{index < addedDevices.length - 1 && <FontAwesomeIcon icon={faArrowDown} className="movedown" />}</div>
                </div>
            ))}
        </>
    )
}
export default AddedDevices;