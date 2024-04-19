import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import NotFound from "./pages/NotFound";
import { Task } from "./types/taskType";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSubmit = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  // By choosing newStatus, it becomes clearer that this parameter represents the new status that the user wants to set for the task.
  const onUpdateStatus = (
    newStatus: "isValidated" | "isDone" | "ongoing" = "ongoing",
    taskName: string
  ) => {
    const updatedTasks = tasks?.map((task) => {
      // This logic ensures that we are only updating the status of the task that matches the provided taskName, and all other tasks remain unchanged.
      if (task.name === taskName) {
        // Check if the task can be marked as "Done"
        if (newStatus === "isDone" && !task.isValidated) {
          return task; // If not validated, don't change the task status
        }

        return {
          ...task,
          isDone: newStatus === "isDone" ? !task.isDone : task.isDone,
          isValidated:
            newStatus === "isValidated" ? !task.isValidated : task.isValidated,
          ongoing: newStatus === "ongoing" ? !task.ongoing : task.ongoing,
        };
        // So, when updating the status of a task, we compare the newStatus to the current status of the task (task.isDone, task.isValidated, or task.ongoing) to determine how to update it.
      } else return task;
    });
    // Update the state with the updatedTasks
    setTasks(updatedTasks || []);
    return newStatus;
  };

  useEffect(() => {
    // when the App component mounts, it will check local storage for any stored tasks and populate the tasks state accordingly.
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      console.log("JSON.parse(storedTasks):", JSON.parse(storedTasks)); // Debugging line
    } else setTasks([]);
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TaskForm onSubmit={handleSubmit} />} />
          <Route
            path="/tasks"
            element={<TaskList {...{ tasks, onUpdateStatus }} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
