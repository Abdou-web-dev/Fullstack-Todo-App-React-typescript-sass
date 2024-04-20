import { FunctionComponent, useState } from "react";
import TaskIcon from "./TaskIcon";
import Tooltip from "./Tooltip";

interface TaskIconWithTooltipProps {
  src: string;
  // alt: string;
  onClick: () => void;
  tooltipContent: string;
}

const TaskIconWithTooltip: FunctionComponent<TaskIconWithTooltipProps> = ({
  src,
  // alt,
  onClick,
  tooltipContent,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  // @ts-ignore
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleMouseOver = () => {
    setShowTooltip(true);
    const newTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
    setTimer(newTimer);
  };

  const handleMouseOut = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setShowTooltip(false);
  };

  return (
    <div
      className="relative group"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <TaskIcon src={src} onClick={onClick} />
      <Tooltip
        {...{ showTooltip }}
        show={showTooltip}
        content={tooltipContent}
      />
    </div>
  );
};

export default TaskIconWithTooltip;
