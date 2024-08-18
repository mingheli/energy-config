import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from '../utils/commonUtils';
const SearchResult = ({ devices, onPlus }) => {
    return (
        <>

            <div className="header-row">
                <div className="header-cell">Device Name</div>
                <div className="header-cell">Floor Dimension</div>
                <div className="header-cell">Energy</div>
                <div className="header-cell">Cost</div>
                <div className="header-cell">Release Year</div>
                <div className="header-cell"></div>
            </div>
            {devices.map((device, index) => (
                <div className="data-row" key={index}>
                    <div className="data-cell">{device.name}</div>
                    <div className="data-cell">{device.floorDimension}</div>
                    <div className="data-cell">{`${device.energy} MWh`}</div>
                    <div className="data-cell">{formatPrice(device.cost)}</div>
                    <div className="data-cell">{device.releaseDate}</div>
                    <div className="data-cell" onClick={() => onPlus(device)}><FontAwesomeIcon icon={faPlusCircle} className="plus" /></div>
                </div>
            ))}

        </>
    )
}
export default SearchResult;