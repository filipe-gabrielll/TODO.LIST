# 📌 TODO.LIST 📝

Uma aplicação web simples, elegante e funcional para organizar seu dia.  
Desenvolvida com foco em produtividade, clareza e experiência do usuário.

---

## ✨ Funcionalidades

- ✅ Adicionar novas tarefas com facilidade  
- ✅ Marcar tarefas como concluídas ou removê-las  
- ✅ Contador automático de tarefas pendentes e concluídas  
- ✅ Filtros para visualizar **Todas**, **Pendentes** ou **Concluídas**  
- ✅ Alternar entre **Tema Escuro** e **Tema Claro**  
- ✅ Persistência de dados com **LocalStorage**  
- ✅ 📊 Gráfico dinâmico mostrando a proporção de tarefas (via Chart.js)  
- ✅ Integração com **API em PHP** e **banco de dados MySQL** (modo servidor)

---

## 🚀 Tecnologias utilizadas

- **HTML5** — estrutura da interface  
- **CSS3** — estilo visual e responsividade  
- **JavaScript** — lógica e interatividade  
- **Chart.js** — visualização gráfica de tarefas  
- **PHP** — API REST para comunicação com o banco  
- **MySQL** — armazenamento das tarefas

---

## 🎯 Objetivo

Facilitar a organização pessoal com uma interface moderna, intuitiva e visualmente agradável.  
Ideal para quem busca simplicidade sem abrir mão de recursos úteis e integração com banco de dados.

---

## 🗃️ Estrutura do banco de dados

Tabela: `tarefas`

| Campo         | Tipo         | Descrição                          |
|---------------|--------------|------------------------------------|
| `id`          | INT (PK)     | Identificador único da tarefa      |
| `texto`       | VARCHAR(255) | Descrição da tarefa                |
| `concluido`   | TINYINT(1)   | Indica se a tarefa foi concluída  |
| `criadaEm`    | DATE         | Data de criação da tarefa          |
| `concluidaEm` | DATE         | Data de conclusão (se houver)     |

---

## 📊 Fluxograma da aplicação

```text
[Usuário digita tarefa] 
        ↓
[Botão "Adicionar" é clicado]
        ↓
[JavaScript envia POST para API]
        ↓
[API insere tarefa no banco de dados]
        ↓
[API retorna JSON com dados da tarefa]
        ↓
[JavaScript atualiza a lista na tela]
        ↓
[Usuário pode concluir ou remover tarefa]
        ↓
[JavaScript envia PUT ou DELETE para API]
        ↓
[API atualiza ou remove no banco]
        ↓
[Lista e gráfico são atualizados]

📂 Instalação
🔧 Modo servidor (XAMPP)


Clone o repositório:
git clone https://github.com/filipe-gabrielll/TODO.LIST.git
Copie os arquivos para a pasta htdocs do XAMPP.
Inicie os serviços Apache e MySQL no painel do XAMPP.
Acesse o phpMyAdmin e crie o banco lista_tarefas.
Importe o arquivo lista-bdd.sql para criar a tabela e os dados.


Acesse no navegador:
Código
Copiar
http://localhost/tarefas-api/index.php
🖥️ Modo local (sem servidor)
Apenas para testes com LocalStorage (sem banco de dados)
Abra o arquivo index.html diretamente no navegador.
As tarefas serão salvas no navegador via LocalStorage.

📎 Créditos
Desenvolvido por Filipe Gabriell  
Projeto acadêmico — disciplina de Programação Web
