import axios from 'axios';
import { api } from '../common/api-manager';
import CategoryVo from '../vo/category.vo';

/**
 * Fetch all categories.
 */
export function fetchCategories(subjectId: number): Promise<CategoryVo[]> {
  return api(() => axios.get(`/supervisor/categories`, {
    params: { subjectId },
  }));
}
