import axios, { AxiosResponse } from 'axios';
import { generalRequestHeader } from '../common/user';

export function fetchUserId(): Promise<AxiosResponse> {
  return axios.get(`/supervisor/users/id`, { headers: generalRequestHeader() });
}