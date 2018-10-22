export interface UsbVersion {}

export interface DeviceDescriptor {
	usb_version: UsbVersion;
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
