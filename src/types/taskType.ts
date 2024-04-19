export interface Task {
  name: string;
  description: string;
  createdAt: Date | string;
  type: string;
  createdAtTime: string;
  isDone: boolean;
  isValidated: boolean;
  ongoing: boolean;
}
// status: "ongoing" | "validated" | "done";

//   onSubmit({
//     name: "aa",
//     description: "lejfljef",
//     createdAt: new Date(),
//     isDone: false,
//     isValidated: true,
//   });
// }, []);
