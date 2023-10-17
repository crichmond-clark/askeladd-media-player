const { app, BrowserWindow } = require('electron');
const path = require('path');
const fastify = require('fastify')({ logger: true })




function createWindow() {
  const win = new BrowserWindow({
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration in the renderer process
      preload: "preload.js"
    },
  });

  win.loadURL('http://localhost:5173');
  // win.once('ready-to-show', () => {
  //   win.show();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})