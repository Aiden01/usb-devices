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

exports.getDevices = getDevices
exports.findByBusNumber = findByBusNumber
