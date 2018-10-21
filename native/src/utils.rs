use device::Device;
use neon::context::FunctionContext;
use neon::prelude::*;

/**
 * Convert the device structs to a JS array
 */
pub fn to_js_array(mut cx: FunctionContext, devices: Vec<Device>) -> Handle<JsArray> {
    // Initialize the array
    let devices_array = JsArray::new(&mut cx, devices.len() as u32);
    let mut index: u32 = 0;

    for device in devices.iter() {
        index += 1;

        // Convert the struct to a JSObject
        let device_obj = cx.empty_object();

        // Bus number
        let bus_number = cx.number(device.bus_number);
        device_obj.set(&mut cx, "busNumber", bus_number).unwrap();

        // address
        let address = cx.number(device.address);
        device_obj.set(&mut cx, "address", address).unwrap();

        // connection_speed
        let connection_speed = cx.string(&device.connection_speed);
        device_obj
            .set(&mut cx, "connectionSpeed", connection_speed)
            .unwrap();

        // Set the object
        let device_descriptor = if let Some(descriptor) = &device.device_descriptor {
            // convert descriptor struct to an object
            let descriptor_obj = cx.empty_object();

            // manufacturer_string_index: Option<u8>,
            if let Some(m_string_index) = descriptor.manufacturer_string_index {
                let num = cx.number(m_string_index);
                descriptor_obj
                    .set(&mut cx, "manufacturerStringIndex", num)
                    .unwrap();
            } else {
                let num = cx.undefined();
                descriptor_obj
                    .set(&mut cx, "manufacturerStringIndex", num)
                    .unwrap();
            }

            // product_string_index: Option<u8>,
            if let Some(p_string_index) = descriptor.product_string_index {
                let num = cx.number(p_string_index);
                descriptor_obj
                    .set(&mut cx, "productStringIndex", num)
                    .unwrap();
            } else {
                let num = cx.undefined();
                descriptor_obj
                    .set(&mut cx, "productStringIndex", num)
                    .unwrap();
            }

            // serial_number_string_index: Option<u8>,
            if let Some(serial_string_index) = descriptor.serial_number_string_index {
                let num = cx.number(serial_string_index);
                descriptor_obj
                    .set(&mut cx, "serialNumberStringIndex", num)
                    .unwrap();
            } else {
                let num = cx.undefined();
                descriptor_obj
                    .set(&mut cx, "serialNumberStringIndex", num)
                    .unwrap();
            }

            // class_code: u8,
            let num = cx.number(descriptor.class_code);
            descriptor_obj.set(&mut cx, "classCode", num).unwrap();

            // sub_class_code: u8,
            let num = cx.number(descriptor.sub_class_code);
            descriptor_obj.set(&mut cx, "subClassCode", num).unwrap();

            // protocol_code: u8,
            let num = cx.number(descriptor.protocol_code);
            descriptor_obj.set(&mut cx, "protocolCode", num).unwrap();

            // vendor_id: u16,
            let num = cx.number(descriptor.vendor_id);
            descriptor_obj.set(&mut cx, "vendorId", num).unwrap();

            // max_packet_size: u8,
            let num = cx.number(descriptor.max_packet_size);
            descriptor_obj.set(&mut cx, "maxPacketSize", num).unwrap();

            // num_configurations: u8,
            descriptor_obj
        } else {
            cx.empty_object()
        };

        device_obj
            .set(&mut cx, "deviceDescriptor", device_descriptor)
            .unwrap();

        // Push the object to the array
        devices_array.set(&mut cx, index, device_obj).unwrap();
    }
    devices_array
}
