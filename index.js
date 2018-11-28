const util = require('util');

const { Client } = require('tplink-smarthome-api');
const TuyAPI = require('tuyapi');
const axios = require('axios');

const devices = require('./devices')

const client = new Client();

var logEvent = function (eventName, device, state) {
  let stateString = (state != null ? util.inspect(state) : '');
  console.log(`${(new Date()).toISOString()} ${eventName} ${device.model} ${device.host}:${device.port} ${stateString}`);
};
    // const controlledDevice = new TuyAPI({
    // id: '31172752600194b28500',
    // key: 'ef73c22f356376e2',
    // ip: '192.168.42.14',
    // persistentConnection: true});
    // controlledDevice.on('data', data => {
    //   console.log('Data from controlledDevice:', data);
     
    //   const status = data.dps['1'];
     
    //   console.log('Current status:', status);
     
      // controlledDevice.set({set: true}).then(result => {
      //   console.log('Result of setting status:', result);
      // });
    // });
    // controlledDevice.connect();
// // Client events `device-*` also have `bulb-*` and `plug-*` counterparts.
// // Use those if you want only events for those types and not all devices.
const controlledDevices = devices.slaves.map((slave) => {
  return new TuyAPI(Object.assign({persistentConnection: true}, slave.credentials));
})
client.getDevice(devices.master.credentials).then((device) => {
  device.startPolling(1000);

  // Plug Events
  device.on('power-on', () => {
    axios.get('https://maker.ifttt.com/trigger/garage_light_on/with/key/dfPZzWdch5x-EI18lzAB0Z')
    axios.get('https://maker.ifttt.com/trigger/record_garage_event/with/key/dfPZzWdch5x-EI18lzAB0Z')

    controlledDevices.forEach((slave) => {
      slave.set({set: true});
    })
    logEvent('power-on', device);
  });
  device.on('power-off', () => {
    axios.get('https://maker.ifttt.com/trigger/garage_light_off/with/key/dfPZzWdch5x-EI18lzAB0Z')

    controlledDevices.forEach((slave) => {
      slave.set({set: false});
    })
    logEvent('power-off', device);
  });
//   // device.on('power-update', (powerOn) => { logEvent('power-update', device, powerOn); });
//   // device.on('in-use', () => { logEvent('in-use', device); });
//   // device.on('not-in-use', () => { logEvent('not-in-use', device); });
//   // device.on('in-use-update', (inUse) => { logEvent('in-use-update', device, inUse); });
});


// console.log('Starting Device Discovery');
// client.startDiscovery();
