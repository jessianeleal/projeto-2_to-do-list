const btnAdd = document.getElementById("btnAdd");
const novaTarefa = document.getElementById("novaTarefa");
var idNum = 0

btnAdd.addEventListener("click",function(evt){
    evt.preventDefault();
    
    //Validação da tarefa
    if (novaTarefa.value === "" || novaTarefa.value === " " || 
    novaTarefa.value ===  null || novaTarefa.value === undefined || !novaTarefa.value.trim()){
        novaTarefa.focus();
        alert("Digite sua tarefa antes de inserir")
        return false;
    }
    
    // Adicionar +1 ao número do id
    idNum++

    // Adicionar nova tarefa
    const itemLista = document.createElement("div");
    itemLista.innerHTML = ` 
    <div class="tarefas-lista__itens" id="${idNum}" ondrop="drop(event)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" droppable=true>
        <p class="tarefa-lista__descricao">${novaTarefa.value}</p>
        <a href="#" class="btn_editar btn" title="Editar tarefa"onclick = "editar(event)">
            <img src="img/edit.png" alt="editar" >
        </a>
        <a href="#" class="btn_remover btn" title="Excluir tarefa" onclick = "excluir(event)">
            <img src="img/trash.png" alt="remover">
        </a>
    </div>`;

    //Inserir trarefa 
    const tarefasLista = document.querySelector(".tarefas-lista")
    tarefasLista.insertBefore(itemLista,tarefasLista.childNodes[0])

    // Limpar o campo de input após enviar
    novaTarefa.value = null;
    
     //Check na tarefa
     const descricaoTarefa = document.querySelector(".tarefa-lista__descricao")
     descricaoTarefa.addEventListener("click", function(evt){
        evt.preventDefault();
        if (this.className==="tarefa-lista__descricao"){
            this.className = "tarefa-lista__descricao_checked"
        }else{
            this.className = "tarefa-lista__descricao"
        }
    })
   

})

// Cria evento de excluir todos os itens da lista
const btnExcluir = document.querySelector(".geral__excluir");
btnExcluir.addEventListener("click", function(evento) {
    evento.preventDefault();
    const tarefasLista = document.querySelector(".tarefas-lista");
    tarefasLista.innerHTML = ""
})

// Cria evento de checar todos os itens da lista
const btnChecar = document.querySelector(".geral__checar");
btnChecar.addEventListener("click", function(evento) {
        evento.preventDefault();
        const tarefas = document.getElementsByTagName("p");
        for (let i = 0; i <= tarefas.length; i++) {
            tarefas[i].className = "tarefa-lista__descricao_checked";
        }
})


//Drag and Drop
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log("origem", data)
    // console.log("alvo",ev.target.closest("div").index)
    const tarefasLista = document.querySelector(".tarefas-lista")
    console.log(ev.target.parentElement)
    ev.target.parentNode.insertAdjacentElement('beforebegin',document.getElementById(data));
}

    //Editar tarefa
    function editar(ev){
    const btnEdt = document.getElementById(ev.target.closest("div").id)
    ev.preventDefault();
    novaTarefa.value = btnEdt.children[0].textContent
    btnEdt.remove()
    }

     //Excluir tarefa
    function excluir(ev){
    const btnDel = document.getElementById(ev.target.closest("div").id)
    ev.preventDefault();
    btnDel.remove()
    }
