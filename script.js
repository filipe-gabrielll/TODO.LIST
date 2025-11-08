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

function criarItemTarefa(texto, concluido = false) {
  const item = document.createElement('li');
  item.className = 'task';

  const dot = document.createElement('span');
  dot.className = 'dot';

  const spanText = document.createElement('span');
  spanText.className = 'text';
  spanText.textContent = texto;

  const actions = document.createElement('div');
  actions.className = 'actions';

  const botaoConcluir = document.createElement('button');
  botaoConcluir.className = 'icon-btn complete';
  botaoConcluir.innerHTML = '<span class="dot-mini"></span> Concluir';
  botaoConcluir.onclick = () => {
    item.classList.toggle('concluido');
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
  lista.innerHTML = '';

  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

  tarefas.forEach(tarefa => {
    const item = criarItemTarefa(tarefa.texto, tarefa.concluido);
    lista.appendChild(item);
  });

  atualizarContador();
  aplicarTemaSalvo(); // ✅ aplica tema salvo ao carregar
}

window.onload = carregarTarefas;

function atualizarContador() {
  const tarefas = document.querySelectorAll('.task');
  const pendentes = Array.from(tarefas).filter(t => !t.classList.contains('concluido')).length;
  const concluidas = tarefas.length - pendentes;

  const pendentesEl = document.getElementById('pendentes');
  const concluidasEl = document.getElementById('concluidas');

  if (pendentesEl && concluidasEl) {
    pendentesEl.textContent = `Pendentes: ${pendentes}`;
    concluidasEl.textContent = `Concluídas: ${concluidas}`;
  }
}

// ✅ Alternância de tema com salvamento e texto dinâmico
const botaoTema = document.getElementById('toggle-tema');

function aplicarTemaSalvo() {
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'claro') {
    document.body.classList.add('tema-claro');
    botaoTema.textContent = 'Tema Escuro';
  } else {
    botaoTema.textContent = 'Tema Claro';
  }
}

botaoTema.onclick = () => {
  document.body.classList.toggle('tema-claro');
  const temaAtual = document.body.classList.contains('tema-claro') ? 'claro' : 'escuro';
  localStorage.setItem('tema', temaAtual);
  botaoTema.textContent = temaAtual === 'claro' ? 'Tema Escuro' : 'Tema Claro';
};
