const { app, BrowserWindow } = require('electron');

let mainWindow = null;

app.on("ready", () => {
   mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    show: false,
   });
   mainWindow.loadURL(`file://${__dirname}/index.html`);
   mainWindow.once('ready-to-show', () => {
      mainWindow.show();
      // mainWindow.webContents.openDevTools();
   });
   mainWindow.on('closed', () => {
      mainWindow = null;
    });
});
