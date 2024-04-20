import { FunctionComponent, useContext, useEffect, useState } from "react";
import pro_icon from "../assets/img/briefcase_4620990.png";
import perso_icon from "../assets/img/personal-security_12110372.png";
import important_icon from "../assets/img/warning_9392681.png";
import { TasksContext } from "../context/ItemsContext";
import "../styles/GlobalStyles.scss";
import { Task } from "../types/taskType";
import { formatDate } from "../utils/taskUtils";
import TaskFooter from "./TaskFooter";
import Tooltip from "./Tooltip";
import StatusCheckBoxesGroup from "./checkboxes/StatusCheckBoxesGroup";
import TaskModal from "./modals/TaskModal";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: FunctionComponent<TaskCardProps> = ({ task }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [borderColor, setBorderColor] = useState<string>(""); // Default reddish border for ongoing tasks
  const [borderWidth, setBorderWidth] = useState<string>(""); // Default border width
  const [cardLabel, setCardLabel] = useState("ongoing...");
  const [importTaskTool, setImportTaskTool] = useState(false); //import stands from important
  const [isOpen, setIsOpen] = useState(false);
  const [isSubTasksExpanded, setIsSubTasksExpanded] = useState(false);
  const [numSets, setNumSets] = useState(1);

  const { setTasks, tasks } = useContext(TasksContext);

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

  // Function to delete a task by its name
  const deleteTask = (taskName: string) => {
    setTasks(tasks?.filter((task) => task.name !== taskName));
  };

  function confirmDeteleTask(): void {
    deleteTask(task.name);
    setIsOpen(false);
  }

  return (
    <div
      className={`task-card-container  border  p-4 pr-2 pt-2 rounded relative ${borderColor} ${borderWidth}
      ${!showDescription ? "h-64" : ""}
      ${
        isSubTasksExpanded
          ? `card-height-subtasks__expanded card-height-${numSets}`
          : ""
      }
      
      `}
      // set the height of the task card to 56 when the task description is not shown (hidden), to allow the card to stretch a bit its height
      style={{
        minHeight: showDescription && isSubTasksExpanded ? "650px" : ``,
        backgroundColor: task.isDone //start with the most specific case
          ? "rgba(236, 253, 245, 1)"
          : task.isValidated
          ? "rgba(236, 253, 245, 0.25)"
          : task.ongoing
          ? "transparent"
          : "transparent",
      }}
    >
      {/* task type icon */}
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

      {/* task name */}
      <div className="w-full max-w-48 mt-2">
        <h2
          className={`text-xl  font-semibold mb-2 ${
            task?.name?.length > 16 ? "truncate" : ""
          }`}
        >
          {task.name}
        </h2>
      </div>

      {/* Description */}
      <div
        className={`task-card-description mb-4 ${
          task?.description?.length > 240
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

      <div>
        <span
          className={`text-slate-700 text-lg font-semibold sedan-regular   ${
            showDescription ? "text-sm" : ""
          }`}
        >
          {formatDate(task.createdAt, task.createdAtTime)}
        </span>
      </div>

      <StatusCheckBoxesGroup
        applyBottomMargin={
          showDescription && task.isDone && task.isValidated ? true : false
        }
        {...{ task, setCardLabel }}
      />

      <div className="">
        <TaskFooter
          {...{
            cardLabel,
            setIsOpen,
            task,
            isSubTasksExpanded,
            setIsSubTasksExpanded,
            numSets,
            setNumSets,
          }}
        ></TaskFooter>
      </div>

      <TaskModal
        modalContent={
          <>
            <h3 className="text-gray-600 sedan-regular text-xl">
              Are you sure you want to delete this task ?
            </h3>
            <div className="modal-btns">
              <button
                className={`modal-btn-yes `}
                onClick={() => confirmDeteleTask()}
              >
                <span>YES</span>
              </button>
              <button
                className={`modal-btn-no `}
                onClick={() => setIsOpen(false)}
              >
                <span>NO</span>
              </button>
            </div>
          </>
        }
        onClose={() => setIsOpen(false)}
        {...{ isOpen }}
      ></TaskModal>
    </div>
  );
};
