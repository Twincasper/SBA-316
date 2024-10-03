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
  todos[index].isComplete = !todos[index].isComplete; // Toggle the isComplete property
  setTodos(todos);
};

export const deleteTodo = (index) => {
  const todos = getAllTodos();
  todos.splice(index, 1);
  setTodos(todos);
};

// Maybe initialize the app with existing todos, we can use getElementsByClassName to get all elements with class 'todo-card', or just check if getAllTodos() returns an empty array.

const renderTodoCard = (todo, index) => {
  const todosList = document.querySelector("ul#todos-list");
  const li = document.createElement('li');
  const h3 = document.createElement('h3');

  li.dataset.index = index;
  li.classList.add('todo-card');
  h3.textContent = todo.title;

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

// At this point, we'll start writing the actual dom code to handle user interactions and render the todo cards, and then subsequently call the functions to fetch and set the todos from localStorage.
