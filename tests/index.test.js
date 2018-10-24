const { getDevices, findByBusNumber, support } = require('../lib')

test('Get usb devices', async () => {
    const devices = await getDevices()
    expect(Array.isArray(devices)).toBe(true)
})

test('Find device by is bus number', async () => {
    const fakeDevices = [{ busNumber: 1 }, { busNumber: 2 }]
    // mock function
    jest.mock('../lib', () => {
        getDevices: jest.fn(() =>
            Promise.resolve([{ busNumber: 1 }, { busNumber: 2 }])
        )
    })
    const device = await findByBusNumber(1)
    expect(device.busNumber).toBe(fakeDevices[0].busNumber)
})

test('Find devices that support a specific usb version', async () => {
    const fakeDevices = [
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
    jest.mock('../lib', () => {
        getDevices: jest.fn(() =>
            Promise.resolve([
                {
                    deviceDescriptor: {
                        supportedUsbVersion: {
                            majorVersion: 3,
                            minorVersion: 0,
                        },
                    },
                },
                {
                    deviceDescriptor: {
                        supportedUsbVersion: {
                            majorVersion: 2,
                            minorVersion: 0,
                        },
                    },
                },
                {
                    deviceDescriptor: {
                        supportedUsbVersion: {
                            majorVersion: 0,
                            minorVersion: 0,
                        },
                    },
                },
                {
                    deviceDescriptor: {
                        supportedUsbVersion: {
                            majorVersion: 1,
                            minorVersion: 1,
                        },
                    },
                },
            ])
        )
    })

    const devices = (await support(2)).map(({ deviceDescriptor }) => {
        deviceDescriptor
    })

    const expectedDevices = fakeDevices.filter(
        ({ deviceDescriptor: { supportedUsbVersion } }) =>
            supportedUsbVersion.majorVersion <= 2 &&
            supportedUsbVersion.minorVersion >= 2
    )

    expect(devices).toEqual(expectedDevices)
})
