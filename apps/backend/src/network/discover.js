import bonjour from 'bonjour';

export function discoverDevices(io) {
  const bonjourInstance = bonjour();

  bonjourInstance.find({ type: 'http' }, (service) => {
    console.log('Found an HTTP server:', service);
    // Emit the found service to all connected Socket.IO clients
    io.emit('device-discovered', service);
  });

  return bonjourInstance;
}
// Function to stop device discovery
export function stopDiscovery(bonjourInstance) {
  console.log('Stopping device discovery...');
  bonjourInstance.destroy();
}
