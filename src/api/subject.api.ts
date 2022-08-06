import axios, { AxiosResponse } from 'axios';
import SubjectDto from '../dto/subject.dto';

/**
 * Create a task.
 * @param subjectDto
 */
export function createSubject(subjectDto: SubjectDto): Promise<AxiosResponse> {
  return axios.post(`/supervisor/subjects`, subjectDto);
}

/**
 * Delete a subject.
 * @param subjectId
 */
export function deleteSubject(subjectId: number): Promise<AxiosResponse> {
  return axios.delete(`/supervisor/subjects/${subjectId}`);
}

/**
 * Fetch all subjects.
 */
export function fetchSubjects(userId: number): Promise<AxiosResponse> {
  return axios.get(`/supervisor/subjects`, {
    params: { userId },
  });
}
