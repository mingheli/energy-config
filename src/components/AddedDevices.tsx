import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { AddedDevicesProps, Device } from "../types/commonTypes";
import { formatPrice } from '../utils/commonUtils';
import "../css/ConfigTable.scss";

const AddedDevices: React.FC<AddedDevicesProps> = ({ addedDevices, onMinus, onMoveUp, onMoveDown, onSelectDevice, currentDevice }) => {
    if (!addedDevices) {
        return <div>No devices available</div>;
    }
    return (

        <div className="table-choose-devices">
            <div className="header">Added Devices</div>
            <table>
                <tr>
                    <th className="header-cell">Device Name</th>
                    <th className="header-cell">Floor Dimension</th>
                    <th className="header-cell">Energy</th>
                    <th className="header-cell">Cost</th>
                    <th className="header-cell">Release Year</th>
                    <th className="header-cell"><FontAwesomeIcon icon={faMinusCircle} /></th>
                    <th className="header-cell"><FontAwesomeIcon icon={faArrowUp} /></th>
                    <th className="header-cell"><FontAwesomeIcon icon={faArrowDown} /></th>
                </tr>

                {addedDevices.map((device, index) => (
                    <tr className={`${currentDevice?.id === device.id ? "highlight" : ""}`} key={index} onClick={() => onSelectDevice(device)}>
                        <td className="data-cell">{device.name}</td>
                        <td className="data-cell">{device.floorDimension}</td>
                        <td className="data-cell">{`${device.energy} MWh`}</td>
                        <td className="data-cell">{formatPrice((device.cost))}</td>
                        <td className="data-cell">{device.releaseDate}</td>
                        <td className="data-cell" onClick={() => onMinus(device, index)}><FontAwesomeIcon icon={faMinusCircle} className="minus" /></td>
                        <td className="data-cell" onClick={() => onMoveUp(device, index)}>{index > 0 && <FontAwesomeIcon icon={faArrowUp} className="moveup" />}</td>
                        <td className="data-cell" onClick={() => onMoveDown(device, index)}>{index < addedDevices.length - 1 && <FontAwesomeIcon icon={faArrowDown} className="movedown" />}</td>
                    </tr>
                ))}

            </table>
        </div>


    )
}
export default AddedDevices;