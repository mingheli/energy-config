import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ResetConfirmModal from "./components/ResetConfirmModal";
import WarningInfoModal from "./components/WarningInfoModal";
import SearchResult from './components/SearchResult';
import AddedDevices from "./components/AddedDevices";
import { Device, initialDeviceState } from './types/commonTypes';
import { data } from './data/data';
import { formatPrice } from './utils/commonUtils';
import "./App.css";


const App = () => {
  const [showResetModal, setShowResetModal] = useState(false);
  const [showFullModal, setShowFullModal] = useState(false);
  const [showPowerModal, setShowPowerModal] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<Device>(initialDeviceState);
  const displaySectionRef = useRef<HTMLDivElement>(null);
  const [addedDevices, setAddedDevices] = useState<Device[]>([]);
  const [fullWidth, setFullWidth] = useState<number>(100);
  const [newWidth, setNewWidth] = useState<number | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [totalEnergy, setTotalEnergy] = useState<number>(0);
  const [energyDensity, setEnergyDensity] = useState<number>(0);
  const [allowAdd, setAllowAdd] = useState(true);
  const [deviceCounts, setDeviceCounts] = useState({});


  const handlePlus = (device: Device) => {
    if (allowAdd) {
      const { id, ...deviceWithoutId } = device;
      const newDevices = [...addedDevices, { id: uuidv4(), ...deviceWithoutId }];
      setAddedDevices(newDevices);
      setPrice(price + Number(device.cost));
      setTotalEnergy(totalEnergy + Number(device.energy));
    }
  }

  const handleMinus = (device: Device) => {
    const newDevices = addedDevices.filter((item) => item.id !== device.id);
    setAddedDevices(newDevices);
    setPrice(price - Number(device.cost));
    setTotalEnergy(totalEnergy - Number(device.energy));
  }

  const handleMoveUp = (device: Device, index: number) => {
    if (index > 0) {
      const newAddedDevices = [...addedDevices];
      const temp = newAddedDevices[index - 1];
      newAddedDevices[index - 1] = newAddedDevices[index];
      newAddedDevices[index] = temp;
      setAddedDevices(newAddedDevices);
    }
  }

  const handleMoveDown = (device: Device, index: number) => {
    if (index < addedDevices.length - 1) {
      const newAddedDevices = [...addedDevices];
      const temp = newAddedDevices[index + 1];
      newAddedDevices[index + 1] = newAddedDevices[index];
      newAddedDevices[index] = temp;
      setAddedDevices(newAddedDevices);
    }
  }

  const calculateEnergyDensity = (energy: number, dimension: string) => {
    const energyValueMWh = energy;
    const energyValueJoules = energyValueMWh * 3.6 * 10 ** 9;
    const [widthFt, heightFt] = dimension.split('x').map(dim => parseFloat(dim.trim()));
    const areaFt2 = widthFt * heightFt;
    const areaM2 = areaFt2 * 0.092903;
    const energyDensity = energyValueJoules / areaM2;
    const energyDensityMJm2 = energyDensity / 10 ** 6;
    setEnergyDensity(Number(energyDensityMJm2.toFixed(2)));
  };

  const handleFullWidthChange = (e) => {
    if (e.target.value <= 100 && e.target.value > 10) {
      if (addedDevices.length > 0) {
        setShowResetModal(true);
        setNewWidth(e.target.value);
      } else {
        setFullWidth(e.target.value);
      }

    }
  }

  const handleModalConfirm = () => {
    setAddedDevices([]);
    if (typeof newWidth === 'number' && newWidth >= 0) {
      setFullWidth(newWidth);
    } else {
      console.error('Invalid width value');
    }
    setPrice(0);
    setEnergyDensity(0);
    setTotalEnergy(0);
    setShowResetModal(false);
  };

  const handleModalCancel = () => {
    setShowResetModal(false);
    setNewWidth(null);
  };

  const handleFullClose = () => {
    setShowFullModal(false);
    setShowPowerModal(false);
  }


  const checkBrickPosition = () => {
    if (displaySectionRef.current) {
      const displaySectionHeight = displaySectionRef.current.getBoundingClientRect().bottom;
      const lastBrick = displaySectionRef.current.lastElementChild as HTMLElement;
      if (lastBrick) {
        const lastBrickBottom = lastBrick.getBoundingClientRect().bottom;
        if (lastBrickBottom > displaySectionHeight) {
          setShowFullModal(true);
          setAddedDevices(prevDevices => prevDevices.slice(0, -1));
          setAllowAdd(false);
        } else {
          setAllowAdd(true);
        }
      }
    }
  };

  const checkPowerPackNeeded = () => {
    const batteryCnt = addedDevices.filter((device) => device.type === "battery").length;
    const powerCnt = addedDevices.filter((device) => device.type === "power").length;
    if (batteryCnt / 4 > powerCnt && batteryCnt % 4 === 0) {
      setShowPowerModal(true);
    }
  }

  const handleSelectDevice = (device) => {
    setCurrentDevice(device);
  }


  useEffect(() => {
    document.documentElement.style.setProperty('--full-width', `${fullWidth}`);
  }, [fullWidth]);

  useEffect(() => {
    calculateEnergyDensity(totalEnergy, `${fullWidth}x20FT`);
  }, [totalEnergy]);

  useEffect(() => {
    checkBrickPosition();
    checkPowerPackNeeded();
    const counts = addedDevices.reduce((acc, device) => {
      acc[device.name] = (acc[device.name] || 0) + 1;
      return acc;
    }, {});
    setDeviceCounts(counts);
  }, [addedDevices]);




  return (
    <div className="wrapper">
      <ResetConfirmModal showModal={showResetModal} onConfirm={handleModalConfirm} onCancel={handleModalCancel} />
      <WarningInfoModal showModal={showFullModal} onClose={handleFullClose} text="You have no more space, please adjust before adding more devices" />
      <WarningInfoModal showModal={showPowerModal} onClose={handleFullClose} text="Every 4 batteries need a power." />
      <h1>Industrial Energy Battery Site Configurator</h1>
      <div className="panel">
        <div className="left-section">
          <h3> Choose devices below</h3>
          <div className="left-middle">
            <SearchResult devices={data.devices} onPlus={handlePlus} />
          </div>
          <h3> Devices added</h3>
          <div className="left-bottom">
            <AddedDevices addedDevices={addedDevices}
              onMinus={handleMinus}
              onMoveDown={handleMoveDown}
              onMoveUp={handleMoveUp}
              onSelectDevice={handleSelectDevice}
              currentDevice={currentDevice}
            />
          </div>
        </div>
        <div className="right-section">
          <div className="data-section">
            <div className="data-left">
              <div><strong>Price:</strong>{formatPrice(price.toString())}</div>
              <div><strong>Land Dimension:</strong>{`${fullWidth}x20FT`}</div>
              <div><strong>Energy Density: </strong>{energyDensity} MJ/m²</div>
            </div>
            <div className="data-right">
              <ul>
                {Object.entries(deviceCounts).map(([name, count]) => (
                  <li key={name}><strong>Added {name}:</strong> {count as ReactNode}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <label>
              Site Width(FT):
              <input type="number" value={fullWidth} onChange={handleFullWidthChange} />
            </label>
          </div>
          <div className="display-section" ref={displaySectionRef}>
            {addedDevices.map((device, index) =>
              <div
                key={index}
                className={`brick ${device.cssName} ${currentDevice.id === device.id ? "selectedBrick" : ""}`}
              >
                {device.name}
              </div>)}
          </div>
        </div>
      </div>
    </div >
  );
};

export default App;