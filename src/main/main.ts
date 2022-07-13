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

ipcMain.on('Nova Tarefa', async (e, args) =>{
    const novaTarefa = new Tarefa(args)
    const tarefaSalva = await novaTarefa.save()
    e.reply('Nova-Tarefa-criada', JSON.stringify(tarefaSalva))
})

ipcMain.on('pega-tarefas', async (e, args) =>{
    const tarefa = await Tarefa.find();
    e.reply('pega-tarefas', JSON.stringify(tarefa));
})

ipcMain.on('deletar-tarefa', async  (e, args) => {
    const tarefaDeletada = await Tarefa.findByIdAndDelete(args)
    e.reply('tarefa-deletada-com-sucesso', JSON.stringify(tarefaDeletada));
})

app.whenReady().then(run)