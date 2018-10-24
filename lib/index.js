const addon = require('../native')

/**
 * @desc Returns the connected usb devices
 * @returns {Promise<Array<Object>>}
 */
function getDevices() {
    return new Promise((resolve, reject) => {
        try {
            const devices = addon.getDevices()
            resolve(devices.filter(d => d !== null))
        } catch (e) {
            reject(e)
        }
    })
}

/**
 * @desc Find a device by his bus number
 * @param {number} busNumber - Bus number of the device
 */
function findByBusNumber(busNumber) {
    return getDevices()
        .then(devices => devices.find(device => device.busNumber === busNumber))
        .catch(console.error)
}

/**
 * @desc Returns the devices that are on a specific address
 * @param {number} address - The address of the devices
 * @returns {Promise<Array>}
 */
function onAddress(address) {
    return getDevices()
        .then(devices => devices.filter(device => device.address === address))
        .catch(console.error)
}

/**
 * @desc Returns the devices that support a specific usb version
 * @param {number} usbVersion
 * @returns {Promise<Array>}
 */
function support(usbVersion) {
    return getDevices().then(devices =>
        devices.filter(
            ({
                deviceDescriptor: {
                    supportedUsbVersion: { majorVersion, minorVersion },
                },
            }) => majorVersion <= usbVersion && minorVersion >= usbVersion
        )
    )
}

exports.getDevices = getDevices
exports.findByBusNumber = findByBusNumber
exports.onAddress = onAddress
exports.support = support
