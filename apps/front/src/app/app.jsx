import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [currentDeviceId, setCurrentDeviceId] = useState(null); // Store the current device's identifier
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [clipboardContent, setClipboardContent] = useState('');
  const serverURL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const newSocket = io(serverURL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to the server!');
      setCurrentDeviceId(newSocket.id); // Store the current device's socket ID

      const deviceInfo = {
        id: newSocket.id, // Use socket ID as unique identifier
        name: 'User\'s Device', // Placeholder
        userAgent: navigator.userAgent, // Browser's user agent string
      };
      newSocket.emit('device-info', deviceInfo);
    });

    newSocket.on('connected-devices', (devices) => {
      setConnectedDevices(devices);
    });

    newSocket.on('clipboard-content', (content) => {
      setClipboardContent(content);
    });

    return () => newSocket.close();
  }, [serverURL]);

  const handleSelectDevice = (device) => {
    setSelectedDevice(device);
    socket.emit('request-clipboard-content', device.id);
  };

  // Filter out the current device from the list
  const otherDevices = connectedDevices.filter(device => device.id !== currentDeviceId);

  return (
    <div>
      <h1>Application Information</h1>
      <h2>Connected Devices:</h2>
      <ul>
        {otherDevices.map((device, index) => (
          <li key={index} onClick={() => handleSelectDevice(device)}>
            {device.name} - {device.userAgent}
          </li>
        ))}
      </ul>
      {selectedDevice && (
        <div>
          <h3>Selected Device: {selectedDevice.name}</h3>
          <button onClick={() => socket.emit('request-clipboard-content', selectedDevice.id)}>
            View Clipboard
          </button>
          <p>Clipboard Content: {clipboardContent}</p>
        </div>
      )}
    </div>
  );
};

export default App;
