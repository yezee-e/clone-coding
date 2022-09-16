const toDoForm = document.getElementById('todo-form');
const toDoList = document.getElementById('todo-list');
const toDoInput = toDoForm.querySelector('input');

let toDos = [];

const TODOS_KEY = 'todos';
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = '';
  const newTodoObj = {
    //id를 통해 로컬스토리지에서 지워야할 타겟을 얻기 위해 저장형태를 object로 바꿈
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj); //input에 적은 값을 toDo에 저장
  paintToDo(newTodoObj); //input에 적은 값을 매개변수로 전달해줌
  saveToDos();
}
toDoForm.addEventListener('submit', handleToDoSubmit);

function paintToDo(newTodo) {
  //전달받은 값을 li,span,button을 만들어서 html에 넣어준다
  const li = document.createElement('li');
  li.id = newTodo.id; //html에 id값이 보여지게 한다
  const span = document.createElement('span');
  span.innerText = newTodo.text; //newToDoObj은 객체이기 때문에 text만 볼수있도록한다
  const button = document.createElement('button');
  button.innerText = '❌';
  button.addEventListener('click', deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function deleteToDo(event) {
  const li = event.target.parentElement; //버튼이 정확히 어디를 눌렸는지 알수있음
  console.log(li);
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
  li.remove(); //버튼 클릭 하면 해당 li를 삭제시킨다
}

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); //json으로 stirng타입으로 전환하여 저장
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  //로컬스토리지에 값이 있다면 ->JSON.parse()로 살아있는 배열로 만들어준다
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos; //로컬스토리지에 저장한 값이 다음값에 의해 지워지지 않도록 저장
  parsedToDos.forEach(paintToDo);
}
