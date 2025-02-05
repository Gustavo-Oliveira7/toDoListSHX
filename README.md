# 📌 To-Do List App

Um aplicativo de lista de tarefas feito com **React Native**, que permite adicionar, marcar como concluído e excluir tarefas. As tarefas são salvas localmente usando **AsyncStorage**.

## 🎯 Funcionalidades

✅ Adicionar novas tarefas  
✅ Marcar tarefas como concluídas (com **riscado no texto**)  
✅ Excluir tarefas com **confirmação**  
✅ **Salvar e carregar** tarefas do **AsyncStorage**  
✅ Buscar tarefas iniciais de uma **API externa** (`linkTodo`) caso não haja tarefas salvas  

---

## 🛠 Tecnologias Utilizadas

- **React Native**  
- **Expo**  
- **AsyncStorage** (para salvar tarefas localmente)  
- **FlatList** (para renderizar a lista de tarefas)  
- **React Hooks** (`useState`, `useEffect`)  

---

## 🚀 Instalação e Execução

1. **Clone o repositório:**  
```sh
git clone https://github.com/seu-usuario/toDoListSHX.git
cd toDoListSHX
```

2. **Instale as dependências:**  
```sh
npm install
```
ou  
```sh
yarn install
```

3. **Inicie o projeto:**  
```sh
npm start
```
ou  
```sh
yarn start
```

> **Obs.:** Certifique-se de ter o **Expo CLI** instalado (`npm install -g expo-cli`).  

---

## 📂 Estrutura do Projeto

```
/src
  ├── components
  │   ├── TaskInput.js  # Componente do input + botão de envio
  │   ├── DeleteButton.js  # Botão de deletar tarefa
  │   ├── Checkbox.js  # Checkbox para marcar tarefas como concluídas
  ├── screens
  │   ├── Task.js  # Tela principal do app
  ├── App.js  # Arquivo principal do projeto

```
---

## 📝 Como Usar

1. **Adicione uma nova tarefa** digitando no campo e clicando em "Enviar".  
2. **Marque uma tarefa como concluída** tocando no checkbox.  
3. **Exclua uma tarefa** clicando no ícone de lixeira e confirmando a exclusão.  
4. **As tarefas são salvas automaticamente** e permanecem mesmo após fechar o app.  



## 👨‍💻 Contribuindo

Se quiser contribuir com melhorias:  

1. **Faça um fork do projeto**  
2. **Crie uma branch para sua feature:**  
   ```sh
   git checkout -b minha-feature
   ```
3. **Faça suas alterações e commit:**  
   ```sh
   git commit -m "Adicionei uma nova funcionalidade"
   ```
4. **Envie para o GitHub:**  
   ```sh
   git push origin minha-feature
   ```
5. **Abra um Pull Request** 🎉  

---
