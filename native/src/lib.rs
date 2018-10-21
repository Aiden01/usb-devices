#[macro_use]
extern crate neon;
extern crate libusb;
use neon::context::FunctionContext;
use neon::prelude::*;

// Modules
mod device;
mod utils;

use libusb::Context as LibUSBContext;

fn get_devices(cx: FunctionContext) -> JsResult<JsArray> {
    // Create new libUsbContext
    let lib_usb_context = LibUSBContext::new().unwrap();

    let devices = device::to_vec(&lib_usb_context);
    let devices_array = utils::to_js_array(cx, devices);

    Ok(devices_array)
}

register_module!(mut cx, { cx.export_function("getDevices", get_devices) });
