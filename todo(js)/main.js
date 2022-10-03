let taskInput = document.querySelector('#task-input');
let addButton = document.querySelector('#add-button');
let taskList = [];
let filterList = [];
let inputArea = document.querySelector('.input-area');
let tabs = document.querySelectorAll('.task-tabs div');
let TABSTARGET_KEY = 'all';

let underLine = document.querySelector('#under-line');

tabs.forEach((menu) =>
  menu.addEventListener('click', (e) => underLineIndicator(e))
);

let underLineIndicator = (e) => {
  underLine.style.left = e.currentTarget.offsetLeft + 'px';
  underLine.style.width = e.currentTarget.offsetWidth + 'px';
  underLine.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 'px';
};

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (event) {
    filter(event);
  });
}

let filter = (event) => {
  TABSTARGET_KEY = event.target.id;
  filterList = [];
  if (TABSTARGET_KEY == 'all') {
    render();
  } else if (TABSTARGET_KEY == 'not-done') {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (TABSTARGET_KEY == 'done') {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
};

let clickAddTask = () => {
  let task = {
    taskContent: taskInput.value,
    isComplete: false,
    id: Date.now(),
  };
  taskList.push(task);
  taskInput.value = '';
  console.log(taskList);
  render();
};

let stopSubmit = (event) => {
  event.preventDefault();
};

let toggleComplete = (id) => {
  console.log('id:', id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete; //true를 넣으면 픽스되기 때문에 !값을 넣어준다
      break;
    }
  }
  render();
};

let deleteTask = (id) => {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1); //i번째값을 하나만 삭제
      break;
    }
  }
  render();
};

addButton.addEventListener('click', clickAddTask);
inputArea.addEventListener('submit', stopSubmit);

let render = () => {
  let list = [];
  if (TABSTARGET_KEY == 'all') {
    list = taskList;
  } else if (TABSTARGET_KEY == 'not-done' || TABSTARGET_KEY == 'done') {
    list = filterList;
  }

  let resultHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task ">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button> 
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button> 
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`;
    }
  }

  document.querySelector('#task-board').innerHTML = resultHTML;
};
