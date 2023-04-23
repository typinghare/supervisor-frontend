import axios, { AxiosResponse } from 'axios';
import { localUser } from '../common/local-user';
import { api } from '../common/api-manager';
import { TaskCommentVo } from '../vo/TaskCommentVo';

/**
 * Fetch comments of a task.
 * @param taskId
 */
export function fetchComments(taskId: number): Promise<AxiosResponse> {
  return axios.get(`supervisor/tasks/${taskId}/comments`);
}

export function postComment(taskId: number, content: string): Promise<TaskCommentVo> {
  return api(() => axios.post(
    `supervisor/tasks/${taskId}/comments`,
    {
      content,
      isPinned: true,
    },
    { headers: localUser.generalRequestHeader() },
  ));
}

export function pinComment(commentId: number): Promise<TaskCommentVo> {
  return api(() => axios.put(
    `supervisor/task-comments/${commentId}`,
    { isPinned: true },
    { headers: localUser.generalRequestHeader() },
  ), 500);
}

export function editComment(commentId: number, content: string): Promise<TaskCommentVo> {
  return api(() => axios.put(
    `supervisor/task-comments/${commentId}`,
    { content },
    { headers: localUser.generalRequestHeader() },
  ), 500);
}

export function removeComment(commentId: number): Promise<void> {
  return api(() =>
    axios.delete(`supervisor/task-comments/${commentId}`,
      { headers: localUser.generalRequestHeader() },
    ), 500);
}
