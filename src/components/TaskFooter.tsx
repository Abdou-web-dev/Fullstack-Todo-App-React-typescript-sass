import { useFormik } from "formik";
import { FunctionComponent, useContext, useState } from "react";
import expand_icon from "../assets/img/add.svg";
import delete_icon from "../assets/img/delete.svg";
import settings_icon from "../assets/img/modify.svg";
import { TasksContext } from "../context/ItemsContext";
import { Task } from "../types/taskType";
import { TaskSchema } from "../utils/validationSchema";
import TaskIconWithTooltip from "./TaskIconWithTooltip";
import Tooltip from "./Tooltip";
import ExpandableInput from "./inputs/ExpandableInput";
import TaskModal from "./modals/TaskModal";

interface TaskFooterProps {
  task: Task;
  cardLabel: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSubTasksExpanded: boolean;
  setIsSubTasksExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setNumSets: React.Dispatch<React.SetStateAction<number>>;
  numSets: number;
}

const TaskFooter: FunctionComponent<TaskFooterProps> = ({
  task: currentTask,
  cardLabel,
  setIsOpen,
  isSubTasksExpanded,
  setIsSubTasksExpanded,
  setNumSets,
  numSets,
}) => {
  const { setTasks, tasks } = useContext(TasksContext);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);

  const displayNextTasks = () => {
    setNumSets(numSets + 1);
  };

  const generateSubTasks = (setIndex: number) => {
    return [
      {
        localStorageKey: `input${setIndex}_1`,
        placeholder: `Input ${setIndex} - 1`,
        taskName: currentTask.name,
      },
      {
        localStorageKey: `input${setIndex}_2`,
        placeholder: `Input ${setIndex} - 2`,
        taskName: currentTask.name,
      },
      {
        localStorageKey: `input${setIndex}_3`,
        placeholder: `Input ${setIndex} - 3`,
        taskName: currentTask.name,
      },
      {
        localStorageKey: `input${setIndex}_4`,
        placeholder: `Input ${setIndex} - 4`,
        taskName: currentTask.name,
      },
    ];
  };
  const changeNameFormik = useFormik({
    initialValues: {
      newName: "",
    },
    validationSchema: TaskSchema,
    onSubmit: (values) => {
      changeTaskName(currentTask.name, values.newName);
      setIsChangeModalOpen(false);
    },
  });

  // Function to modify a task's title by its name
  const changeTaskName = (taskName: string, newTaskName: string) => {
    const updatedTask = tasks?.map((task) => {
      if (task.name === taskName) {
        return { ...task, name: newTaskName };
      }
      return task;
    });
    console.log("updatedTask", updatedTask);
    setTasks(updatedTask);

    // Save updated tasks to localStorage
    localStorage.setItem("updatedTask", JSON.stringify(updatedTask));
  };

  function handleExpandClick(): void {
    setIsSubTasksExpanded(!isSubTasksExpanded);
  }

  return (
    <div className={`task-footer flex flex-col items-end mt-2`}>
      {/* Ongoing Status */}
      {currentTask.ongoing ? (
        <span className="mb-2 text-xs text-gray-400 ">{cardLabel}</span>
      ) : null}

      <div className="flex gap-0 ">
        <TaskIconWithTooltip
          src={expand_icon}
          onClick={handleExpandClick}
          tooltipContent={isSubTasksExpanded ? "Hide subtasks" : "Add subtasks"}
        />
        <TaskIconWithTooltip
          src={settings_icon}
          onClick={() => setIsChangeModalOpen(true)}
          tooltipContent="Modify this task"
        />
        {/* Delete Icon */}
        <TaskIconWithTooltip
          src={delete_icon}
          onClick={() => setIsOpen(true)}
          tooltipContent="Delete this task"
        />
        {/* Task change Name Modal */}
        <TaskModal
          isOpen={isChangeModalOpen}
          onClose={() => setIsChangeModalOpen(false)}
          // onSave={changeTaskName}
          modalContent={
            <div className="task-footer__modal">
              <h2 className="text-xl font-semibold mb-4">Change Task Name</h2>
              <input
                name="newName"
                type="text"
                value={changeNameFormik.values.newName}
                onChange={changeNameFormik.handleChange}
                onBlur={changeNameFormik.handleBlur}
                className="change_name__input border rounded px-2 py-1 w-full mb-4 "
                placeholder="New Task Name"
              />
              {changeNameFormik.touched.newName &&
              changeNameFormik.errors.newName ? (
                <div className="text-red-500">
                  <span className="text-xs sedan-regular__red">
                    {changeNameFormik.errors.newName}
                  </span>
                </div>
              ) : null}
              <div
                className={`flex justify-center items-center mt-6${
                  changeNameFormik.errors.newName &&
                  changeNameFormik.touched.newName
                    ? ""
                    : ""
                }`}
              >
                <button
                  className="mr-2 px-4 py-1 border rounded"
                  onClick={() => setIsChangeModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-1 bg-blue-500 text-white rounded"
                  // @ts-ignore
                  onClick={changeNameFormik.handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          }
        />
      </div>

      <div className="my-4 mb-8">
        {isSubTasksExpanded && (
          <div className="expanded-inputs flex gap-4 flex-col mx-2">
            {[...Array(numSets)].map((_, setIndex) => {
              return generateSubTasks(setIndex + 1).map((subTask, index) => (
                <ExpandableInput
                  key={`${setIndex}_${index}`}
                  localStorageKey={subTask.localStorageKey}
                  placeholder={subTask.placeholder}
                  taskName={subTask.taskName}
                />
              ));
            })}

            <div className="relative group">
              <button
                className={`extra__plus_btn bg-slate-100 h-auto 
              ${numSets >= 3 ? "cursor-not-allowed opacity-50" : ""}
              `}
                onClick={displayNextTasks}
                disabled={numSets >= 3}
              >
                <span className="text-3xl text-slate-800">+</span>
              </button>
              <Tooltip
                {...{ numSets }}
                show={numSets >= 0}
                content={
                  numSets >= 3
                    ? "You have reached the maximum number of allowed subtasks!"
                    : numSets >= 0 && numSets <= 3
                    ? "Click to add new subtasks"
                    : ""
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskFooter;
