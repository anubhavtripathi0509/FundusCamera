import { app, BrowserWindow } from "electron";
import { spawn } from "child_process";
import path from "path";

let mainWindow, flaskProcess, db;

function createWindow() {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.setMenuBarVisibility(false);
  // mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => (mainWindow = null));
}

app.whenReady().then(() => {
  runServer();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});

function runServer() {
  flaskProcess = spawn("python", [
    path.join(__dirname, "../../src/backend/app.py"),
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
