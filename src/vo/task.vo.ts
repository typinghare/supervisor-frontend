import { TaskCommentVo } from './TaskCommentVo';

export default interface TaskVo {
  id: number;

  stage: number;

  startedAt: Date;

  lastResumeAt: Date;

  endedAt: Date;

  duration: number;

  createdAt: Date;

  categoryId: number;

  categoryName: string;

  expectedDuration: number;

  subjectName: string;

  commentList: TaskCommentVo[];
}
