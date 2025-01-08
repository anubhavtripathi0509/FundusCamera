"use strict";
const electron = require("electron");
const child_process = require("child_process");
const path = require("path");
let mainWindow, flaskProcess;
function createWindow() {
  mainWindow = new electron.BrowserWindow({});
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.setMenuBarVisibility(false);
  mainWindow.on("closed", () => mainWindow = null);
}
electron.app.whenReady().then(() => {
  runServer();
  createWindow();
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});
function runServer() {
  flaskProcess = child_process.spawn("python", [
    path.join(__dirname, "../../src/backend/app.py")
  ]);
  flaskProcess.stdout.on("data", (data) => {
    console.log(`Flask: ${data}`);
  });
  flaskProcess.stderr.on("data", (data) => {
    console.error(`Flask: ${data}`);
  });
  flaskProcess.on("close", (code) => {
    console.log(`Flask process exited with code ${code}`);
  });
}
