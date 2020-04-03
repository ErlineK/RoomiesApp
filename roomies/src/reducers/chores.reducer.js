// import axios from "axios";

// const BASE_URL = "http://localhost:8082/api";
// const ADD_CHORE = "/chores/addChore"; // WS to return new chore with id
// const EDIT_CHORE = "/chores/editChore"; // WS to return updated chore
// const CHORES_SERVICE_URL = "/chores";

// const choresReducer = (state, action) => {
//   switch (action.type) {
//     case "ALL":
//       //   axios
//       //     .get(CHORES_SERVICE_URL)
//       //     .then(res => {
//       //       console.log("got all chores");
//       //       return {
//       //         ...state,
//       //         chores: res.chores,
//       //         isLoading: false,
//       //         isError: false
//       //       };
//       //     })
//       //     .catch(err => {
//       //       console.log("Error in getAllChores! " + err);
//       //       console.log(state);
//       //       console.log(action.payload);
//       //       console.log({
//       //         ...state,
//       //         chores: action.payload,
//       //         isLoading: false,
//       //         isError: true
//       //       });
//       //       return {
//       //         ...state,
//       //         chores: action.payload,
//       //         isLoading: false,
//       //         isError: true
//       //       };
//       //     });
//       console.log("getting all chores in reducer");
//       return {
//         ...state,
//         isLoading: false,
//         isError: false
//       };

//       break;

//     case "ADD":
//       const data = {
//         task: action.task,
//         leader: action.leader,
//         dueDate: action.dueDate,
//         complete: false
//       };

//       axios
//         .post(`${BASE_URL}${ADD_CHORE}`, data)
//         .then(res => {
//           console.log("added chore successfully");
//           return {
//             ...state,
//             isLoading: false,
//             isError: false,
//             chores: [
//               ...state.chores,
//               {
//                 _id: res._id,
//                 leader: res.leader,
//                 task: res.task,
//                 dueDate: res.dueDate,
//                 complete: false
//               }
//             ]
//           };
//         })
//         .catch(err => {
//           console.log("Error in CreateChore! " + err);
//           return {
//             ...state,
//             isLoading: false,
//             isError: true
//           };
//         });

//       break;

//     case "REMOVE":
//       //   return chores.filter(chore => chore.id !== action.id);
//       return state;
//       break;
//     case "TOGGLE":
//       const toggleData = {
//         complete: !action.complete
//       };

//       axios
//         .post(`${BASE_URL}${EDIT_CHORE}/${action._id}`, toggleData)
//         .then(res => {
//           console.log("edited chore successfully");
//           const updatedChores = state.chores.map(chore =>
//             chore._id === res._id
//               ? {
//                   ...chore,
//                   complete: res.complete
//                 }
//               : chore
//           );
//           return {
//             ...state,
//             isLoading: false,
//             isError: false,
//             chores: updatedChores
//           };
//         })
//         .catch(err => {
//           console.log("Error in toggleChore! " + err);
//           console.log(state);
//           return {
//             ...state,
//             isLoading: false,
//             isError: true
//           };
//         });

//       break;

//     case "EDIT":
//       //   return chores.map(chore =>
//       //     chore.id === action.id ? { ...chore, task: action.newTask } : chore
//       //   );
//       const editData = {
//         task: action.task,
//         leader: action.leader,
//         dueDate: action.dueDate,
//         complete: action.complete
//       };

//       axios
//         .post(`${BASE_URL}${EDIT_CHORE}/${action._id}`, editData)
//         .then(res => {
//           console.log("edited chore successfully");
//           const editedChores = state.chores.map(chore =>
//             chore._id === res._id
//               ? {
//                   ...chore,
//                   leader: res.leader,
//                   task: res.task,
//                   dueDate: res.dueDate,
//                   complete: res.complete
//                 }
//               : chore
//           );
//           return {
//             ...state,
//             isLoading: false,
//             isError: false,
//             chores: editedChores
//           };
//         })
//         .catch(err => {
//           console.log("Error in EditChore! " + err);
//           return {
//             ...state,
//             isLoading: false,
//             isError: true
//           };
//         });
//       break;

//     default: {
//       return {
//         ...state
//       };
//       break;
//     }
//   }
// };
// export default choresReducer;
