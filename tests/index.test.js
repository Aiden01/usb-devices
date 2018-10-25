const usbDevices = require('../lib')

test('Get usb devices', async () => {
    const devices = await usbDevices.getDevices()
    expect(Array.isArray(devices)).toBe(true)
})

test('Find device by is bus number', async () => {
    // Mock values to be returned
    const mockDevices = [{ busNumber: 1 }, { busNumber: 2 }]

    // Mock the function
    usbDevices.getDevices = jest
        .fn()
        .mockReturnValue(Promise.resolve(mockDevices))

    const device = await usbDevices.findByBusNumber(1)
    expect(device).toBe(mockDevices[0])
})

test('Find devices that support a specific usb version', async () => {
    const mockDevices = [
        {
            deviceDescriptor: {
                supportedUsbVersion: { majorVersion: 3, minorVersion: 0 },
            },
        },
        {
            deviceDescriptor: {
                supportedUsbVersion: { majorVersion: 2, minorVersion: 0 },
            },
        },
        {
            deviceDescriptor: {
                supportedUsbVersion: { majorVersion: 0, minorVersion: 0 },
            },
        },
        {
            deviceDescriptor: {
                supportedUsbVersion: { majorVersion: 1, minorVersion: 1 },
            },
        },
    ]

    // mock the function
    usbDevices.getDevices = jest
        .fn()
        .mockReturnValue(Promise.resolve(mockDevices))

    const devices = await usbDevices.support(2)

    const expectedDevices = mockDevices.filter(
        ({ deviceDescriptor: { supportedUsbVersion } }) =>
            supportedUsbVersion.majorVersion >= 2 &&
            supportedUsbVersion.minorVersion <= 2
    )

    expect(devices).toEqual(expectedDevices)
})

test('Get devices with a specific vendorId', async () => {
    const mockDevices = [
        {
            deviceDescriptor: {
                vendorId: 1243,
            },
        },
        {
            deviceDescriptor: {
                vendorId: 1213,
            },
        },
        {
            deviceDescriptor: {
                vendorId: 1243,
            },
        },
        {
            deviceDescriptor: {
                vendorId: 1343,
            },
        },
    ]

    // mock the function
    usbDevices.getDevices = jest
        .fn()
        .mockReturnValue(Promise.resolve(mockDevices))

    const expectedDevices = mockDevices.filter(
        ({ deviceDescriptor: { vendorId } }) => vendorId === 1243
    )

    const devices = await usbDevices.vendor(1243)

    expect(devices).toEqual(expectedDevices)
})
