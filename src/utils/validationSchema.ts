import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("Nom de la tâche requis"),
  description: Yup.string().required("Description de la tâche requise"),
  type: Yup.string().required("Type de tâche requis"),
  createdAt: Yup.date().nullable().required("Date est requise"),
  createdAtTime: Yup.string().required("Time is required"),
});

export const TaskSchema = Yup.object().shape({
  newName: Yup.string()
    .required("New Task Name is required")
    .matches(/^[a-zA-Z0-9\s]+$/, "Invalid characters detected"),
});
