import { useReducer } from "react";
import AppContext from "./AppContext";
import appReducer from "./appReducer";

const defaultAppState = {
  boards: [
    { id: 1, name: "Marketing Plan", href: "/marketing" },
    { id: 2, name: "Team Plan", href: "/team" },
    { id: 3, name: "Projects Plan", href: "/projects" },
  ],
  columns: [
    {
      id: 1,
      title: "Dashboard",
      boardId: 1,
      cards: [
        {
          id: 1,
          title: "Dashboard",
          description: "Dashboard",
          subtasks: {
            name: "Dashboard",
          },
        },
        {
          id: 2,
          title: "Dashboard",
          description: "Dashboard",
          subtasks: {
            name: "Dashboard",
          },
        },
        {
          id: 3,
          title: "Dashboard",
          description: "Dashboard",
          subtasks: {
            name: "Dashboard",
          },
        },
      ],
    },
    {
      id: 2,
      title: "Team",
      boardId: 1,
      cards: [
        {
          id: 4,
          title: "Dashboard",
          description: "Dashboard",
          subtasks: {
            name: "Dashboard",
          },
        },
      ],
    },
    {
      id: 3,
      title: "Projects",
      boardId: 2,
      cards: [
        {
          id: 5,
          title: "Dashboard",
          description: "Dashboard",
          subtasks: {
            name: "Dashboard",
          },
        },
        {
          id: 6,
          title: "Dashboard",
          description: "Dashboard",
          subtasks: {
            name: "Dashboard",
          },
        },
      ],
    },
    { id: 4, title: "Calendar", boardId: 2 ,cards:[]},
    { id: 5, title: "Reports", boardId: 3 ,cards:[]},
  ],
};

const AppContextProvider = (props) => {
  const [appState, dispatch] = useReducer(appReducer, defaultAppState);

  const addBoard = (data) => {
    dispatch({ type: "CreateBoard", data });
  };
  const setColumns = (data) => {
    dispatch({ type: "SetColumns", data });
  };

  const updateBoard = (id,data) => {
    dispatch({ type: "updateBoard", data:{id,data} });
  };
  

  const removeBoard = (id) => {
    dispatch({ type: "removeBoard", id });
  };
 

  const contextApp = {
    boards: appState.boards,
    columns: appState.columns,
    tasks: appState.tasks,
    addBoard,
    setColumns,
    updateBoard,
    removeBoard,
 
  };
  return (
    <AppContext.Provider value={contextApp}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
