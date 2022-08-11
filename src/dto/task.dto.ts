import { Stage } from '../common/enum';

export default interface TaskDto {
  userId: number;

  categoryId: number;

  stage: string | Stage;

  selectedDate: string;

  comment: string;
}
