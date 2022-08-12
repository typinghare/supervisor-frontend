import axios from 'axios';
import { api } from '../common/api-manager';

export function fetchLastWeekDurationAggregation(userId: number): Promise<{
  durationSum: number
}[]> {
  return api(() => axios.get(`/supervisor/statistics/duration`, {
    params: { userId },
  }), 500);
}

export function fetchLastWeekSubjectDuration(userId: number): Promise<{
  subjectName: string,
  durationSum: number
}[]> {
  return api(() => axios.get(`/supervisor/statistics/subject-duration`, {
    params: { userId },
  }), 500);
}
