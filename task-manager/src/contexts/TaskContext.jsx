import { createContext, useReducer, useEffect, useState } from "react";
import { taskReducer, initialState} from "../reducers/taskReducer";

const TASK_LIST = "taskMgr.TasksList";

export const TaskContext = createContext();

export function TaskProvider({children}){
  const [currTasks, setCurrTasks] = useState(() => {
    const storedTasks = localStorage.getItem(TASK_LIST);
    return storedTasks ? {tasks:JSON.parse(storedTasks), filter: 'all', priorityFilter: 'all'} : initialState;
  });

  const [state, dispatch] = useReducer(taskReducer, currTasks)
  const {tasks, filter, priorityFilter} = state;
  const filteredTasks = tasks.filter((t) => filter.toLowerCase() === "all" || t.status.toLowerCase() === filter.toLowerCase()).filter((t) => priorityFilter.toLowerCase() === "all" || t.priority.toLowerCase() === priorityFilter.toLowerCase());

  useEffect(() => {
    localStorage.setItem(TASK_LIST, JSON.stringify(tasks));
    console.log("Tasks updated in localStorage:", tasks.length);
    const storedTasks = localStorage.getItem(TASK_LIST);
    console.log("Stored tasks in localStorage:", JSON.parse(storedTasks).length);
  }, [tasks]);

  const addTask = async (TaskData) =>
  {
      dispatch({type: "ADD_TASK", payload: TaskData});
  }
  const deleteTask = async (TaskId) =>
  {
      dispatch({type: "DELETE_TASK", payload: TaskId});
  }
  const setFilter = async (filter) =>
  {
      dispatch({type: "SET_FILTER", payload: filter});
  }
  const setPriorityFilter = async (priorityFilter) =>
  {
      console.log("Setting priority filter to:", priorityFilter);
      dispatch({type: "SET_PRIORITY_FILTER", payload: priorityFilter});
  }

  const updateTask = async (updatedTask) => {
    dispatch({ type: "UPDATE_TASK", payload: updatedTask });
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        filter,
        priorityFilter,
        addTask,
        deleteTask,
        setFilter,
        setPriorityFilter,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}