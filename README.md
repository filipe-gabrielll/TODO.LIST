# 📌 TODO.LIST 📝

Uma aplicação simples e elegante para organizar seu dia.  
Este projeto foi desenvolvido em **HTML, CSS e JavaScript**, com foco em produtividade e experiência do usuário.

## ✨ Funcionalidades
- Adicionar novas tarefas com facilidade
- Marcar tarefas como concluídas ou removê-las
- Contador automático de tarefas pendentes e concluídas
- Filtros para visualizar **Todas**, **Pendentes** ou **Concluídas**
- Alternar entre **Tema Escuro** e **Tema Claro**
- Persistência de dados com **LocalStorage** (suas tarefas ficam salvas mesmo após fechar o navegador)
- 📊 Gráfico dinâmico mostrando a proporção de tarefas pendentes e concluídas (usando Chart.js)

## 🚀 Tecnologias utilizadas
- **HTML5** para estrutura
- **CSS3** para estilo e responsividade
- **JavaScript** para lógica e interatividade
- **Chart.js** para visualização gráfica
- (Opcional) **MySQL + PHP** se desejar integrar com banco de dados

## 🎯 Objetivo
Facilitar a organização pessoal com uma interface intuitiva, moderna e visualmente agradável.  
Ideal para quem busca simplicidade sem abrir mão de recursos úteis.

## 📂 Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/filipe-gabrielll/TODO.LIST.git

Abra a pasta do projeto.

Se estiver usando servidor local (como XAMPP):

Copie os arquivos para a pasta htdocs.

Inicie os serviços Apache e MySQL no painel do XAMPP.

Caso contrário:

Basta abrir o arquivo index.html diretamente no navegador.

2. Como usar
Abra o arquivo index.html em seu navegador.

Adicione suas tarefas e aproveite todos os recursos disponíveis:

Criar novas tarefas

Marcar como concluídas

Remover tarefas

Filtrar por Todas, Pendentes ou Concluídas

Alternar entre Tema Escuro e Tema Claro

Visualizar estatísticas no gráfico dinâmico

3. Estrutura do Banco (opcional)
Se desejar integrar com banco de dados (MySQL), configure:

Crie um banco de dados chamado todo_list.

Crie a tabela tasks com os seguintes campos:

id (chave primária, auto incremento)

title (título da tarefa)

description (descrição)

status (pendente ou concluída)

created_at (data de criação)

Exemplo de script SQL:

CREATE DATABASE todo_list;

USE todo_list;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pendente','concluída') DEFAULT 'pendente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Licença
Este projeto está sob a licença MIT – fique à vontade para usar e modificar.
