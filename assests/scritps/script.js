const button = document.querySelector('#button-add-task') // Seleciona o botão de adicionar task do HTML
const input = document.querySelector('#input-task') // Seleciona o campo de input onde o usuário escreve a task
const fullList = document.querySelector('#list-tasks') // Seleciona a <ul> onde as tasks serão listadas
let errormsg = document.querySelector('#error-msg') // Seleciona o elemento onde mensagens de erro serão exibidas

let itensList = [] // Inicializa um array vazio que vai armazenar os objetos de tasks

function addNewTask() { // Função que adiciona uma nova task e faz verificações

    // Verificação 1: Se o input estiver vazio, exibe uma mensagem de erro e interrompe a função
    if(input.value == ''){ 
        errormsg.textContent = 'Sua tarefa está vazia'
        return
    }

    // Verificação 2: Se já existir uma task com o mesmo valor no array `itensList`, exibe uma mensagem de erro
    if(itensList.some(item => item.task === input.value)) { 
        errormsg.textContent = 'Já existe essa tarefa'
        return
    }

    // Adiciona um novo objeto ao array `itensList` com a task do input e marca como não completada (completed: false)
    itensList.push({
        task: input.value,
        completed: false
    })

    // Limpa o campo de input após adicionar a task
    input.value = ''

    // Limpa qualquer mensagem de erro que tenha sido exibida anteriormente
    errormsg.textContent = ''

    // Atualiza a exibição da lista de tasks
    printTask()
}

function printTask() { // Função que atualiza a lista de tasks na página

    let newList = '' // Variável que armazena o conteúdo HTML da lista de tasks

    // Percorre o array `itensList` e cria os elementos <li> com base nas tasks
    itensList.forEach(function(item, index) { 
        // Concatena cada item da task à string `newList`, definindo a classe e os botões de check e delete
        newList = newList + 
        `    
        <li id='${item.completed ? "done" : ""}' class="task"> 
            <img src="./assests/img/checked.png" alt="check-image" onclick='checkTask(${index})'> 
            <p>${item.task}</p>
            <img src="./assests/img/trash.png" alt="trash-image" onclick='deleteTask(${index})'>
        </li>
        ` 
        // Aqui usamos o operador ternário para definir se a task está concluída: 
        // Se `item.completed` for true, a id 'done' é atribuída, senão é vazia
    }) 

    // Atualiza o conteúdo da <ul> com as tasks. Como a `newList` é concatenada, as tasks anteriores não são substituídas.
    fullList.innerHTML = newList 

    // Armazena o array `itensList` no `localStorage` como uma string JSON
    localStorage.setItem('localList', JSON.stringify(itensList))
}

function checkTask(index) { // Função que marca/desmarca uma task como concluída
    itensList[index].completed = !itensList[index].completed // Alterna o status de completed entre true e false
    printTask() // Atualiza a lista de tasks
}

function deleteTask(index) { // Função que deleta uma task
    itensList.splice(index, 1) // Remove o item da lista com base no index fornecido
    printTask() // Atualiza a lista de tasks
}

function reloadPage() { // Função que recarrega as tasks salvas quando a página é carregada

    // Recupera o item 'localList' do localStorage. Se existir, vai trazer uma string JSON.
    const taskFromLocalStorage = localStorage.getItem('localList')

    // Se houver alguma tarefa salva no localStorage, converte a string JSON de volta para um array e atribui a `itensList`
    if(taskFromLocalStorage) {
      itensList = JSON.parse(taskFromLocalStorage) 
    }

    // Atualiza a interface com as tasks recuperadas
    printTask()
}

reloadPage() // Quando a página é recarregada ou aberta novamente, chama a função `reloadPage` para recuperar as tasks salvas

button.addEventListener('click', addNewTask) // Adiciona um evento de clique ao botão que chama a função addNewTask quando clicado
