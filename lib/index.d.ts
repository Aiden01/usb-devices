export interface UsbVersion {
	majorVersion: number;
	minorVersion: number;
}

export interface DeviceDescriptor {
	supportedUsbVersion: UsbVersion;
	manufacturerStringIndex?: number;
	productStringIndex?: number;
	serialNumberStringIndex?: number;
	classCode: number;
	subClassCode: number;
	protocolCode: number;
	vendorId: number;
	maxPacketSize: number;
}

export interface Device {
	name: string;
	address: number;
	connectionSpeed: string;
	deviceDescriptor: DeviceDescriptor;
	busNumber: number;
}

export function getDevices(): Promise<Array<Device>>;
export function findByBusnumber(busNum: number): Promise<Device>;
export function onAddress(address: number): Promise<Array<Device>>;
export function support(usbVersion: number): Promise<Array<Device>>;
export function vendor(vendorID: number): Promise<Array<Device>>;
