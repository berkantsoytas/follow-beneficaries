const electron = require("electron");
const url = require("url");
const path = require("path");
const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
    width: 800,
    height: 800,
    minWidth: 800,
    minHeight: 800,
    icon: path.join(__dirname, "assets/icons/png/bfmain.png"),
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "main.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemplate = [
  {
    label: "Quit",
    accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
    role: "quit",
  },
  {
    label: "DevTools",
    accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
    click: function () {
      mainWindow.webContents.openDevTools();
    },
  },
];

if (process.platform === "darwin") {
  mainMenuTemplate.unshift({
    label: app.getName(),
    role: "TODO",
  });
}
