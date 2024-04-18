import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import NotFound from "./pages/NotFound";
import { Task } from "./types/taskType";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSubmit = (newTask: Task) => {
    // Ajouter la nouvelle tâche à la liste des tâches
    console.log("handleSubmit from parent component called");
    // setTasks([...tasks, newTask]);
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  useEffect(() => {
    // when the App component mounts, it will check local storage for any stored tasks and populate the tasks state accordingly.
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else setTasks([]);
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TaskForm onSubmit={handleSubmit} />} />
          <Route path="/tasks" element={<TaskList {...{ tasks }} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
