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
    
    idNum++

    // Adicionar nova tarefa
    const itemLista = document.createElement("div");
    itemLista.innerHTML += ` 
    <div class="tarefas-lista__itens" id="${idNum}">
        <p class="tarefa-lista__descricao">${novaTarefa.value}</p>
        <a href="#" class="btn_editar btn" title="Editar tarefa">
            <img src="img/edit.png" alt="editar">
        </a>
        <a href="#" class="btn_remover btn" title="Excluir tarefa">
            <img src="img/trash.png" alt="remover">
        </a>
    </div>`;
    //Inserir trarefa 
    const tarefasLista = document.querySelector(".tarefas-lista")
    tarefasLista.insertBefore(itemLista,tarefasLista.childNodes[0])

    // Limpar o campo de input após enviar
    novaTarefa.value = null;
    novaTarefa.ins
    
     //Excluir tarefa
     const btnDel = document.querySelector(".btn_remover")
     btnDel.addEventListener("click", function(evt){
        evt.preventDefault();
        itemLista.remove()
     })

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
   
    //BONUS: Editar tarefa
    const btnEdt = document.querySelector(".btn_editar")
    btnEdt.addEventListener("click", function(evt){
        evt.preventDefault();
        console.log(descricaoTarefa.textContent)
        novaTarefa.value = descricaoTarefa.textContent
        itemLista.remove()
    })

})
