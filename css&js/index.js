const request = async (url, method, data)=>{
    let options = {
        method:method,
        headers:{
            'Content-Type': 'application/json'
        }
    }
    if(data && method.toLowerCase() !== 'get') {
        options.body = JSON.stringify(data)
    }

    let response = await fetch(url, options);
    return response.json();
};

const start = async ()=>{
    let tasks = await request("/tasks", 'GET');
    let divTasks = document.getElementById("tasks")
    divTasks.innerHTML = ""
    divTasks.innerHTML = 
    tasks.map(task=>`
        <div class="center" id='${task.id}'> 
            ${task.title} 
            <input type="checkbox" ${task.is_completed ? 'checked': ""} class="completed">
            <button class="button" onClick="deleteClicked(this.id)" id="delete_${task.id}">Delete</button> 
        </div>
    `).sort((a,b)=>a.id-b.id).join("");
    
    document.querySelectorAll(".completed").forEach(box=>{
        box.addEventListener('change', async (evt)=>{
            let result = await request(`/edit-task/${evt.target.parentNode.id}/state/${box.checked}`, 'PATCH')
        })
    })
}

const deleteClicked = async (id)=> {
    console.log("Clicked "+ id)
    let result = await request(`/delete-task/${id}`, 'DELETE')
}

const submit = async ()=>{
    let titleInput = document.getElementById('titleinput')
    let value = titleInput.value;
    titleInput.value = ""
    let response = await request("/new-task", 'POST', {title:value})
    start();
}

let btn = document.getElementById("newtaskbtn").addEventListener("click", submit);

start();
