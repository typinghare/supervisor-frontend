import { Stage } from '../common/enum';

export default interface TaskDto {
  categoryId: number;

  userId: number;

  stage: string | Stage;

  selectedDate: string;
}
