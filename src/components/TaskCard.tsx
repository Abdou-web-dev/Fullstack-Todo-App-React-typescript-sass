import { FunctionComponent, useEffect, useState } from "react";
import pro_icon from "../assets/img/briefcase_4620990.png";
import perso_icon from "../assets/img/personal-security_12110372.png";
import important_icon from "../assets/img/warning_9392681.png";
import "../styles/GlobalStyles.scss";
import { Task } from "../types/taskType";
import { formatDate } from "../utils/taskUtils";
import Tooltip from "./Tooltip";

interface TaskCardProps {
  task: Task;
  onUpdateStatus: (
    status: "isValidated" | "isDone" | "ongoing" | undefined,
    taskName: string
  ) => void;
}

export const TaskCard: FunctionComponent<TaskCardProps> = ({
  task,
  onUpdateStatus: updateTaskStatus,
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [borderColor, setBorderColor] = useState<string>(""); // Default reddish border for ongoing tasks
  const [borderWidth, setBorderWidth] = useState<string>(""); // Default border width
  const [cardLabel, setCardLabel] = useState("ongoing...");
  const [unvalidateTooltip, setUnvalidateTooltip] = useState(false);
  const [importTaskTool, setImportTaskTool] = useState(false);
  // Function to get the correct icon based on task type
  const getIcon = () => {
    switch (task.type) {
      case "personal":
        return perso_icon;
      case "professional":
        return pro_icon;
      case "important":
        return important_icon;
      default:
        return "";
    }
  };

  useEffect(() => {
    if (task.isDone) {
      setBorderColor("border-green-800");
      setBorderWidth("border-2");
    } else if (task.isValidated) {
      setBorderWidth("border");
      setBorderColor("border-green-300");
    } else if (task.ongoing) {
      setBorderWidth("");
      setBorderColor("");
    }
    // it's generally a good practice to start with the most specific or least likely condition (i.e:here isDone) , and progress to the more general conditions when using conditional logic to determine styles or actions based on an object's state changes.
  }, [task.isValidated, task.isDone, task.ongoing]);

  useEffect(() => {
    if (!task.isValidated && !task.isDone) setCardLabel("ongoing...");
  }, [task.isValidated, task.isDone]);

  let show_valid_tooltip = task.ongoing && !task.isDone && !task.isValidated;
  let show_done_tooltip = task.ongoing && !task.isDone && task.isValidated;

  return (
    <div
      className={`task-card-container  border p-4 rounded relative ${borderColor} ${borderWidth}
      `}
      style={{
        backgroundColor: task.isDone
          ? "rgba(236, 253, 245, 1)"
          : task.isValidated
          ? "rgba(236, 253, 245, 0.25)"
          : task.ongoing
          ? "transparent"
          : "transparent",
      }}
    >
      {getIcon() && (
        <div className="relative group">
          <img
            src={getIcon()}
            alt={task.type}
            className="absolute top-2 right-2 w-6 h-6"
            onMouseOver={() => {
              setImportTaskTool(true);
              setTimeout(() => {
                setImportTaskTool(false);
              }, 2000);
            }}
          />
          <Tooltip
            {...{ importTaskTool }}
            show={importTaskTool}
            content={
              task.type === "important"
                ? "this task needs attention !"
                : task.type === "personal"
                ? "this is a Personal task !"
                : task.type === "professional"
                ? "this is a Professional task !"
                : ""
            }
          />
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2">{task.name}</h2>

      {/* Ongoing Status */}
      {task.ongoing ? (
        <span className="absolute bottom-2 right-2 text-xs text-gray-400">
          {cardLabel}
        </span>
      ) : null}

      {/* Description */}
      <div
        className={`task-card-description mb-4 ${
          task.description.length > 240
            ? "overflow-y-scroll"
            : "overflow-hidden"
        } overflow-hidden transition-all duration-1000 ease-in-out`}
        // display the vertical scroll bar only when the description length exceeds 240 characters.
        style={{
          height: showDescription ? "auto" : "0px",
          opacity: showDescription ? 1 : 0,
          maxHeight: showDescription ? "200px" : "none",
        }}
      >
        <p className="text-gray-600 sedan-regular">{task.description}</p>
      </div>

      {/* Toggle button */}
      <button
        className="text-blue-500 focus:outline-none hover:border-gray-200 opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out"
        onClick={() => setShowDescription(!showDescription)}
      >
        {showDescription ? "Show less" : "Show more"}
      </button>
      <div>{formatDate(task.createdAt, task.createdAtTime)}</div>

      {/* Status Checkboxes */}
      <div className=" flex items-center mt-4">
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
              content="You can not unvalidate a task marked as done !"
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
    </div>
  );
};
