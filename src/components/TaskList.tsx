import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Task } from "../types/taskType";

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: FunctionComponent<TaskListProps> = ({ tasks }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {tasks?.map((task) => (
          <div key={task.createdAt.toString()} className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">{task.name}</h2>
            <p className="text-gray-600">{task.description}</p>
          </div>
        ))}
      </div>
      <Link to="/" className="mt-4 text-blue-500">
        Back to Form
      </Link>
    </div>
  );
};
