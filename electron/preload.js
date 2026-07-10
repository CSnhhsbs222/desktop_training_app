const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('hubShell', {
  version: '0.1.0'
});
