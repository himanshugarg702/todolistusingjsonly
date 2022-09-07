let tasks=[];
const tasksList=document.getElementById('list');
const addTaskInput=document.getElementById('add');
const taskcounter=document.getElementById('tasks-counter');
var a=10;
console.log('working');
// async function  fetchToDos(){
    // get request 
    //  fetch ('https://jsonplaceholder.typicode.com/todos')
    //  .then(function (response){
    //      console.log(response);
    //      return response.json();
    //  }).then(function (data){
    //      tasks=data.slice(0,10);
    //      renderList();
    //      //  console.log(data);
    //  })
    //  .catch(function (error){
    //      console.log('error',error);
    //  })

    // fetch using Async Await 
    // try {
    //     const response=await fetch('https://jsonplaceholder.typicode.com/todos');
    // const data =await response.json();
    // tasks=data.slice(0,10);
    // renderList();
    // } catch (error) {
    //     console.log(error);
    // }
    
    // }  

function addTaskToDOM(task){

const li =document.createElement('li');
// console.log(li);
li.innerHTML= `
  <li>
 <input type="radio" id="${task.id}" ${task.completed ?'checked':''}
  class="custom-checkbox">
<div  id="hello">
 <label for="${task.id}">${task.title} </label>
 <img src="https://cdn4.vectorstock.com/i/1000x1000/62/03/wrong-icon-vector-31096203.jpg" class="delete" data-id="${task.id}" />
 </div>
</li>  
`;
tasksList.append(li);
}
function renderList(){
    tasksList.innerHTML='';

    for(let i=0;i<tasks.length;i++){
addTaskToDOM(tasks[i]);
    }
    taskcounter.innerHTML=tasks.length;
}

function toggleTask(taskId){
    const task=tasks.filter(function (task){
        return task.id==Number(taskId)
    });  
    if(task.length>0){
        const currentTask=task[0];
        currentTask.completed=!currentTask.completed;
        renderList();
        showNotification('Task toggled successffuly');
        return ;
    }
    showNotification('Task toggled not successfully')
}

function deleteTask(taskId){
    const newTasks=tasks.filter(function (task){
        return task.id!==Number(taskId);

    });  
    console.log(newTasks);
    tasks=newTasks;
    renderList();
    // showNotification('Tasks deleted successfully')
}
  
function addTask(task){
    // if(task.text.length>=30){
    //     showNotification("length cant be greater then 30")
    // }
  if(task){
        tasks.push(task);
        renderList();
        // showNotification('Task added successfully');
        return ;
    }
}


// this add task is basically for post API

// function addTask(task){
//     if(task){
//         fetch ('https://jsonplaceholder.typicode.com/todos',{
//             method:'POST',
//             header:{
//                 'Content-Type':'application/json',
//             },
//             body:JSON.stringify(task),
//         })
//      .then(function (response){
//         //  console.log(response);
//          return response.json();
//      })
//     .then(function (data){
//         //  tasks=data.slice(0,10);
//         //  renderList();
//           console.log(data);
//           tasks.push(task);
//           renderList();
//           showNotification('Task added successfully');
         
//      })
//      .catch(function (error){
//          console.log('error',error);
//      })
        // tasks.push(task);
        // renderList();
        // showNotification('Task added successfully');
        // return ;
    // }
// }

function showNotification(text){
    alert(text);
}

function handleInputKeypress(e){
    if(e.key=='Enter'){
        const text=e.target.value;
       if(text.length>40){
        showNotification("length cant be greater then 40")
        e.target.value='';
       }
       else{
        console.log('text',text);
        if(!text){
            showNotification('task can not be empty')
            return ;
        }
        const task={
           title: text,
            id:Date.now(),
            completed:false 
        }
        e.target.value='';
        addTask(task);
    }
}
}
// event delegation it means basically hr ek baar -2 event listener na lgana pde 
// sidha de kr ho jaye ajsie handleClickListener me kiya hua hai dekh skte hai 

function handleClickListener(e){
    const target =e.target;
    console.log(target);
    if(target.className=='delete'){
          const taskId=target.dataset.id;
          deleteTask(taskId);
          return;  
    } 
    else if(target.className=='custom-checkbox'){
        const taskId=target.id;
          toggleTask(taskId); 
          return ;
    } 
} 
function initializeApp(){
    // fetchToDos();
addTaskInput.addEventListener('keyup',handleInputKeypress);
document.addEventListener('click',handleClickListener);
} 
initializeApp();