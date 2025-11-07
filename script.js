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
    botaoRemover.onclick = () => item.remove();

    item.appendChild(botaoRemover);
    lista.appendChild(item);
    input.value = '';
  }
}

