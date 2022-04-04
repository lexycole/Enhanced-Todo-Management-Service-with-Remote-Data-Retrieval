export enum TODO_STATUS {
  COMPLETED = 1, //completed
  IN_PROGRESS, //in progress
}

export interface TODO {
  title: string; //string
  status: TODO_STATUS; //todo status
}
