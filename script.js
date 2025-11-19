// URL da API que conecta ao back-end em PHP
const API = "http://localhost/tarefas-api/api.php";
let grafico; // variável global para armazenar o gráfico

// Função para adicionar uma nova tarefa
async function adicionarTarefa() {
  const texto = document.getElementById("nova-tarefa").value.trim();
  if (!texto) return; // evita envio de texto vazio

  // Envia a tarefa para a API via POST
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto })
  });
  const nova = await res.json(); // recebe a nova tarefa criada

  // Cria o item visual da tarefa e adiciona à lista
  const lista = document.getElementById("lista");
  const item = criarItemTarefa(
    nova.texto,
    nova.concluido == 1,
    nova.criadaEm,
    nova.concluidaEm,
    nova.id
  );
  lista.appendChild(item);

  // Limpa o campo de entrada e atualiza contador/gráfico
  document.getElementById("nova-tarefa").value = "";
  atualizarContador();
}

// Função para criar o elemento visual de uma tarefa
function criarItemTarefa(texto, concluido = false, criadaEm = null, concluidaEm = null, id = null) {
  const item = document.createElement('li');
  item.className = 'task';

  // Elemento decorativo
  const dot = document.createElement('span');
  dot.className = 'dot';

  // Texto da tarefa
  const spanText = document.createElement('span');
  spanText.className = 'text';
  spanText.textContent = texto;

  // Informações de criação/conclusão
  const info = document.createElement('div');
  info.className = 'info';
  const dataCriacao = criadaEm || new Date().toLocaleDateString();
  info.innerHTML = `<small>Criada em: ${dataCriacao}</small>`;
  if (concluido && concluidaEm) {
    info.innerHTML += `<br><small>Concluída em: ${concluidaEm}</small>`;
  }

  // Área de botões de ação
  const actions = document.createElement('div');
  actions.className = 'actions';

  // Botão para concluir tarefa
  const botaoConcluir = document.createElement('button');
  botaoConcluir.className = 'icon-btn complete';
  botaoConcluir.innerHTML = '<span class="dot-mini"></span> Concluir';
  botaoConcluir.onclick = async () => {
    await fetch(`${API}?id=${id}`, { method: "PUT" }); // atualiza no banco
    item.classList.toggle('concluido'); // alterna visual

    // Atualiza datas exibidas
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

  // Botão para remover tarefa
  const botaoRemover = document.createElement('button');
  botaoRemover.className = 'icon-btn remove';
  botaoRemover.innerHTML = '<span class="dot-mini"></span> Remover';
  botaoRemover.onclick = async () => {
    await fetch(`${API}?id=${id}`, { method: "DELETE" }); // remove do banco
    item.classList.add('removendo'); // animação
    setTimeout(() => {
      item.remove(); // remove do DOM
      atualizarContador();
    }, 280);
  };

  // Monta o item completo
  actions.appendChild(botaoConcluir);
  actions.appendChild(botaoRemover);
  item.appendChild(dot);
  item.appendChild(spanText);
  item.appendChild(actions);
  item.appendChild(info);

  // Aplica estilo se estiver concluída
  if (concluido) {
    item.classList.add('concluido');
    item.dataset.concluidaEm = concluidaEm || '';
  }
  item.dataset.criadaEm = dataCriacao;

  return item;
}

// Função para carregar todas as tarefas da API
async function carregarTarefas() {
  const lista = document.getElementById('lista');
  lista.innerHTML = ''; // limpa lista atual
  const res = await fetch(API); // requisição GET
  const tarefas = await res.json(); // recebe JSON

  // Cria cada item da lista
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

// Aplica o tema salvo (claro ou escuro)
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

// Aplica filtros de exibição de tarefas
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
      // Marca botão ativo
      botoesFiltro.forEach(b => b.classList.remove('ativo'));
      botao.classList.add('ativo');
    });
  });
}

// Inicializa a aplicação ao carregar a página
window.onload = () => {
  carregarTare
