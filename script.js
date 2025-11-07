function adicionarTarefa() {
  const input = document.getElementById('nova-tarefa');
  const lista = document.getElementById('lista');
  const texto = input.value.trim();

  if (!texto) return;

  const item = criarItemTarefa(texto);
  lista.appendChild(item);

  input.value = '';
  salvarTarefas();
}

function criarItemTarefa(texto, concluido = false) {
  const item = document.createElement('li');
  item.className = 'task';

  // bolinha decorativa
  const dot = document.createElement('span');
  dot.className = 'dot';

  // texto da tarefa
  const spanText = document.createElement('span');
  spanText.className = 'text';
  spanText.textContent = texto;

  // container de ações
  const actions = document.createElement('div');
  actions.className = 'actions';

  // botão concluir
  const botaoConcluir = document.createElement('button');
  botaoConcluir.className = 'icon-btn complete';
  botaoConcluir.innerHTML = '<span class="dot-mini"></span> Concluir';
  botaoConcluir.onclick = () => {
    item.classList.toggle('concluido');
    salvarTarefas();
  };

  // botão remover
  const botaoRemover = document.createElement('button');
  botaoRemover.className = 'icon-btn remove';
  botaoRemover.innerHTML = '<span class="dot-mini"></span> Remover';
  botaoRemover.onclick = () => {
    item.classList.add('removendo');
    setTimeout(() => {
      item.remove();
      salvarTarefas();
    }, 300);
  };

  actions.appendChild(botaoConcluir);
  actions.appendChild(botaoRemover);

  item.appendChild(dot);
  item.appendChild(spanText);
  item.appendChild(actions);

  if (concluido) {
    item.classList.add('concluido');
  }

  return item;
}

function salvarTarefas() {
  const lista = document.getElementById('lista');
  const tarefas = [];

  lista.querySelectorAll('.task').forEach(item => {
    tarefas.push({
      texto: item.querySelector('.text').textContent,
      concluido: item.classList.contains('concluido')
    });
  });

  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
  const lista = document.getElementById('lista');
  lista.innerHTML = ''; // limpa antes de carregar

  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

  tarefas.forEach(tarefa => {
    const item = criarItemTarefa(tarefa.texto, tarefa.concluido);
    lista.appendChild(item);
  });
}

window.onload = carregarTarefas;
