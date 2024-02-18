// Initialize an empty map to hold device info indexed by socket ID
const connectedDevices = new Map();
// Function to get an array of connected devices' information
function getConnectedDevices() {
    // Create an array from the connectedDevices map values
    const devicesArray = Array.from(connectedDevices.values());
    return devicesArray;
  }

  
export function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log(`Device connected: ${socket.id}`);

    // Send a welcome message to the newly connected client
    socket.emit('welcome', { message: 'Welcome!' });


    // Handle receiving device info
    socket.on('device-info', (deviceInfo) => {
      console.log(`Received device info from ${socket.id}:`, deviceInfo);
      // Store the device info in the map
      connectedDevices.set(socket.id, deviceInfo);

      // Update all connected clients with the new list of devices, including the one that just connected
      io.emit('connected-devices', getConnectedDevices());
    });

    // Handle clipboard update
    socket.on('update-clipboard', (data) => {
      console.log(`Clipboard updated by ${socket.id}: ${data.content}`);
      // Broadcast the update to other connected clients (excluding the sender)
      socket.broadcast.emit('clipboard-updated', { content: data.content });
    });

    // Handle device disconnect
    socket.on('disconnect', () => {
      console.log(`Device disconnected: ${socket.id}`);
      // Remove the disconnected device from the map
      connectedDevices.delete(socket.id);
        // Update all remaining connected clients with the new list of devices after one disconnects
        io.emit('connected-devices', getConnectedDevices());
    });
  });

  // Additional utility function or logic to work with connectedDevices map can be here
  // For example, to list all connected devices:
  function listConnectedDevices() {
    connectedDevices.forEach((deviceInfo, socketId) => {
      console.log(`Device ${socketId}:`, deviceInfo);
    });
  }
}
