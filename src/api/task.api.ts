import axios, { AxiosResponse } from 'axios';
import TaskDto from '../dto/task.dto';
import { Action } from '../common/enum';
import { generalRequestHeader } from '../common/user';

/**
 * Create a task.
 * @param taskDto
 */
export function fetchTaskPaged(taskDto: Partial<TaskDto>): Promise<AxiosResponse> {
  return axios.get(`/supervisor/tasks`, {
    params: taskDto,
  });
}

export function fetchSelectedTask(userId: number): Promise<AxiosResponse> {
  return axios.get(`/supervisor/users/selected-tasks`, {
    params: { userId: userId },
  });
}

export function updateTaskStage(taskId: number, action: Action): Promise<AxiosResponse> {
  return axios.put(`supervisor/tasks/${taskId}`, { action }, { headers: generalRequestHeader() });
}

export function createTask(categoryId: number): Promise<AxiosResponse> {
  return axios.post(`supervisor/tasks`, { categoryId }, { headers: generalRequestHeader() });
}

export function switchSelectedTask(taskId: number): Promise<AxiosResponse> {
  return axios.put(
    `supervisor/users/selected-tasks`,
    { taskId },
    { headers: generalRequestHeader() }
  );
}

