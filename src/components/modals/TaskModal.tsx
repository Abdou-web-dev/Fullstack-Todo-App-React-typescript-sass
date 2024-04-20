import { FunctionComponent, useContext, useEffect } from "react";
import Modal from "react-modal";
import { TasksContext } from "../../context/ItemsContext";
import { Task } from "../../types/taskType";

interface TaskModalProps {
  task: Task;
  // deleteTask: (taskName: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskModal: FunctionComponent<TaskModalProps> = ({
  task,
  // deleteTask,
  isOpen,
  setIsOpen,
}) => {
  const { setTasks, tasks } = useContext(TasksContext);

  // Function to delete a task by its name
  const deleteTask = (taskName: string) => {
    setTasks(tasks?.filter((task) => task.name !== taskName));
  };

  function confirmDeteleTask(): void {
    deleteTask(task.name);
    setIsOpen(false);
  }

  useEffect(() => {
    // Set the app element for react-modal
    Modal.setAppElement("#root");
    //this useEffect solves this issue : react-modal: App element is not defined. Please use `Modal.setAppElement(el)` or set `appElement={el}`. This is needed so screen readers don't see main content when modal is opened.
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Delete Prompt Modal"
      style={{
        content: {
          width: "30%",
          height: "30%",
          margin: "0 auto",
          position: "relative",
          top: "20%",
        },
      }}
    >
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
        <button className={`modal-btn-no `} onClick={() => setIsOpen(false)}>
          <span>NO</span>
        </button>
      </div>
    </Modal>
  );
};

export default TaskModal;
