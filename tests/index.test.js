const { test } = require('ava')
const usbDevices = require('../lib')

test('Get usb devices', async t => {
    const devices = await usbDevices.getDevices()
    t.true(typeof devices === 'object')
})
