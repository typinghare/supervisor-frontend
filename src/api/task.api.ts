import axios from 'axios';
import TaskDto from '../dto/task.dto';
import { Action } from '../common/enum';
import { localUser } from '../common/local-user';
import { api } from '../common/api-manager';
import TaskVo from '../vo/task.vo';

export function updateTaskStage(taskId: number, action: Action): Promise<TaskVo> {
  return api(() => axios.put(`supervisor/tasks/${taskId}`, { action }, { headers: localUser.generalRequestHeader() }));
}

/**
 * Create a task.
 * @param taskDto
 */
export function fetchTaskPaged(taskDto: Partial<TaskDto>): Promise<TaskVo[]> {
  return api(() => axios.get(`/supervisor/tasks`, {
    params: taskDto,
  }));
}

export function fetchSelectedTask(userId: number): Promise<TaskVo | null> {
  return api(() => axios.get(`/supervisor/users/selected-tasks`, {
    params: { userId: userId },
  }));
}

export function createTask(categoryId: number): Promise<TaskVo> {
  if (!categoryId) {
    throw new Error('Not yet select a category!');
  }

  return api(() => axios.post(`supervisor/tasks`, { categoryId }, { headers: localUser.generalRequestHeader() }));
}

export function switchSelectedTask(taskId: number): Promise<void> {
  return api(() => axios.put(
    `supervisor/users/selected-tasks`,
    { taskId },
    { headers: localUser.generalRequestHeader() },
  ));
}

export function removeTask(taskId: number): Promise<void> {
  return api(() => axios.delete(`supervisor/tasks/${taskId}`, {
    headers: localUser.generalRequestHeader(),
  }), 500);
}