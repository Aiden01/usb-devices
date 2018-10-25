const addon = require('../native')
const UsbDevices = {
    /**
     * @desc Returns the connected usb devices
     * @returns {Promise<Array<Object>>}
     */
    getDevices() {
        return new Promise((resolve, reject) => {
            try {
                const devices = addon.getDevices()
                resolve(devices.filter(d => d !== null))
            } catch (e) {
                reject(e)
            }
        })
    },

    /**
     * @desc Find a device by his bus number
     * @param {number} busNumber - Bus number of the device
     */
    findByBusNumber(busNumber) {
        return this.getDevices()
            .then(devices =>
                devices.find(device => device.busNumber === busNumber)
            )
            .catch(console.error)
    },

    /**
     * @desc Returns the devices that are on a specific address
     * @param {number} address - The address of the devices
     * @returns {Promise<Array>}
     */
    onAddress(address) {
        return this.getDevices()
            .then(devices =>
                devices.filter(device => device.address === address)
            )
            .catch(console.error)
    },

    /**
     * @desc Returns the devices that support a specific usb version
     * @param {number} usbVersion
     * @returns {Promise<Array>}
     */
    support(usbVersion) {
        return this.getDevices().then(devices =>
            devices.filter(
                ({
                    deviceDescriptor: {
                        supportedUsbVersion: { majorVersion, minorVersion },
                    },
                }) => majorVersion >= usbVersion && minorVersion <= usbVersion
            )
        )
    },

    /**
     * @desc Returns devices with a specific vendorId
     * @param {number} vendorID
     * @returns {Promise<Array>}
     * @example
     * const usbDevices = require('usb-devices')
     * usbDevices.vendor(1254)
     *  .then(devices => console.log(devices))
     */
    vendor(vendorID) {
        return this.getDevices().then(devices =>
            devices.filter(
                ({ deviceDescriptor: { vendorId } }) => vendorId === vendorID
            )
        )
    },
}

module.exports = UsbDevices
