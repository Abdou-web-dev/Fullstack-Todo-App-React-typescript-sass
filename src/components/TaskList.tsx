import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Task } from "../types/taskType";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  filteredTasks: Task[];
  searchQuery: string;
}

export const TaskList: FunctionComponent<TaskListProps> = ({
  tasks,
  filteredTasks,
  searchQuery,
}) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      {/* <div className="mb-10 grid grid-cols-1 md:grid-cols-5 gap-4"> */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {searchQuery ? (
          <>
            {filteredTasks?.length > 0 ? (
              filteredTasks.map((filteredTask) => (
                <TaskCard
                  key={filteredTask.name + filteredTask.createdAt.toString()}
                  task={filteredTask}
                ></TaskCard>
              ))
            ) : (
              <p className="flex">No tasks were found</p>
            )}
          </>
        ) : tasks?.length > 0 ? (
          tasks.map((task, index) => (
            <TaskCard
              key={task.name + task.createdAt.toString() + index}
              task={task}
            ></TaskCard>
          ))
        ) : (
          <p className="flex">No tasks yet !</p>
        )}
      </div>
      <Link
        to="/"
        className=" px-4 py-2 bg-blue-500 text-white rounded hover:text-white"
      >
        Back to Form
      </Link>
    </div>
  );
};
