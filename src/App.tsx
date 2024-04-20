import { useContext, useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { TasksContext } from "./context/ItemsContext";
import NotFound from "./pages/NotFound";
import { Task } from "./types/taskType";

const App = () => {
  const { setTasks, tasks } = useContext(TasksContext);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const { pathname } = location;

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
    // Save tasks to local storage to persist the tasks state after page refreshes
    localStorage.setItem("tasks", JSON.stringify([...tasks, myNewTask]));
  };

  const filteredTasks: Task[] = useMemo(() => {
    return tasks.filter((task) => {
      const normalizedQuery = searchQuery?.toLowerCase();
      const normalizedTaskName = task?.name?.toLowerCase();

      // Check if the task name contains the search query
      if (normalizedTaskName?.includes(normalizedQuery)) {
        return true;
      }

      // Check if any of the task's status flags match the search query
      if (
        (task.ongoing && "ongoing"?.includes(normalizedQuery)) ||
        (task.isValidated && "validated"?.includes(normalizedQuery)) ||
        (task.isDone && "done"?.includes(normalizedQuery))
      ) {
        return true;
      }

      return false;
      //If none of the conditions above are met, the task is filtered out and not included in the filteredTasks array.
    });
  }, [tasks, searchQuery]);

  // the code in this useEffect first tries to load updatedTask, and if that fails, it tries to load updatedTasksStatus.
  // then if that fails again, it tries to load tasks.
  // If neither are found, it initializes tasks as an empty array.
  useEffect(() => {
    // Check if there is an updated single task
    const updatedStoredTask = localStorage.getItem("updatedTask");

    // Check if there are updated tasks (multiple tasks)
    const updatedStoredTasks = localStorage.getItem("updatedTasksStatus");

    if (updatedStoredTask && updatedStoredTasks) {
      console.log(
        "there are both tasks which name has been changed, and tasks which status has been changed in local storage"
      );
      // Merge and update tasks
      const updatedTask = JSON.parse(updatedStoredTask);
      const updatedTasksStatus = JSON.parse(updatedStoredTasks);

      // Find the task in updatedTasksStatus and update its name
      const mergedTasks = updatedTasksStatus.map((statusTask: Task) => {
        if (statusTask.name === updatedTask.name) {
          return { ...updatedTask, ...statusTask }; // Merge the updatedTask and statusTask
        }
        return statusTask;
      });

      setTasks(mergedTasks);
      return; // Exit early to prevent loading from the old "tasks" key
    }

    if (updatedStoredTask) {
      setTasks(JSON.parse(updatedStoredTask));

      return; // Exit early to prevent loading from the old "tasks" key
    }

    if (updatedStoredTasks) {
      setTasks(JSON.parse(updatedStoredTasks));

      return; // Exit early to prevent loading from the old "tasks" key
    }

    // fallback
    // Check for tasks in localStorage
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      // the fallback behavior when the 2 conditions above are both not met
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks([]);
      console.log("No tasks found in localStorage.");
    }
  }, []);

  return (
    <div className="my-task-app">
      {tasks?.length > 0 && pathname === "/tasks" ? (
        <input
          type="text"
          placeholder="Search tasks by name or status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search__input border rounded px-2 py-1 mb-4 w-1/4 h-10"
        />
      ) : null}
      <Routes>
        <Route path="/" element={<TaskForm onSubmit={handleSubmit} />} />
        <Route
          path="/tasks"
          element={<TaskList {...{ tasks, searchQuery, filteredTasks }} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
