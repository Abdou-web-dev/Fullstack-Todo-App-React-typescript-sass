import { FunctionComponent } from "react";

interface TaskIconProps {
  src: string;
  onClick: () => void;
}

const TaskIcon: FunctionComponent<TaskIconProps> = ({ src, onClick }) => {
  return (
    <div className="relative group">
      <img
        src={src}
        alt={""}
        className="w-8 h-8 cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
};

export default TaskIcon;
