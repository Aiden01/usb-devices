#[derive(Debug)]
pub struct SupportedUsbVersion {
    pub minor_version: u8,
    pub major_version: u8,
}

#[derive(Debug)]
pub struct DeviceDescriptor {
    pub manufacturer_string_index: Option<u8>,
    pub product_string_index: Option<u8>,
    pub serial_number_string_index: Option<u8>,
    pub class_code: u8,
    pub sub_class_code: u8,
    pub protocol_code: u8,
    pub vendor_id: u16,
    pub max_packet_size: u8,
    pub num_configurations: u8,
    pub supported_usb_version: SupportedUsbVersion,
}
