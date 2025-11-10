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
    // remove listeners duplicados garantindo idempotência
    botao.replaceWith(botao.cloneNode(true));
  });

  const botoesAtualizados = document.querySelectorAll('.filtro');

  botoesAtualizados.forEach(botao => {
    botao.addEventListener('click', () => {
      const tipo = botao.dataset.filtro;
      const tarefas = document.querySelectorAll('.task');

      tarefas.forEach(tarefa => {
        if (tipo === 'todas') {
          tarefa.style.display = 'flex';
        } else if (tipo === 'pendentes') {
          tarefa.style.display = tarefa.classList.contains('concluido') ? 'none' : 'flex';
        } else if (tipo === 'concluidas') {
          tarefa.style.display = tarefa.classList.contains('concluido') ? 'flex' : 'none';
        }
      });

      // Atualiza botão ativo
      botoesAtualizados.forEach(b => b.classList.remove('ativo'));
      botao.classList.add('ativo');
    });
  });
}

// Inicialização segura quando DOM estiver pronto
window.onload = () => {
  // Aplica tema salvo e ajusta texto do botão caso exista
  aplicarTemaSalvo();

  // Atribui evento ao botão de tema com checagem de existência
  const botaoTema = document.getElementById('toggle-tema');
  if (botaoTema) {
    botaoTema.onclick = () => {
      document.body.classList.toggle('tema-claro');
      const temaAtual = document.body.classList.contains('tema-claro') ? 'claro' : 'escuro';
      localStorage.setItem('tema', temaAtual);
      botaoTema.textContent = temaAtual === 'claro' ? 'Tema Escuro' : 'Tema Claro';
    };
  }

  // Carrega tarefas (que por sua vez chama aplicarTemaSalvo e aplicarFiltros)
  if (typeof carregarTarefas === 'function') carregarTarefas();

  // Garante que filtros estejam ativos (idempotente)
  if (typeof aplicarFiltros === 'function') aplicarFiltros();
};
