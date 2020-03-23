import { useState } from "react";
import axios from "axios";

const CHORES_SERVICE_URL = "https://jsonplaceholder.typicode.com/users";
// const CHORES_SERVICE_URL = "http://localhost:8082/api/chores"

export default initialChores => {
  const [chores, setChores] = useState(initialChores);

  const getAllChores = () => {
    axios
      .get(CHORES_SERVICE_URL)
      .then(res => {
        console.log(res.data);
        setChores(res.data);
      })
      .catch(err => {
        console.log("Error in getAllChores: " + err);
      });
  };

  const addChoreToDB = chore => {
    const data = {
      task: chore,
      completed: false
    };

    axios
      .post(CHORES_SERVICE_URL, data)
      .then(res => {
        console.log("added chore successfully");
        getAllChores();
      })
      .catch(err => {
        console.log("Error in CreateChore!");
      });
  };

  const addChore = newChore => {
    // setChoress([...chores, { id: uuid(), task: newChore, completed: false }]);
    addChoreToDB(newChore);
  };

  const editChore = (newTask, choreId) => {
    const updatedChores = chores.map(chore =>
      chore.id === choreId ? { ...chore, task: newTask } : chore
    );
    setChores(updatedChores);
  };

  const removeChore = choreId => {
    const updatedChores = chores.filter(chore => chore._id !== choreId);
    setChores(updatedChores);
  };

  const toggleChore = choreId => {
    const updatedChores = chores.map(chore =>
      chore.id === choreId ? { ...chore, completed: !chore.completed } : chore
    );
    setChores(updatedChores);
  };

  return [chores, addChore, editChore, removeChore, toggleChore, getAllChores];
};
