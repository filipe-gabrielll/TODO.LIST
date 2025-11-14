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
      info.innerHTML = `<small>Criada em: ${item.dataset.criadaEm}</small><br><small>Concluída em: ${data}</small>`;
    } else {
      item.dataset.concluidaEm = '';
      info.innerHTML = `<small>Criada em: ${item.dataset.criadaEm}</small>`;
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
    }, 280);
  };

  actions.appendChild(botaoConcluir);
  actions.appendChild(botaoRemover);

  item.appendChild(dot);
  item.appendChild(spanText);
  item.appendChild(actions);
  item.appendChild(info);

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
  lista.querySelectorAll('.task').forEach(item => {
    tarefas.push({
      texto: item.querySelector('.text').textContent,
      concluido: item.classList.contains('concluido'),
      criadaEm: item.dataset.criadaEm,
      concluidaEm: item.dataset.concluidaEm || ''
    });
  });
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
  const lista = document.getElementById('lista');
  lista.innerHTML = '';
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas.forEach(tarefa => {
    const item = criarItemTarefa(
      tarefa.texto,
      tarefa.concluido,
      tarefa.criadaEm,
      tarefa.concluidaEm
    );
    lista.appendChild(item);
  });
  atualizarContador();
  aplicarTemaSalvo();
  aplicarFiltros();
}

function aplicarTemaSalvo() {
  const temaSalvo = localStorage.getItem('tema');
  const botaoTema = document.getElementById('toggle-tema');
  if (temaSalvo === 'claro') {
    document.body.classList.add('tema-claro');
    if (botaoTema) botaoTema.textContent = 'Tema Escuro';
  } else {
    document.body.classList.remove('tema-claro');
    if (botaoTema) botaoTema.textContent = 'Tema Claro';
  }
}

function aplicarFiltros() {
  const botoesFiltro = document.querySelectorAll('.filtro');
  if (!botoesFiltro || botoesFiltro.length === 0) return;

  botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
      const tipo = botao.dataset.filtro;
      const tarefas = document.querySelectorAll('.task');
      tarefas.forEach(tarefa => {
        if (tipo === 'todas') {
          tarefa.style.display = 'grid';
        } else if (tipo === 'pendentes') {
          tarefa.style.display = tarefa.classList.contains('concluido') ? 'none' : 'grid';
        } else if (tipo === 'concluidas') {
          tarefa.style.display = tarefa.classList.contains('concluido') ? 'grid' : 'none';
        }
      });
      botoesFiltro.forEach(b => b.classList.remove('ativo'));
      botao.classList.add('ativo');
    });
  });
}

// Inicialização
window.onload = () => {
  carregarTarefas();

  const botaoTema = document.getElementById('toggle-tema');
  if (botaoTema) {
    botaoTema.onclick = () => {
      document.body.classList.toggle('tema-claro');
      const temaAtual = document.body.classList.contains('tema-claro') ? 'claro' : 'escuro';
      localStorage.setItem('tema', temaAtual);
      botaoTema.textContent = temaAtual === 'claro' ? 'Tema Escuro' : 'Tema Claro';
    };
  }
};

let grafico; // variável global para armazenar o gráfico

function atualizarGrafico(pendentes, concluidas) {
  const ctx = document.getElementById('graficoTarefas').getContext('2d');

  if (grafico) {
    grafico.destroy(); // remove gráfico anterior para recriar
  }

  grafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Pendentes', 'Concluídas'],
      datasets: [{
        label: 'Tarefas',
        data: [pendentes, concluidas],
        backgroundColor: ['#f87171', '#22c55e'] // vermelho e verde
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function atualizarContador() {
  const tarefas = document.querySelectorAll('.task');
  const pendentes = Array.from(tarefas).filter(t => !t.classList.contains('concluido')).length;
  const concluidas = tarefas.length - pendentes;

  document.getElementById('pendentes').textContent = `Pendentes: ${pendentes}`;
  document.getElementById('concluidas').textContent = `Concluídas: ${concluidas}`;

  atualizarGrafico(pendentes, concluidas); // atualiza gráfico
}

const API = "http://localhost/tarefas-api/api.php";

async function carregarTarefas() {
  const res = await fetch(API);
  const tarefas = await res.json();
  console.log(tarefas); // aqui você pode renderizar na lista
}

async function adicionarTarefa() {
  const texto = document.getElementById("nova-tarefa").value.trim();
  if (!texto) return;
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto })
  });
  const nova = await res.json();
  console.log(nova); // aqui você adiciona na lista
}
