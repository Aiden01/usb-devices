const usbDevices = require('../native');

const devices = usbDevices.getDevices();

console.log(devices);
