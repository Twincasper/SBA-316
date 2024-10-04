const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setTodos = (todos) => {
  setLocalStorageKey('todos', todos);
};

export const getAllTodos = () => {
  return getLocalStorageKey('todos') || [];
};

export const addTodo = (todo) => {
  const todos = getAllTodos();
  todos.push(todo);
  setTodos(todos);
};

export const toggleTodoComplete = (index) => {
  const todos = getAllTodos();
  todos[index].isComplete = !todos[index].isComplete;
  setTodos(todos);
};

export const deleteTodo = (index) => {
  const todos = getAllTodos();
  todos.splice(index, 1);
  setTodos(todos);
};


const renderTodoCard = (todo, index) => {
  const todosList = document.querySelector("ul#todos-list");
  const li = document.createElement('li');
  const h3 = document.createElement('h3');

  li.dataset.index = index;
  li.classList.add('todo-card');
  h3.textContent = todo.title;
  h3.contentEditable = true;

  const labelInputButton = document.createElement('div');
  labelInputButton.innerHTML = `
    <div class='label-input-container'>
      <label>Complete</label>
      <input type="checkbox" name="isComplete" ${todo.isComplete ? "checked" : ""}>
    </div>
    <button class='delete-todo'>🗑️</button>`;
  li.append(h3, labelInputButton);
  todosList.appendChild(li);
};

const renderTodos = () => {
  document.querySelector('ul#todos-list').innerHTML = "";
  getAllTodos().forEach((todo, index) => renderTodoCard(todo, index));
};

const handleNewTodo = (e) => {
  e.preventDefault();

  const form = e.target;
  if (form.todoTitle.value.trim() === "") {
    window.alert("HEHEHEE NO EMPTY TITLES PLEASE");
    return;
  }
  const newTodo = {
    title: form.todoTitle.value,
    isComplete: false
  };

  addTodo(newTodo);

  renderTodos();
  
  form.reset();
};

const handleTodoChange = (e) => {
  if (!e.target.matches('input[type="checkbox"]')) return;
  const li = e.target.closest('li');
  const index = li.dataset.index;
  toggleTodoComplete(index);

  const todo = getAllTodos()[index];

  if (todo.isComplete) {
    li.classList.add('completed');
  } else {
    li.classList.remove('completed');
  }
};


const handleDelete = (e) => {
  if (!e.target.matches('button.delete-todo')) return;
  const li = e.target.parentNode.parentNode;
  const index = li.dataset.index;
  const confirmDelete = window.confirm("You're getting rid of me? :(");

  if (confirmDelete) {
    deleteTodo(index);
    renderTodos();
  }
};

const main = () => {
  const form = document.querySelector("form#new-todo-form");
  form.addEventListener('submit', handleNewTodo);
  const ul = document.querySelector('ul#todos-list');
  ul.addEventListener('input', handleTodoChange);
  ul.addEventListener('click', handleDelete);
  
  renderTodos();
};

main();
