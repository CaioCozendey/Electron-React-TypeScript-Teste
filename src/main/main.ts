import { app, BrowserWindow } from "electron"
import isDev from "electron-is-dev"
import path from "path"
import url from "url"

const Tarefa = require('../renderer/model/tarefa')

const { ipcMain } = require('electron')

const productionUrl = path.resolve(__dirname, "../renderer/index.html")

const appUrl = isDev
  ? "http://localhost:3000"
  : url.format({
    pathname: productionUrl,
    protocol: "file:",
    slashes: true
  })

async function run() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  })
  await mainWindow.loadURL(appUrl)
  mainWindow.show()
}

ipcMain.on('Nova Tarefa', (e, args) =>{
    const novaTarefa = new Tarefa(args)
    const tarefaSalva = novaTarefa.save()
    e.reply('Nova Tarefa criada', tarefaSalva)
})

app.whenReady().then(run)