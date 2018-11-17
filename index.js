const util = require('util');

const { Client } = require('tplink-smarthome-api');
const TuyAPI = require('tuyapi');

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
    const controlledDevice = new TuyAPI({
    id: '31172752600194b28500',
    key: 'ef73c22f356376e2',
    ip: '192.168.42.14',
    persistentConnection: true});
client.getDevice({host:'192.168.42.38'}).then((device) => {
  device.startPolling(500);

  // Plug Events
  device.on('power-on', () => {

    controlledDevice.set({set: true});
    logEvent('power-on', device);
  });
  device.on('power-off', () => {

    controlledDevice.set({set: false});
    logEvent('power-off', device);
  });
//   // device.on('power-update', (powerOn) => { logEvent('power-update', device, powerOn); });
//   // device.on('in-use', () => { logEvent('in-use', device); });
//   // device.on('not-in-use', () => { logEvent('not-in-use', device); });
//   // device.on('in-use-update', (inUse) => { logEvent('in-use-update', device, inUse); });


 
});


// console.log('Starting Device Discovery');
// client.startDiscovery();
