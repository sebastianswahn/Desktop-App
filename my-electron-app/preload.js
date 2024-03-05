const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("todos", {
  getAllTodos: () => ipcRenderer.invoke("getAll"),
  add: (toDo) => ipcRenderer.invoke("add", toDo),
});
