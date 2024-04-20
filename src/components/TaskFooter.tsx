import { FunctionComponent, useContext, useState } from "react";
import expand_icon from "../assets/img/add.svg";
import delete_icon from "../assets/img/delete.svg";
import settings_icon from "../assets/img/modify.svg";

import { useFormik } from "formik";
import { TasksContext } from "../context/ItemsContext";
import { Task } from "../types/taskType";
import { TaskSchema } from "../utils/validationSchema";
import TaskIconWithTooltip from "./TaskIconWithTooltip";
import TaskModal from "./modals/TaskModal";

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
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  // const [newName, setNewName] = useState("");

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
    <div
      className={`absolute bottom-2 right-2 flex flex-col items-end mt-4`}

      // changeNameFormik.errors.newName
      // changeNameFormik.touched.newName
    >
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
            <div>
              <h2 className="text-xl font-semibold mb-4">Change Task Name</h2>
              <input
                name="newName"
                type="text"
                value={changeNameFormik.values.newName}
                onChange={changeNameFormik.handleChange}
                onBlur={changeNameFormik.handleBlur}
                className="border rounded px-2 py-1 w-full mb-4"
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
                className={`  flex justify-center items-center mt-6${
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
    </div>
  );
};

export default TaskFooter;
