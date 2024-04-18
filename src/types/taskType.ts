export interface Task {
  name: string;
  description: string;
  createdAt: Date | string;
  createdAtTime: string;
  isDone: boolean;
  isValidated: boolean;
}

//   onSubmit({
//     name: "aa",
//     description: "lejfljef",
//     createdAt: new Date(),
//     isDone: false,
//     isValidated: true,
//   });
// }, []);
