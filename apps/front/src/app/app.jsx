import React, { useState, useEffect } from 'react';

const App = () => {
  const [appVersion, setAppVersion] = useState('');
  const platform = window.electron.platform;

  useEffect(() => {
    const fetchAppVersion = async () => {
      const version = await window.electron.getAppVersion();
      setAppVersion(version);
    };

    fetchAppVersion();
  }, []);

  return (
    <div>
      <h1>Application Information</h1>
      <p>App Version: {appVersion}</p>
      <p>Platform: {platform}</p>
    </div>
  );
};

export default App;
