const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("todos", {
  getAllTodos: () => ipcRenderer.invoke("getAll"),
  add: (toDo) => ipcRenderer.invoke("add", toDo),
  delete: (id) => ipcRenderer.invoke("delete", id),
  statusChange: (id) => ipcRenderer.invoke("statusChange", id),
});
