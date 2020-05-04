const todoform = document.querySelector(".js-todoForm"),
    todoInput = todoform.querySelector("input"),
    todoList = document.querySelector(".js-todoList");


const TODOS_LS = 'todos'

let todos = [];

function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanTodos = todos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    todos = cleanTodos
    saveTodos();
}

function saveTodos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = todos.length +1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span); //span을 li의 자식으로 만드는 것
    todoList.appendChild(li);
    li.id = newId;
    const todoObj = {
        text: text,
        id: todos.length + 1
    };
    todos.push(todoObj);
    saveTodos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";
}

function loadTodos(){
    const loadedTodos = localStorage.getItem(TODOS_LS);
    if(loadedTodos !== null){
        const parsedTodos = JSON.parse(loadedTodos);
        parsedTodos.forEach(function(toDo){
            paintTodo(toDo.text);
        })
    }
}


function init(){
    loadTodos();
    todoform.addEventListener("submit", handleSubmit)
}

init();