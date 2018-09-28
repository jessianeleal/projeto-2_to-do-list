const btnAdd = document.getElementById("btnAdd");
const novaTarefa = document.getElementById("novaTarefa");
var idNum = 0

novaTarefa.addEventListener("keypress", function(e){
    if(e.which == 13){
       adicionar(event)
    }
 })

btnAdd.addEventListener("click",adicionar)

function adicionar(evt){
    evt.preventDefault();
    
    // Validação da tarefa
    if (novaTarefa.value === "" || novaTarefa.value === " " || 
    novaTarefa.value ===  null || novaTarefa.value === undefined || !novaTarefa.value.trim()){
        novaTarefa.focus();
        alert("Digite sua tarefa antes de inserir")
        return false;
    }
    
    // Incrementar id
    idNum++

    // Adicionar nova tarefa como item da lista 
    const itemLista = document.createElement("li");
    itemLista.className = "tarefas-lista__itens";
    itemLista.id = idNum;
    itemLista.setAttribute("draggable","true");
    itemLista.setAttribute("ondragstart","drag(event)");
    itemLista.setAttribute("ondragover","allowDrop(event)");
    itemLista.setAttribute("ondrop","drop(event)");
    itemLista.setAttribute("droppable","true");
    itemLista.innerHTML = ` 
        <p class="tarefa-lista__descricao" draggable = false onclick="checar(event)">${novaTarefa.value}</p>
        <a href="#" class="btn_editar btn" title="Editar tarefa"onclick = "editar(event)"  draggable = false>
            <img src="img/edit.png" alt="editar"  draggable = false>
        </a>
        <a href="#" class="btn_remover btn" title="Excluir tarefa" onclick = "excluir(event)"  draggable = false>
            <img src="img/trash.png" alt="remover" draggable = false>
        </a>`;

    //Inserir trarefa 

    const tarefasLista = document.querySelector(".tarefas-lista")
    tarefasLista.appendChild(itemLista)
    
    // Limpar o campo de input após enviar
    novaTarefa.value = null;
}

// Excluir tarefa
    function excluir(ev){
        const btnDel = document.getElementById(ev.target.closest("li").id)
        ev.preventDefault();
        btnDel.remove()
    }

// Evento de excluir todos os itens da lista
    const btnExcluir = document.querySelector(".geral__excluir");
    btnExcluir.addEventListener("click", function(evento) {
        evento.preventDefault();
        const tarefasLista = document.querySelector(".tarefas-lista");
        tarefasLista.innerHTML = ""
    })

// Editar tarefa (BONUS)
    function editar(ev){
        const btnEdt = document.getElementById(ev.target.closest("li").id)
        ev.preventDefault();
        novaTarefa.value = btnEdt.children[0].textContent
        btnEdt.remove()
    }

 // Check na tarefa
    function checar(ev){
        const idTarefa = document.getElementById(ev.target.closest("li").id)
        const descricaoTarefa=idTarefa.children[0]
        if (descricaoTarefa.className==="tarefa-lista__descricao"){
            descricaoTarefa.className = "tarefa-lista__descricao_checked"
        }else{
            descricaoTarefa.className = "tarefa-lista__descricao"
        }
    }

// Checar todos os itens da lista
    const btnChecar = document.querySelector(".geral__checar");
    btnChecar.addEventListener("click", function(evento) {
        evento.preventDefault();
        const tarefas = document.getElementsByTagName("li");
        for (let item of tarefas){
            item.children[0].className = "tarefa-lista__descricao_checked";
        }
    })

// //Drag and Drop

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var origem = document.getElementById(data);
    origem.remove()
 if (ev.target.tagName === "P" || ev.target.tagName === "A" || ev.target.tagName === "IMG"){
    ev.target.closest("li").insertAdjacentHTML("afterEnd", origem.outerHTML)
 } else if (ev.target.id !== null) {
    document.getElementById(ev.target.id).insertAdjacentHTML("afterEnd", origem.outerHTML)
 }else{
     return false
 }
}