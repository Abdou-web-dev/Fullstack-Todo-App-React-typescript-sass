import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Task } from "../types/taskType";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  // deleteTask: (taskName: string) => void;
}

export const TaskList: FunctionComponent<TaskListProps> = ({
  tasks,
  // deleteTask,
}) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.name + task.createdAt.toString()}
              task={task}
              // {...{ deleteTask }}
            ></TaskCard>
          ))
        ) : (
          <div>No tasks available</div>
        )}
      </div>
      <Link to="/" className="mt-4 text-blue-500">
        Back to Form
      </Link>
    </div>
  );
};
