// 유저는 할일을 추가할 수 있다.
// 각 할일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.

const taskInput = document.getElementById("task-input")    
const addButton = document.getElementById("add-button")
let taskList =[]
addButton.addEventListener("click",addTask)


function addTask(){
    let task ={
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    }
    taskList.push(task)
    console.log(taskList);
    render()
    
    
}

function render(){
    let resultHtml=""
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHtml+= `<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
             <button onClick="toggleComplete('${taskList[i].id}')">Check</button>
             <button onClick = "deleteTask('${taskList[i].id}')">Delete</button>
         </div>
     </div>`;
        }else{
            resultHtml += ` <div class="task">
            <div>${taskList[i].taskContent}</div>
            <div>
             <button onClick ="toggleComplete('${taskList[i].id}')">Check</button>
             <button onClick = "deleteTask('${taskList[i].id}')">Delete</button>
         </div>
     </div>`;
        }
        
    }


    document.getElementById("task-board").innerHTML= resultHtml
}


function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
            taskList[i].isComplete =!taskList[i].isComplete
            break;
        }
    }
    render()
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id ==id){
            taskList.splice(i,1)
            break;
        }
    }
    render()
}





function randomIDGenerate() {
    return `-`+Math.random().toString(36).substr(2,9)
}
