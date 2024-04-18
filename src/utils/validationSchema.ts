import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("Nom de la tâche requis"),
  description: Yup.string(),
  type: Yup.string().required("Type de tâche requis"),
});
