import axios from 'axios';
import { api } from '../common/api-manager';
import UserInfoVo from '../vo/user-info.vo';
import { API } from '../common/api-url';

// export module API {
//   export function fetchUserId(): Promise<AxiosResponse> {
//     return axios.get(`/supervisor/users/id`, { headers: localUser.generalRequestHeader() });
//   }
//
//   export function signIn(username: string, password: string): Promise<AxiosResponse> {
//     return axios.put(`/supervisor/users`, { username, password });
//   }
// }

export const signIn = (username: string, password: string): Promise<UserInfoVo> => {
  return api(() => axios.put(API.SIGN_IN, { username, password }), 500);
};