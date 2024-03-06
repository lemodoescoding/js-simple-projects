const inputBox = document.getElementById("input-box"),
    listContainer = document.getElementById("list-container"),
    addTask = document.getElementById("addTask")

addTask.addEventListener("click", function(){
    if(inputBox.value === ""){
        alert("You must write something")
    } else {
        let li = document.createElement("li")
        li.innerHTML = inputBox.value
        
        let span = document.createElement("span")
        span.innerHTML = "\u00d7"
        li.appendChild(span)

        listContainer.appendChild(li)
    }

    inputBox.value = ""
    saveData()
})

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked")
    } else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove()
    }

    saveData()
}, false)

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML)
}

function loadData(){
    listContainer.innerHTML = localStorage.getItem("data")
}

loadData()