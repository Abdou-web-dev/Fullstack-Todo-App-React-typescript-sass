import { FunctionComponent, useEffect } from "react";
import Modal from "react-modal";

interface TaskModalProps {
  modalContent: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: FunctionComponent<TaskModalProps> = ({
  modalContent,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    // Set the app element for react-modal
    Modal.setAppElement("#root");
    // This useEffect solves this issue: react-modal: App element is not defined.
    // Please use `Modal.setAppElement(el)` or set `appElement={el}`.
    // This is needed so screen readers don't see main content when modal is opened.
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
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
      {modalContent}
    </Modal>
  );
};

export default TaskModal;
