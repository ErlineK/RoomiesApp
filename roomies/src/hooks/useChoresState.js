import { useState } from "react";
import axios from "axios";

const CHORES_SERVICE_URL = "https://jsonplaceholder.typicode.com/users";
// const CHORES_SERVICE_URL = "http://localhost:8082/api/todos"

export default initialChores => {
  const [todos, setChores] = useState(initialChores);

  const getAllChores = () => {
    axios
      .get(CHORES_SERVICE_URL)
      .then(res => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch(err => {
        console.log("Error in getAllTodos: " + err);
      });
  };

  const addTodoToDB = todo => {
    const data = {
      task: todo,
      completed: false
    };

    axios
      .post("http://localhost:8082/api/todos", data)
      .then(res => {
        console.log("added todo successfully");
        getAllTodos();
      })
      .catch(err => {
        console.log("Error in CreateTodo!");
      });
  };

  const addTodo = newTodo => {
    // setTodos([...todos, { id: uuid(), task: newTodo, completed: false }]);
    addTodoToDB(newTodo);
  };

  const editTodo = (newTask, todoId) => {
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, task: newTask } : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = todoId => {
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const toggleTodo = todoId => {
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return [todos, addTodo, editTodo, removeTodo, toggleTodo, getAllTodos];
};
