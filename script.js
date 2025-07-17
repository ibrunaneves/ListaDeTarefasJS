const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const prioritySelect = document.querySelector('#priority-select');
const taskList = document.querySelector('#task-list');

form.addEventListener("submit", function (event) {
  event.preventDefault(); // sem reload da página

  const task = taskInput.value.trim(); // remove espaços extras no início/fim
  const priority = prioritySelect.value;

  if (!task || !priority) return; // impede tarefas vazias ou sem prioridade

  const row = document.createElement("tr");

  const taskCell = document.createElement("td");
  taskCell.textContent = task; // define o conteúdo da célula
  row.appendChild(taskCell); // adiciona a célula de tarefa à linha

  const priorityCell = document.createElement("td");
  const badge = document.createElement("span"); // cria um badge colorido
  badge.classList.add("badge");
  badge.textContent = priority.charAt(0).toUpperCase() + priority.slice(1); // primeira letra maiúscula

  if (priority === "Alta") {
    badge.classList.add("badge-alta");
  } else if (priority === "Média") {
    badge.classList.add("badge-media");
  } else if (priority === "Baixa") {
    badge.classList.add("badge-baixa");
  }

  priorityCell.appendChild(badge);
  row.appendChild(priorityCell);

  const actionCell = document.createElement("td");
  const finishButton = document.createElement("button");
  finishButton.textContent = "Concluir";
  finishButton.setAttribute("type", "button"); // evita comportamento de submit
  finishButton.classList.add("btn", "btn-sm", "btn-finish");

  finishButton.addEventListener("click", function () { // clique para remover a linha da tarefa com confirmação
    const confirmar = confirm("Deseja realmente excluir esta tarefa?");
    if (confirmar) {
      row.remove();
    }
  });

  actionCell.appendChild(finishButton);
  row.appendChild(actionCell);

  
  taskList.appendChild(row); // adiciona a linha completa na tabela

  taskInput.value = ""; // limpa as linhas do form deposi que a pessoa add a tarefa
  prioritySelect.value = "";
  taskInput.focus();
});
