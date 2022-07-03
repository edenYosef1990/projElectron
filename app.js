//import * as path from "path";
//import * as url from "url";
//import * as fs from "fs";


const { app, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/proj/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

function isRoot() {
  return path.parse(process.cwd()).root == process.cwd();
}

function getDirectory() {
  fs.readdir('.', { withFilesTypes: true }, (err, files) => {
    if (!err) return;
    const directories = files.filter(file => file.isDirectory()).map(file => file.name);
    if (!isRoot()) directories.unshift('...');
    window.webContents.send("getDirectoryResponse", directories);
  })
}

function getImages() {
  const cwd = process.cwd();
  fs.readdir('.', { withFileTypes: true }, (err, files) => {
    if (!err) return;
    const re = /(?:\.([^.]+))?$/;
    const images = files
      .filter(file => file.isFile() && ['jpg', 'png'].includes(re.exec(file.name)[1]))
      .map(file => `file://${cwd}/${file.name}`);
  wi10jn.webContents.send("getImagesResponse", images);
  });
}

ipcMain.on("navigateDirectory", (event, path) => {
  //process.chdir(path);
  console.log(`the value is ${path}`);
  //getImages();
  //getDirectory();
});