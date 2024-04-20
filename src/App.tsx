import { useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { TasksContext } from "./context/ItemsContext";
import NotFound from "./pages/NotFound";
import { Task } from "./types/taskType";

const App = () => {
  const { setTasks, tasks } = useContext(TasksContext);

  // Function to add a new task
  const addTask = (newTask: Task) => {
    // passing the new state value directly to setTasks
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleSubmit = (myNewTask: Task) => {
    try {
      addTask(myNewTask);
    } catch (error) {
      console.log("error while adding this task");
    }
    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify([...tasks, myNewTask]));
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
          <Route path="/tasks" element={<TaskList {...{ tasks }} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
