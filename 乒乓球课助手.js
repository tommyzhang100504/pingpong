const add_to_do = document.getElementById("add-to-do");
const to_do_date = document.getElementById("to-do-date");
const add_to_do_btn = document.getElementById("add-to-do-btn");
const first_list = document.getElementById("non-complete");
const second_list = document.getElementById("complete");
const none_m = document.getElementById("non-message");
const m = document.getElementById("message");

let todo = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : {
    nonComplete: [],
    complete: []
}

start();

function start() {
    if (!todo.nonComplete.length && !todo.complete.length) {
        return;
    }

    for (let i = 0; i < todo.nonComplete.length; i++) {
        let date1 = todo.nonComplete[i].substr(-16);
        let date = date1.replace('T',' ');  ;
        let value = todo.nonComplete[i].substr(0, todo.nonComplete[i].length - date.length);
        addItem(value, date, false);
    }

    for (let j = 0; j < todo.complete.length; j++) {
        let date = todo.complete[j].substr(-10);
        let value = todo.complete[j].substr(0, todo.complete[j].length - date.length);
        addItem(value, date, true);
    }
}

function updateLocalStarage() {
    localStorage.setItem("todoList", JSON.stringify(todo));
}

function removeItem() {
    let item = this.parentNode.parentNode;
    
    let class_list = this.classList.value;
    let parent = item.parentNode;
    let id = parent.id;

    parent.removeChild(item);

    if (id === "non-complete") {
        todo.nonComplete.splice(todo.nonComplete.indexOf(item.innerText, 1));
    }
    else {
        todo.complete.splice(todo.nonComplete.indexOf(item.innerText, 1));
    }
    

    checkEmpty1();
    checkEmpty2();

    updateLocalStarage();
}

function checkItem() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let class_list = this.classList.value;
    let target = class_list === "check" ? second_list:first_list;

    if (class_list === "check") {
        this.classList.value = "deleted";
        todo.nonComplete.splice(todo.nonComplete.indexOf(item.innerText, 1));
        todo.complete.push(item.innerText);
    }
    else {
        this.classList.value = "check";
        todo.complete.splice(todo.nonComplete.indexOf(item.innerText, 1));
        todo.nonComplete.push(item.innerText);
    }
    
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

    checkEmpty1();
    checkEmpty2();

    updateLocalStarage();
}

function addItem(text, time, completed) {
    let list = completed ? second_list : first_list;
    
    let item = document.createElement("li");
    item.innerText = text;

    let date = document.createElement("small");
    date.innerText = time;
    date.classList.add("small");

    let buttons = document.createElement("div");
    buttons.classList.add("buttons");

    let delete1 = document.createElement("button");
    delete1.classList.add("delete");
    delete1.classList.add("margin5");
    delete1.innerHTML = `<i class="far fa-trash-alt"></i>`;
    delete1.addEventListener("click", removeItem);
    
    let check = document.createElement("button");
    if (completed) {
        check.classList.add("deleted");
    }
    else {
        check.classList.add("check");
    }
    check.innerHTML = `<i class="fas fa-check"></i>`;
    check.addEventListener("click", checkItem);

    buttons.appendChild(delete1);
    buttons.appendChild(check);
    item.appendChild(date);
    item.appendChild(buttons);
    list.insertBefore(item, list.childNodes[0]);

    checkEmpty1();
    checkEmpty2();
}

function checkEmpty1() {
    if (first_list.childNodes.length < 2) {
        none_m.classList.remove("hide");
        none_m.classList.add("can");
    }
    else {
        none_m.classList.remove("can");
        none_m.classList.add("hide");
    }
}

function checkEmpty2() {
    if (second_list.childNodes.length < 2) {
        m.classList.remove("hide");
        m.classList.add("can");
    }
    else {
        m.classList.remove("can");
        m.classList.add("hide");
    }
}

add_to_do.addEventListener("keydown", (e) => {
    if (e.code === "Enter" && add_to_do.value) {
        addItemTodo(add_to_do.value);
    }
});

function addItemTodo (inputValue) {
    todo.nonComplete.push(inputValue);
    addItem(inputValue);
    add_to_do.value = "";
    updateLocalStarage();
}

add_to_do_btn.addEventListener("click", () => {
    let inputValue = add_to_do.value;
    let inputDate = to_do_date.value;
    if (inputValue && inputDate) {
        let com = inputValue + inputDate;
        todo.nonComplete.push(com);
        addItem(inputValue, inputDate);
        add_to_do.value = "";
        to_do_date.value = "";
        updateLocalStarage();
    }
});