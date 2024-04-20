import React, { useState } from "react";
import { Task } from "../types/taskType";

export interface TasksContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
export const TasksContext = React.createContext<TasksContextType>({
  tasks: [],
  setTasks: () => {},
});

export const TasksContextProvider = ({
  children,
}: {
  children: React.ReactNode | JSX.Element | JSX.Element[];
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
