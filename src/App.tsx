import { useState } from "react";
import { TaskForm } from "./components/TaskForm";
import { Task } from "./types/taskType";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSubmit = (newTask: Task) => {
    // Ajouter la nouvelle tâche à la liste des tâches
    console.log("handleSubmit from parent component called");
    setTasks([...tasks, newTask]);

    // ajouter ici la logique pour enregistrer les données dans le stockage
  };

  return (
    <div>
      <h1>Ma To-Do List</h1>
      <TaskForm onSubmit={handleSubmit} />
      {/* Afficher la liste des tâches ici */}
    </div>
  );
};

export default App;
