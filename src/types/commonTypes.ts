export interface Device {
  id: string;
  name: string;
  floorDimension: string;
  energy: string;
  cost: string;
  cssName: string;
  releaseDate: string;
  type: string;
}

export interface AddedDevicesProps {
  addedDevices: Device[];
  onMinus: (device: Device, index: number) => void;
  onMoveUp: (device: Device, index: number) => void;
  onMoveDown: (device: Device, index: number) => void;
  onSelectDevice: (device: Device) => void;
  currentDevice: Device | null;
}

export const initialDeviceState: Device = {
  id: '',
  name: '',
  floorDimension: '',
  energy: '',
  cost: '',
  cssName: '',
  releaseDate: '',
  type: ''
};