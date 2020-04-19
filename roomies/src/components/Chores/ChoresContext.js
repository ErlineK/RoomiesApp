import React, { createContext, useReducer } from "react";
import choresReducer from "../../reducers/chores.reducer";

export const ChoresContext = createContext();

// const defaultData = {
//   isLoading: true,
//   isError: false,
//   chores: [
//     {
//       _id: 1,
//       leader: "Tenant 1",
//       task: "Do dishes",
//       dueDate: new Date(2020, 4, 30),
//       complete: false
//     },
//     {
//       _id: 2,
//       leader: "Tenant 1",
//       task: "Get toilet paper",
//       dueDate: new Date(2020, 4, 16),
//       complete: true
//     },
//     {
//       _id: 3,
//       leader: "Tenant 1",
//       task: "Save the world",
//       dueDate: new Date(2020, 4, 1),
//       complete: false
//     },
//     {
//       _id: 4,
//       leader: "Tenant 1",
//       task: "Sweep floor",
//       dueDate: new Date(2020, 3, 25),
//       complete: false
//     }
//   ]
// };

// export function ChoresProvider(props) {
//   const [choresState, choresDispatch] = useReducer(choresReducer, defaultData);

//   return (
//     <ChoresContext.Provider
//       value={{
//         choresState: choresState,
//         choresDispatch: choresDispatch
//       }}
//     >
//       {props.children}
//     </ChoresContext.Provider>
//   );
// }
