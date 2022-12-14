
let todos = [
    {
        id:1,
        content:"Shoping"
    },
    {
        id:2,
        content:"Soccer"
    }
];
let selectedIndex = null;

const todolist = document.querySelector(".todo-list");

const btnadd = document.querySelector(".btn-add");
const input = document.querySelector(".todo-input");
const todoinfo = document.querySelector(".todo-info");

renderTodos(todos);
btnadd.addEventListener("click",function(e){
    e.preventDefault()

    const value  = input.value // 
    // console.log(value)
    if(!value){
        alert("input is empty")
        return; 
    }
    //edit 
    if(selectedIndex){
        const selectedTodos = todos[selectedIndex]
        selectedTodos.content = input.value
        renderTodos(todos)
        input.value = ''

        return;//co return hk can else 
    }
    // add
    const newtodo = {
        id:Date.now(),
        content: value
    } 
    todos.push(newtodo);
     renderTodos(todos)//
    input.value = ''
})

todolist.addEventListener("click", function(e){
    const isdeletebtn  = e.target.closest(".btn-delete");
    const isediBtn = e.target.closest(".btn-edit");

    if(isediBtn){
        const li = e.target.closest("li");
        const id= +li.dataset.id
        const index = todos.findIndex(val=> val.id === id)
        if(index !== -1){//neu tim dc
            selectedIndex = index
            input.value = todos[selectedIndex].content
        }
    }
    if(isdeletebtn){
        //get cai li gan nhat 
        const li = e.target.closest("li");
        const id= +li.dataset.id//
        const newtodos = todos.filter(val=>val.id !== id)
        todos = newtodos;
        renderTodos(todos)
        input.value = ''
    }

})
todoinfo.addEventListener("click", function(e){
    const isclearBtn = e.target.classList.contains("clear");
    if(isclearBtn){
        todos.length = 0 
        renderTodos(todos)
    }
})
function renderTodos(list){
    let renderHtml = ""
    list.forEach(val =>{
        renderHtml +=  `
            <li data-id ="${val.id}" class=" flex j-between todo-items">
                <span>${val.content}</span>
                <div class="button">
                    <button class="btn-delete"><i class="fa-solid fa-trash"></i></button>
                    <button class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>    
                </div> 
            </li>`
    });
    todolist.innerHTML = renderHtml;
    renderTodoInfo();
}
function renderTodoInfo(){
    todoinfo.innerHTML =   `      
    <p class="earn">you're have ${todos.length} todos</p>
    <button class="clear">Clear Todo</button>
`
}