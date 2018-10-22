const { test } = require('ava')
const usbDevices = require('../lib')

test('Get usb devices', async t => {
    const devices = await usbDevices.getDevices()
    t.true(Array.isArray(devices))
})

test('Find by bus number', async t => {
    const expectedDevice = (await usbDevices.getDevices()).find(
        ({ busNumber }) => busNumber === 1
    )

    const device = await usbDevices.findByBusNumber(1)

    t.deepEqual(expectedDevice, device)
})
