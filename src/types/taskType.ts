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
