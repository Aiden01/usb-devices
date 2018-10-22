export interface UsbVersion {
	majorVersion: Number,
	minorVersion: Number
}

export interface DeviceDescriptor {
	supportedUsbVersion: UsbVersion;
	manufacturerStringIndex?: Number;
	productStringIndex?: Number;
	serialNumberStringIndex?: Number;
	classCode: Number;
	subClassCode: Number;
	protocolCode: Number;
	vendorId: Number;
	maxPacketSize: Number;
}

export interface Device {
	name: String;
	address: Number;
	connectionSpeed: String;
	deviceDescriptor: DeviceDescriptor;
	busNumber: Number;
}

export function getDevices(): Promise<Array<Device>>;
export function findByBusNumber(busNum: Number): Promise<Device?>;
export function onAddress(address: Number): Promise<Device?>;
