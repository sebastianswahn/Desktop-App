const output = document.querySelector("#output");

const _Todos = [];

const getToDos = async () => {
  const res = await window.todos.getAllTodos();
  res.forEach((toDo) => _Todos.push(toDo));

  listToDos();
};

getToDos();

const listToDos = () => {
  output.innerHTML = "";
  _Todos.forEach((toDo) => {
    output.append(createToDoElement(toDo));
  });
};

const createElement = (type, className, text) => {
  const element = document.createElement(type);
  element.className = className ? className : "";
  element.innerText = text ? text : "";
  return element;
};

const createToDoElement = (todo) => {
  const div = createElement("div", "flex p-4 justify-between");
  const p = createElement("p", "font-semibold text-lg", todo.title);
  const button = createElement("button", "bg-blue-300 rounded-md p-1", "X");
  /*   button.addEventListener("click", () => {
    deleteToDoElement(todo.id);
  }); */
  div.append(p, button);
  return div;
};

document.querySelector("#addToDo").addEventListener("submit", async (e) => {
  e.preventDefault();
  const todoInput = document.querySelector("#todo");
  const newToDo = todoInput.value;
  const formError = document.querySelector("#form-error");

  if (newToDo === "") {
    formError.innerText = "Please enter a todo";
    formError.classList.remove("hidden");
    return;
  }

  const res = await window.todos.add(newToDo);

  todoInput.value = "";

  _Todos.push(res);
  /*   output.append(createToDoElement(res)); */
});
