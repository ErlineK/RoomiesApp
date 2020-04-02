import { useState } from "react";
import axios from "axios";
import useGetData from "./useGetData";

const BASE_URI_CHORES = "http://localhost:8082/api/Chores";

export default initialChores => {
  //   const [chores, setChores] = useState(initialChores);
  const [{ chores, isLoading, isError }, setRequest] = useGetData(
    { reqUri: BASE_URI_CHORES, reqType: "get", reqData: null },
    initialChores
  );

  const getAllChores = () => {
    setRequest({ reqUri: BASE_URI_CHORES, reqType: "get", reqData: null });
    // axios
    //   .get(BASE_URI_CHORES)
    //   .then(res => {
    //     console.log(res.data);
    //     setChores(res.data);
    //   })
    //   .catch(err => {
    //     console.log("Error in getAllChores: " + err);
    //   });
  };

  const addChoreToDB = chore => {
    const data = {
      task: chore,
      completed: false
    };

    axios
      .post(BASE_URI_CHORES, data)
      .then(res => {
        console.log("added chore successfully");
        getAllChores();
      })
      .catch(err => {
        console.log("Error in CreateChore!");
      });
  };

  const addChore = newChore => {
    // setChores([...Chores, { id: uuid(), task: newChore, completed: false }]);
    addChoreToDB(newChore);
  };

  const editChore = (newTask, choreId) => {
    const updatedChores = chores.map(chore =>
      chore.id === choreId ? { ...chore, task: newTask } : chore
    );
    // setChores(updatedChores);
  };

  const removeChore = choreId => {
    const updatedChores = chores.filter(chore => chore.id !== choreId);
    // setChores(updatedChores);
  };

  const toggleChore = choreId => {
    const updatedChores = chores.map(chore =>
      chore.id === choreId ? { ...chore, completed: !chore.completed } : chore
    );
    // setChores(updatedChores);
  };

  const choresActions = [
    addChore,
    editChore,
    removeChore,
    toggleChore,
    getAllChores
  ];

  const requestStatus = [isLoading, isError];

  return [chores, choresActions, requestStatus];
};
