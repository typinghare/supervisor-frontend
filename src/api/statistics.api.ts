import axios, { AxiosResponse } from 'axios';

export function fetchLastWeekDurationAggregation(userId: number): Promise<AxiosResponse> {
  return axios.get(`/supervisor/statistics/duration`, {
    params: { userId },
  });
}

export function fetchLastWeekSubjectDuration(userId: number): Promise<AxiosResponse> {
  return axios.get(`/supervisor/statistics/subject-duration`, {
    params: { userId },
  });
}
