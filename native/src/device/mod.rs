pub mod device_descriptor;
use self::device_descriptor::{DeviceDescriptor, SupportedUsbVersion};

use libusb::{
    Context as LibUSBContext, DeviceDescriptor as LibUSBDeviceDescriptor, Speed, Version,
};

#[derive(Debug)]
pub struct Device {
    pub bus_number: u8,
    pub address: u8,
    pub connection_speed: String,
    pub device_descriptor: Option<DeviceDescriptor>,
}

impl Device {
    /**
     * Creates a new instance of the Device struct
     */
    pub fn new(
        bus_number: u8,
        address: u8,
        connection_speed: String,
        device_descriptor: Option<DeviceDescriptor>,
    ) -> Device {
        Device {
            bus_number: bus_number,
            address: address,
            connection_speed: connection_speed,
            device_descriptor: device_descriptor,
        }
    }
}

/**
 * Get all the devices in a Vector
 */
pub fn to_vec(lib_usb_cx: &LibUSBContext) -> Vec<Device> {
    let devices: Vec<Device> = lib_usb_cx
        .devices()
        .unwrap()
        .iter()
        .map(|d| {
            Device::new(
                d.bus_number(),
                d.address(),
                get_connection_speed(d.speed()),
                get_device_descriptor(d.device_descriptor()),
            )
        })
        .collect();
    devices
}

/**
 * Convert the connection speed Enum to a String
 */
fn get_connection_speed(speed: Speed) -> String {
    match speed {
        Speed::Full => String::from("FULL"),
        Speed::High => String::from("HIGH"),
        Speed::Low => String::from("LOW"),
        Speed::Super => String::from("SUPER"),
        Speed::Unknown => String::from("Unknown"),
    }
}

/**
 * Get the device descriptor
 */
fn get_device_descriptor(
    d: Result<LibUSBDeviceDescriptor, libusb::Error>,
) -> Option<DeviceDescriptor> {
    // Check for any errors
    match d {
        Ok(descriptor) => {
            // Build the struct and return it
            Some(DeviceDescriptor {
                manufacturer_string_index: descriptor.manufacturer_string_index(),
                product_string_index: descriptor.product_string_index(),
                serial_number_string_index: descriptor.serial_number_string_index(),
                class_code: descriptor.class_code(),
                sub_class_code: descriptor.sub_class_code(),
                protocol_code: descriptor.protocol_code(),
                vendor_id: descriptor.vendor_id(),
                max_packet_size: descriptor.max_packet_size(),
                num_configurations: descriptor.num_configurations(),
                supported_usb_version: get_supported_usb_version(descriptor.usb_version()),
            })
        }
        Err(_) => None,
    }
}

/**
 * Returns the supported usb version of the device
 */
fn get_supported_usb_version(v: Version) -> SupportedUsbVersion {
    SupportedUsbVersion {
        minor_version: v.minor(),
        major_version: v.major(),
    }
}
