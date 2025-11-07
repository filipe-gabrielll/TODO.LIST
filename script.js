function adicionarTarefa() {
  const input = document.getElementById('nova-tarefa');
  const lista = document.getElementById('lista');
  
  if (input.value.trim() !== '') {
    const item = document.createElement('li');
    item.textContent = input.value;

    // Criar botão de remover
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = "❌";
    botaoRemover.style.marginLeft = "10px";

    // Ao clicar, aplica a animação e remove depois
    botaoRemover.onclick = () => {
      item.classList.add('removendo');
      setTimeout(() => item.remove(), 300); // espera 0.3s
    };

    item.appendChild(botaoRemover);
    lista.appendChild(item);

    // Limpa o campo de texto
    input.value = '';
  }
}

function adicionarTarefa() {
  const input = document.getElementById('nova-tarefa');
  const lista = document.getElementById('lista');
  
  if (input.value.trim() !== '') {
    const item = document.createElement('li');
    item.textContent = input.value;

    // Botão de concluir
    const botaoConcluir = document.createElement('button');
    botaoConcluir.textContent = "✅";
    botaoConcluir.style.marginLeft = "10px";
    botaoConcluir.onclick = () => {
      item.classList.toggle('concluido'); // adiciona ou remove a classe
    };

    // Botão de remover
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = "❌";
    botaoRemover.style.marginLeft = "10px";
    botaoRemover.onclick = () => {
      item.classList.add('removendo');
      setTimeout(() => item.remove(), 300);
    };

    // Adiciona os botões ao item
    item.appendChild(botaoConcluir);
    item.appendChild(botaoRemover);

    lista.appendChild(item);
    input.value = '';
  }
}

function salvarTarefas() {
  const lista = document.getElementById('lista');
  const tarefas = [];
  
  // percorre todos os <li> e guarda o texto e se está concluído
  lista.querySelectorAll('li').forEach(item => {
    tarefas.push({
      texto: item.firstChild.textContent, // pega o texto da tarefa
      concluido: item.classList.contains('concluido') // verifica se está riscada
    });
  });

  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
  const lista = document.getElementById('lista');
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

  tarefas.forEach(tarefa => {
    const item = document.createElement('li');
    item.textContent = tarefa.texto;

    if (tarefa.concluido) {
      item.classList.add('concluido');
    }

    // Botão de concluir
    const botaoConcluir = document.createElement('button');
    botaoConcluir.textContent = "✅";
    botaoConcluir.style.marginLeft = "10px";
    botaoConcluir.onclick = () => {
      item.classList.toggle('concluido');
      salvarTarefas();
    };

    // Botão de remover
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = "❌";
    botaoRemover.style.marginLeft = "10px";
    botaoRemover.onclick = () => {
      item.classList.add('removendo');
      setTimeout(() => {
        item.remove();
        salvarTarefas();
      }, 300);
    };

    item.appendChild(botaoConcluir);
    item.appendChild(botaoRemover);
    lista.appendChild(item);
  });
}

function adicionarTarefa() {
  const input = document.getElementById('nova-tarefa');
  const lista = document.getElementById('lista');
  
  if (input.value.trim() !== '') {
    const item = document.createElement('li');
    item.textContent = input.value;

    // Botão de concluir
    const botaoConcluir = document.createElement('button');
    botaoConcluir.textContent = "✅";
    botaoConcluir.style.marginLeft = "10px";
    botaoConcluir.onclick = () => {
      item.classList.toggle('concluido');
      salvarTarefas();
    };

    // Botão de remover
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = "❌";
    botaoRemover.style.marginLeft = "10px";
    botaoRemover.onclick = () => {
      item.classList.add('removendo');
      setTimeout(() => {
        item.remove();
        salvarTarefas();
      }, 300);
    };

    item.appendChild(botaoConcluir);
    item.appendChild(botaoRemover);
    lista.appendChild(item);

    input.value = '';
    salvarTarefas(); // salva após adicionar
  }
}
window.onload = carregarTarefas;
