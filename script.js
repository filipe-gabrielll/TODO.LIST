function adicionarTarefa() {
  const input = document.getElementById('nova-tarefa');
  const lista = document.getElementById('lista');
  const texto = input.value.trim();

  if (!texto) return;

  const item = criarItemTarefa(texto);
  lista.appendChild(item);

  input.value = '';
  salvarTarefas();
  atualizarContador();
}

function criarItemTarefa(texto, concluido = false, criadaEm = null, concluidaEm = null) {
  const item = document.createElement('li');
  item.className = 'task';

  const dot = document.createElement('span');
  dot.className = 'dot';

  const spanText = document.createElement('span');
  spanText.className = 'text';
  spanText.textContent = texto;

  const info = document.createElement('div');
  info.className = 'info';
  const dataCriacao = criadaEm || new Date().toLocaleDateString();
  info.innerHTML = `<small>Criada em: ${dataCriacao}</small>`;

  if (concluido && concluidaEm) {
    info.innerHTML += `<br><small>Concluída em: ${concluidaEm}</small>`;
  }

  const actions = document.createElement('div');
  actions.className = 'actions';

  const botaoConcluir = document.createElement('button');
  botaoConcluir.className = 'icon-btn complete';
  botaoConcluir.innerHTML = '<span class="dot-mini"></span> Concluir';
  botaoConcluir.onclick = () => {
    item.classList.toggle('concluido');

    if (item.classList.contains('concluido')) {
      const data = new Date().toLocaleDateString();
      item.dataset.concluidaEm = data;
      info.innerHTML += `<br><small>Concluída em: ${data}</small>`;
    } else {
      item.dataset.concluidaEm = '';
      info.innerHTML = `<small>Criada em: ${dataCriacao}</small>`;
    }

    salvarTarefas();
    atualizarContador();
  };

  const botaoRemover = document.createElement('button');
  botaoRemover.className = 'icon-btn remove';
  botaoRemover.innerHTML = '<span class="dot-mini"></span> Remover';
  botaoRemover.onclick = () => {
    item.classList.add('removendo');
    setTimeout(() => {
      item.remove();
      salvarTarefas();
      atualizarContador();
    }, 300);
  };

  actions.appendChild(botaoConcluir);
  actions.appendChild(botaoRemover);

  item.appendChild(dot);
  item.appendChild(spanText);
  item.appendChild(info);
  item.appendChild(actions);

  if (concluido) {
    item.classList.add('concluido');
    item.dataset.concluidaEm = concluidaEm || '';
  }

  item.dataset.criadaEm = dataCriacao;

  return item;
}

function salvarTarefas() {
  const lista = document.getElementById('lista');
  const tarefas = [];

  lista.querySelector
