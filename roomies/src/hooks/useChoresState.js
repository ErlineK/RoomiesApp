import axios from "axios";
import useGetData from "./useGetData";

// const BASE_URI_CHORES = "http://localhost:8082/api/Chores";
const BASE_URI_CHORES = "https://jsonplaceholder.typicode.com/users";

export default initialChores => {
  // const [chores, setChores] = useState(initialChores);
  const [{ data, isLoading, isError }, setRequest] = useGetData(
    { reqUri: BASE_URI_CHORES, reqType: "get", reqData: null },
    initialChores
  );

  const getAllChores = () => {
    console.log("calling getAllChores from useChoresState");
    setRequest({ reqUri: BASE_URI_CHORES, reqType: "get", reqData: null });
    // axios
    //   .get(BASE_URI_CHORES)
    //   .then(res => {
    //     console.log("got resonse: " + res.data);
    //     // setChores(res.data);
    //     // setChores(initialChores);
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
    // const updatedChores = data.chores.map(chore =>
    //   chore.id === choreId ? { ...chore, task: newTask } : chore
    // );
    // setChores(updatedChores);
  };

  const removeChore = choreId => {
    // const updatedChores = data.chores.filter(chore => chore.id !== choreId);
    // setChores(updatedChores);
  };

  const toggleChore = choreId => {
    // const updatedChores = data.chores.map(chore =>
    //   chore.id === choreId ? { ...chore, completed: !chore.completed } : chore
    // );
    console.log("toggling chore with id " + choreId);
    // setChores(updatedChores);
  };

  const choresActions = {
    addChore: addChore,
    editChore: editChore,
    removeChore: removeChore,
    toggleChore: toggleChore,
    getAllChores: getAllChores
  };

  // const requestStatus = [isLoading, isError];
  const requestStatus = { isLoading: isLoading, isError: isError };

  return [data.chores, choresActions, requestStatus];
};
