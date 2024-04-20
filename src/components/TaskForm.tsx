import { useFormik } from "formik";
import { CSSProperties, FunctionComponent, useEffect } from "react";
import DatePicker from "react-date-picker";
import { useNavigate } from "react-router-dom";
import Select, {
  CSSObjectWithLabel,
  GroupBase,
  StylesConfig,
} from "react-select";
import todo_app from "../assets/img/to-do-list.png";
import { Task } from "../types/taskType";
import { validationSchema as taskValidationSchema } from "../utils/validationSchema";

interface TaskFormProps {
  onSubmit: (newTask: Task) => void;
}

const taskTypes = [
  { label: "Tâches Personnelles", value: "personal" },
  { label: "Tâches Professionnelles", value: "professional" },
  { label: "Tâches Importantes", value: "important" },
];

export const TaskForm: FunctionComponent<TaskFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      type: "",
      createdAt: "",
      createdAtTime: "",
      isDone: false,
      isValidated: false,
      ongoing: true,
    },
    validationSchema: taskValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      navigate("/tasks"); // Redirect to the tasks page
    },
    validate: (values) => {
      const errors = {};

      // Validate createdAtTime
      if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(values.createdAtTime)) {
        // @ts-ignore
        errors.createdAtTime = "Invalid time format";
      }

      return errors;
    },
  });

  const customStyles: StylesConfig<
    { label: string; value: string },
    false,
    GroupBase<{ label: string; value: string }>
  > = {
    control: (provided: CSSProperties | CSSObjectWithLabel, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#5a8dee" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px #5a8dee" : provided.boxShadow,
    }),
  };

  const handleDateChange = (date: any) => {
    // Check if the date is valid before setting the value
    if (date) {
      formik.setFieldValue("createdAt", date);
    } else {
      formik.setFieldValue("createdAt", null);
    }

    formik.setFieldTouched("createdAt", true); // Mark the field as touched
    // console.log("handleDateChange called");
  };

  // useEffect to handle closing the calendar when a date is selected or a click event occurs outside the calendar
  useEffect(() => {
    const datePickerCalendar: HTMLElement | null = document.querySelector(
      ".react-date-picker__calendar"
    ); // datePickerCalendar is the entire calendar: days tab + header tab

    const setCalendarDisplay = (display: string) => {
      if (datePickerCalendar) {
        datePickerCalendar.style.display = display;
      }
    };

    const closeCalendar = (target: EventTarget | null) => {
      // Check if the clicked target is an HTML element and not a navigation arrow
      if (
        target instanceof HTMLElement &&
        !target.classList.contains("react-calendar__navigation__arrow")
      ) {
        setCalendarDisplay("none");
        console.log(formik.values.createdAt, "closeCalendar");
      }
    };

    const handleDocumentClick = (event: MouseEvent | null = null) => {
      // Check if an event is provided, then close the calendar based on the clicked target
      if (event) {
        closeCalendar(event.target);
      } else {
        closeCalendar(null);
      }
    };

    // Add a document click event listener to close the calendar when a date is selected
    if (
      formik.values.createdAt &&
      formik.values.createdAt !== formik.initialValues.createdAt
    ) {
      document.addEventListener("click", handleDocumentClick);
    }

    // Close the calendar by default when the component mounts if a date has been selected
    // When the component mounts, the useEffect runs, and if formik.values.createdAt is truthy (i.e., a date has been selected), the handleDocumentClick() function is called, which in turn closes the calendar.
    if (formik.values.createdAt) {
      handleDocumentClick();
    }

    // Cleanup
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [formik.values.createdAt]);

  // useEffect to handle opening the calendar when the calendar button is clicked
  useEffect(() => {
    // Query the DOM to find the calendar button to open the date picker

    const calendarButton: HTMLElement | null = document.querySelector(
      ".react-date-picker__calendar-button.react-date-picker__button"
    );

    const setCalendarDisplay = (display: string) => {
      const datePickerCalendar: HTMLElement | null = document.querySelector(
        ".react-date-picker__calendar"
      );
      if (datePickerCalendar) {
        datePickerCalendar.style.display = display;
      }
    };

    const openCalendar = () => {
      // Delay the display change to allow the button click event to complete
      setTimeout(() => {
        setCalendarDisplay("block");
        console.log(formik.values.createdAt, "openCalendar");
      }, 0);
    };

    if (calendarButton) {
      calendarButton.addEventListener("click", openCalendar);
    }

    // Cleanup
    return () => {
      if (calendarButton) {
        calendarButton.removeEventListener("click", openCalendar);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 max-w-screen-xl mx-auto xl:grid-cols-2 lg:w-4/5">
      <div className="h-screen">
        <img className="object-center w-full h-2/3" src={todo_app} alt="" />
      </div>
      {/* the form will stretch across the full width of the container on smaller screens and align side-by-side with the image on larger screens. */}
      {/* xl:w-full to ensure it takes up the full width of the container when the screen width is under 1280px (xl breakpoint). */}
      <form
        className="add_task__form  xl:w-full"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="taskName"
            className="block text-sm font-medium text-gray-700"
          >
            Nom de la tâche
          </label>
          <input
            id="taskName"
            name="name"
            type="text"
            onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldValue("name", e.target.value);
            }}
            value={formik.values.name}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-xs mt-1 mb-6">
              {formik.errors.name}
            </div>
          ) : null}
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="taskDescription"
          >
            Description de la tâche
          </label>
          <textarea
            id="taskDescription"
            name="description" //The name attribute should match the field name in formik initialValues.
            onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldValue("description", e.target.value);
            }}
            value={formik.values.description}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-xs mt-1 mb-6">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="taskType"
            className="block text-sm font-medium text-gray-700"
          >
            Type de tâche
          </label>
          <Select
            id="type"
            name="type"
            options={taskTypes}
            styles={customStyles}
            onChange={(selected) => {
              if (selected) {
                formik.setFieldValue("type", selected.value);
              }
            }}
            value={taskTypes?.find(
              (option) => option.value === formik.values.type
            )}
            className="mt-1 w-full"
          />
          {formik.touched.type && formik.errors.type ? (
            <div className="text-red-500 text-xs mt-1 mb-6">
              {formik.errors.type}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="taskDate"
            className="block text-sm font-medium text-gray-700"
          >
            Date :
          </label>

          <DatePicker
            name="createdAt"
            value={formik.values.createdAt}
            onChange={handleDateChange}
            shouldCloseCalendar={({ reason }) => reason === "escape"}
            className="mt-1 w-full "
          />
          {formik.touched.createdAt && formik.errors.createdAt ? (
            <div className="text-red-500 text-xs mt-1 mb-6">
              {String(formik.errors.createdAt)}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="createdAtTime"
            className="block text-sm font-medium text-gray-700"
          >
            Time
          </label>
          <div className="mt-1">
            <input
              id="createdAtTime"
              name="createdAtTime"
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              value={formik.values.createdAtTime}
              onChange={(e) => {
                let value = e.target.value;
                // Automatically insert colon after two numbers
                if (value.length === 2 && !value.includes(":")) {
                  value += ":";
                }
                formik.setFieldValue("createdAtTime", value);
              }}
              onBlur={formik.handleBlur} // Using formik.handleChange and formik.handleBlur is a shorthand way to manage the form's state and touch state automatically .
              placeholder="HH:MM"
            />
          </div>
          {formik.touched.createdAtTime && formik.errors.createdAtTime ? (
            <div className="text-red-500 text-xs mt-1 mb-6">
              {formik.errors.createdAtTime}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
};
