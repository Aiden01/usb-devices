const usbDevices = require('../lib')

usbDevices.getDevices().then(devices => console.log(devices))
