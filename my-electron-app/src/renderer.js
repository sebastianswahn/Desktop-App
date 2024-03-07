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

const createElement = (type, className, text, id) => {
  const element = document.createElement(type);
  element.className = className ? className : "";
  element.innerText = text ? text : "";
  return element;
};

const createToDoElement = (todo) => {
  const div = createElement(
    "div",
    "flex p-4 justify-between cursor-pointer transition duration-300 ease-in-out hover:bg-slate-300 rounded-md mr-2 mb-2"
  );

  if (todo.completed === true) {
    div.classList.add("bg-emerald-300");
  } else {
    div.classList.remove("bg-emerald-300");
  }

  div.addEventListener("click", () => {
    statusChange(todo.id);
  });
  const p = createElement("p", "font-semibold text-lg", todo.title);
  const button = createElement("button", "bg-blue-300 rounded-md p-1", "X");
  button.addEventListener("click", () => {
    deleteToDoElement(todo.id);
  });
  div.append(p, button);
  return div;
};

const statusChange = async (id) => {
  const res = await window.todos.statusChange(id);
  const index = _Todos.findIndex((todo) => todo.id === id);
  _Todos[index] = res;
  listToDos();
  console.log(res);
};

const visualMark = (id) => {
  const index = _Todos.findIndex((todo) => todo.id === id);
  const todo = _Todos[index];
  if (todo.completed === true) {
    todo.classList.add("bg-emerald-300");
  } else {
    todo.classList.remove("bg-emerald-300");
  }
};

//CHANGE FUNCTION ABOVE TO A TOGGLE FUNCTION THAT CHANGES COMPLETED TO TRUE OR FALSE

//IF (COMPLETED === TRUE) {TODO.COMPLETED = FALSE} ELSE {TODO.COMPLETED = TRUE}

//FIND A WAY TO CHANGE THE COLOR OF THE TEXT WHEN COMPLETED IS TRUE OR FALSE

const deleteToDoElement = async (id) => {
  if (todo.completed === true) {
    const res = await window.todos.delete(id);
    const index = _Todos.findIndex((todo) => todo.id === id);
    _Todos.splice(index, 1);
    listToDos();
  } else {
    alert("You can't delete a todo that is not completed");
  }
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
  output.append(createToDoElement(res));
});
