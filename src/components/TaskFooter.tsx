import { FunctionComponent, useContext } from "react";
import expand_icon from "../assets/img/add.svg";
import delete_icon from "../assets/img/delete.svg";
import settings_icon from "../assets/img/modify.svg";

import { TasksContext } from "../context/ItemsContext";
import { Task } from "../types/taskType";
import TaskIconWithTooltip from "./TaskIconWithTooltip";

interface TaskFooterProps {
  task: Task;
  cardLabel: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskFooter: FunctionComponent<TaskFooterProps> = ({
  task: currentTask,
  cardLabel,
  setIsOpen,
}) => {
  const { setTasks, tasks } = useContext(TasksContext);
  // const [deleteTaskTool, setDeleteTaskTool] = useState(false); //import stands from important
  // const [changeNameTaskTool, setchangeNameTaskTool] = useState(false); //import stands from important

  // Function to modify a task's title by its name
  const changeTaskName = (taskName: string, newTaskName: string) => {
    setTasks(
      tasks?.map((task) => {
        if (task.name === taskName) {
          return { ...task, name: newTaskName };
        }
        return task;
      })
    );
  };

  function handleExpandClick(): void {
    // efefmeffefe
  }

  return (
    <div className="absolute bottom-2 right-2 flex flex-col items-end mt-4">
      {/* Ongoing Status */}
      {currentTask.ongoing ? (
        <span className="mb-2 text-xs text-gray-400 ">{cardLabel}</span>
      ) : null}

      <div className="flex gap-0 ">
        <TaskIconWithTooltip
          src={expand_icon}
          onClick={handleExpandClick}
          tooltipContent="Expand this task"
        />
        <TaskIconWithTooltip
          src={settings_icon}
          onClick={() => changeTaskName(currentTask.name, "test 00")}
          tooltipContent="Modify this task"
        />
        {/* Delete Icon */}
        <TaskIconWithTooltip
          src={delete_icon}
          onClick={() => setIsOpen(true)}
          tooltipContent="Delete this task"
        />
      </div>
    </div>
  );
};

export default TaskFooter;
