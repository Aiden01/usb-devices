const addon = require('../native')

/**
 * @desc Returns the connected usb devices
 * @returns {Promise<Array<Object>>}
 */
function getDevices() {
    return new Promise((resolve, reject) => {
        try {
            const devices = addon.getDevices()
            resolve(devices)
        } catch (e) {
            reject(e)
        }
    })
}

exports.getDevices = getDevices
