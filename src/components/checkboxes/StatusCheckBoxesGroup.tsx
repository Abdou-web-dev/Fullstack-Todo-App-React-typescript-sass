import { FunctionComponent, useContext, useState } from "react";
import { TasksContext } from "../../context/ItemsContext";
import { Task } from "../../types/taskType";
import Tooltip from "../Tooltip";

interface StatusCheckBoxesGroupProps {
  task: Task;
  setCardLabel: React.Dispatch<React.SetStateAction<string>>;
}

const StatusCheckBoxesGroup: FunctionComponent<StatusCheckBoxesGroupProps> = ({
  task,
  setCardLabel,
}) => {
  let show_valid_tooltip = task.ongoing && !task.isDone && !task.isValidated;
  let show_done_tooltip = task.ongoing && !task.isDone && task.isValidated;
  const { setTasks, tasks } = useContext(TasksContext);

  const [unvalidateTooltip, setUnvalidateTooltip] = useState(false);

  // By choosing newStatus, it becomes clearer that this parameter represents the new status that the user wants to set for the task.
  const updateTaskStatus = (
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

  return (
    <div className=" flex items-center mt-4">
      {/* Status Checkboxes */}
      {/* Validated Checkbox */}
      <div className="relative group">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={task.isValidated}
            onChange={() => {
              // Prevent unchecking the checkbox if isDone is true
              // With this implementation, the isValidated checkbox cannot be unchecked unless the isDone checkbox is unchecked first.
              if (task.isDone) {
                setUnvalidateTooltip(true);
                setTimeout(() => {
                  setUnvalidateTooltip(false);
                }, 2000); // Hide the tooltip after 2 seconds
                return;
              }
              updateTaskStatus("isValidated", task.name);
              setCardLabel("");
            }}
            className="form-checkbox text-blue-500 "
          />

          <Tooltip
            {...{ task }}
            show={show_valid_tooltip}
            content="Validate this task"
          />
          <Tooltip
            {...{ task }}
            show={unvalidateTooltip}
            content="You can not invalidate a task marked as done !"
          />

          <span className="text-gray-600">
            {task.isValidated ? "validated" : ""}
          </span>
        </label>
      </div>

      {/* Done Checkbox */}
      <div className="relative group  done_tooltip">
        <label className="flex items-center ml-4 space-x-2">
          <input
            className={`form-checkbox text-green-500 ${
              !task.isValidated || !task.ongoing
                ? "bg-gray-300 cursor-not-allowed opacity-50"
                : ""
            }`}
            type="checkbox"
            checked={task.isDone}
            onChange={() => {
              if (task.isValidated && task.ongoing) {
                updateTaskStatus("isDone", task.name);
                setCardLabel("");
              }
            }}
          />

          <Tooltip
            {...{ task }}
            show={show_done_tooltip}
            content="Mark this task as done"
          ></Tooltip>
          <span className="text-gray-600">{task.isDone ? "done" : ""}</span>
        </label>
      </div>
    </div>
  );
};

export default StatusCheckBoxesGroup;
