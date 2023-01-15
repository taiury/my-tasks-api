interface ModifyTaskDTO {
  taskId: number;
  userId: number;
  title?: string;
  description?: string;
  finalized?: boolean;
}

export { ModifyTaskDTO };
