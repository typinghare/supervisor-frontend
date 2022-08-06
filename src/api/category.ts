import axios, { AxiosResponse } from 'axios';

/**
 * Fetch all categories.
 */
export function fetchCategories(subjectId: number): Promise<AxiosResponse> {
  return axios.get(`/supervisor/categories`, {
    params: { subjectId },
  });
}
