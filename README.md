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
| `concluido`   | TINYINT(1)   | Ind
