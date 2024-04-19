import { FunctionComponent, useEffect, useState } from "react";
import pro_icon from "../assets/img/briefcase_4620990.png";
import perso_icon from "../assets/img/personal-security_12110372.png";
import important_icon from "../assets/img/warning_9392681.png";
import "../styles/GlobalStyles.scss";
import { Task } from "../types/taskType";
import { formatDate } from "../utils/taskUtils";

interface TaskCardProps {
  task: Task;
  onUpdateStatus: (
    status: "isValidated" | "isDone" | "ongoing" | undefined,
    taskName: string
  ) => void;
}

export const TaskCard: FunctionComponent<TaskCardProps> = ({
  task,
  onUpdateStatus,
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [borderColor, setBorderColor] = useState<string>(""); // Default reddish border for ongoing tasks
  const [borderWidth, setBorderWidth] = useState<string>("border"); // Default border width

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
    if (task.isValidated) {
      setBorderColor("border-green-300"); // Light green for validated
    } else if (task.isDone) {
      setBorderColor("border-green-800"); // Dark green for done
    } else {
      setBorderColor("border-gray-400"); // Default reddish border for ongoing tasks
    }
  }, [task]);

  useEffect(() => {
    if (task.isValidated) {
      setBorderWidth("border-2"); // Increase border width for validated tasks
    } else if (task.isDone) {
      setBorderWidth("border-2"); // Increase border width for done tasks
    } else {
      setBorderWidth("border"); // Default border width for ongoing tasks
    }
  }, [task]);

  return (
    <div
      className={`task-card-container border p-4 rounded relative ${borderColor} ${borderWidth}
      ${task.isDone ? "is_done" : ""}
      `}
    >
      {getIcon() && (
        <img
          src={getIcon()}
          alt={task.type}
          className="absolute top-2 right-2 w-6 h-6"
        />
      )}
      <h2 className="text-xl font-semibold mb-2">{task.name}</h2>

      {/* Ongoing Status */}
      {task.ongoing ? (
        <span className="absolute bottom-2 right-2 text-xs text-gray-400">
          ongoing...
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
      <div className="flex items-center mt-4">
        {/* Validated Checkbox */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={task.isValidated}
            onChange={() => onUpdateStatus("isValidated", task.name)}
            className="form-checkbox text-blue-500"
          />
          <span className="text-gray-600">
            {task.isValidated ? "validated" : ""}
          </span>
        </label>

        {/* Done Checkbox */}
        <label className="flex items-center ml-4 space-x-2">
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={() => onUpdateStatus("isDone", task.name)}
            className="form-checkbox text-green-500"
          />
          <span className="text-gray-600">{task.isDone ? "done" : ""}</span>
        </label>
      </div>
    </div>
  );
};
