const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const Prisma = new PrismaClient();

let mainWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("src/index.html");
  /*   mainWindow.webContents.openDevTools(); */
};

app.whenReady().then(() => {
  ipcMain.handle("getAll", async () => {
    try {
      const todos = await Prisma.toDo.findMany();
      console.log(todos);
      return todos;
    } catch (err) {
      console.log(err);
    }
  });

  ipcMain.handle("add", async (_, data) => {
    try {
      const newToDo = await Prisma.toDo.create({
        data: {
          title: data,
          completed: false,
        },
      });
      return newToDo;
    } catch (err) {
      console.log(err);
    }
  });

  ipcMain.handle("statusChange", async (_, id) => {
    try {
      const updatedToDo = await Prisma.toDo.update({
        where: {
          id: id,
        },
        data: {
          completed: true,
        },
      });
      return updatedToDo;
    } catch (err) {
      console.log(err);
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.handle("delete", async (_, id) => {
    try {
      const deletedToDo = await Prisma.toDo.delete({
        where: {
          id: id,
        },
      });
      return deletedToDo;
    } catch (err) {
      console.log(err);
    }
  });

  createWindow();
});
