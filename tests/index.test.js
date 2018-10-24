const { getDevices, findByBusNumber, support } = require('../lib')
const { mockGetDevices } = require('./__mocks__')

test('Get usb devices', async () => {
    const devices = await getDevices()
    expect(Array.isArray(devices)).toBe(true)
})

test('Find device by is bus number', async () => {
    const mockDevices = [{ busNumber: 1 }, { busNumber: 2 }]
    // mock function
    jest.mock('../lib', () => {
        getDevices: mockGetDevices(mockDevices)
    })
    const device = await findByBusNumber(1)
    expect(device.busNumber).toBe(mockDevices[0].busNumber)
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
    jest.mock('../lib', () => {
        getDevices: mockGetDevices(mockDevices)
    })

    const devices = (await support(2)).map(({ deviceDescriptor }) => {
        deviceDescriptor
    })

    const expectedDevices = mockDevices.filter(
        ({ deviceDescriptor: { supportedUsbVersion } }) =>
            supportedUsbVersion.majorVersion <= 2 &&
            supportedUsbVersion.minorVersion >= 2
    )

    expect(devices).toEqual(expectedDevices)
})
