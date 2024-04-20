import React, { useEffect, useState } from "react";
import Alert from "../alerts/CustomAlert";

interface ExpandableInputProps {
  placeholder: string;
  localStorageKey: string;
  taskName: string;
}

const ExpandableInput: React.FC<ExpandableInputProps> = ({
  placeholder,
  localStorageKey,
  taskName,
}) => {
  const [value, setValue] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Load value and checked state from localStorage on component mount
    const storedValue = localStorage.getItem(localStorageKey);
    const storedChecked = localStorage.getItem(
      `${localStorageKey}_checked_${taskName}`
    );

    if (storedValue) {
      setValue(storedValue);
    }

    if (storedChecked) {
      setIsChecked(storedChecked === "true");
    }
  }, [localStorageKey, taskName]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      saveValue();
    }
  };

  const toggleCheckbox = () => {
    // Check if there's a value in the input
    if (value.trim() !== "") {
      saveValue();
    } else {
      // Optionally, notify the user that the input field needs a value before checking the checkbox
      setShowAlert(true);
    }
  };
  const closeAlert = () => {
    setShowAlert(false);
  };
  const saveValue = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    localStorage.setItem(
      `${localStorageKey}_checked_${taskName}`,
      String(newCheckedState)
    );
    if (newCheckedState) localStorage.setItem(localStorageKey, value); // Save the input value
  };
  return (
    <div
      className="expandable-input-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        className="expanded-input"
      />
      {isHovered && (
        <input
          type="checkbox"
          checked={isChecked}
          // @ts-ignore
          onChange={toggleCheckbox}
          className="expandable-checkbox"
        />
      )}
      {showAlert && (
        <Alert
          message="Please enter a value before checking the checkbox."
          onClose={closeAlert}
        />
      )}
    </div>
  );
};

export default ExpandableInput;
