// 유저는 할일을 추가할 수 있다.
// 각 할일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
//1.check버튼을 클릭하는 순간 true, false
//2.true이면 끝난걸로 간주하고 밑줄 보여주기
//3.false이면 안끝난걸로 간주하고 그대로

// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.

let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let tabs = document.querySelectorAll(".task-tabs div")
let underLine= document.getElementById("under-line")
let form = document.querySelector(".input-area")

let taskList =[]
let filterList =[]
let MODE ='all'

form.addEventListener("submit",preventform)

function preventform(event){
    event.preventDefault()
}



tabs.forEach(menu=>menu.addEventListener("click",(e)=>tabsIndicator(e)))

function tabsIndicator(e){
    underLine.style.left = e.currentTarget.offsetLeft+"px"
    underLine.style.width = e.currentTarget.offsetWidth+"px"
    underLine.style.top = e.currentTarget.offsetTop+e.currentTarget.offsetHeight+"px"
    
}


addButton.addEventListener("click",addTask)

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event)
    })
}


function filter(event){
    filterList =[]
    MODE =event.target.id

    if(MODE =="all"){
        render()
    } else if(MODE =="not-done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete ==false){
                filterList.push(taskList[i])
            }
        }
        render()
    } else if( MODE == "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete ==true){
                filterList.push(taskList[i])
            }
    }
    render()
   }
}


function addTask(){
    let task ={
        id: randomIDGerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task)
    render();
    

}

function render(){
    let list =[]
    if(MODE =="all"){
        list =taskList
    }else if(MODE == "not-done" || MODE =="done"){
        list=filterList
    }

    let resultHTML="";
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete ==true){
            resultHTML += 
        `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
            <button onclick ="toggleComplete( '${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`   
        }else{
            resultHTML += 
            `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick ="toggleComplete( '${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
          </div>`  
        }
    }

    document.getElementById("task-board").innerHTML=resultHTML
    
}

function toggleComplete(id){
    for(let i=0;i<taskList.length; i++){
        if(taskList[i].id ==id){
            taskList[i].isComplete =!taskList[i].isComplete; 
            break;
        }
    }
    render()
}

function deleteTask(id) {
    for(let i=0;i<taskList.length; i++){
        if(taskList[i].id ==id){
            taskList.splice(i,1)
            break;
        }
    }
    render()
}




function randomIDGerate(){
return '_'+Math.random().toString(36).substr(2,9)
}
