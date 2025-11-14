const API = "http://localhost/tarefas-api/api.php";
let grafico; // variável global para armazenar o gráfico

async function adicionarTarefa() {
  const texto = document.getElementById("nova-tarefa").value.trim();
  if (!texto) return;

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto })
  });
  const nova = await res.json();

  const lista = document.getElementById("lista");
  const item = criarItemTarefa(
    nova.texto,
    nova.concluido == 1,
    nova.criadaEm,
    nova.concluidaEm,
    nova.id
  );
  lista.appendChild(item);

  document.getElementById("nova-tarefa").value = "";
  atualizarContador();
}

function criarItemTarefa(texto, concluido = false, criadaEm = null, concluidaEm = null, id = null) {
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
  botaoConcluir.onclick = async () => {
    await fetch(`${API}?id=${id}`, { method: "PUT" });
    item.classList.toggle('concluido');
    if (item.classList.contains('concluido')) {
      const data = new Date().toLocaleDateString();
      item.dataset.concluidaEm = data;
      info.innerHTML = `<small>Criada em: ${item.dataset.criadaEm}</small><br><small>Concluída em: ${data}</small>`;
    } else {
      item.dataset.concluidaEm = '';
      info.innerHTML = `<small>Criada em: ${item.dataset.criadaEm}</small>`;
    }
    atualizarContador();
  };

  const botaoRemover = document.createElement('button');
  botaoRemover.className = 'icon-btn remove';
  botaoRemover.innerHTML = '<span class="dot-mini"></span> Remover';
  botaoRemover.onclick = async () => {
    await fetch(`${API}?id=${id}`, { method: "DELETE" });
    item.classList.add('removendo');
    setTimeout(() => {
      item.remove();
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

async function carregarTarefas() {
  const lista = document.getElementById('lista');
  lista.innerHTML = '';
  const res = await fetch(API);
  const tarefas = await res.json();

  tarefas.forEach(t => {
    const item = criarItemTarefa(
      t.texto,
      t.concluido == 1,
      t.criadaEm,
      t.concluidaEm,
      t.id
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
