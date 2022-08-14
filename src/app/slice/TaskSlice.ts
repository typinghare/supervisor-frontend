import TaskVo from '../../vo/task.vo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { LoadingState } from '../../common/enum';
import { RootState } from '../store';
import SubjectVo from '../../vo/subject.vo';
import CategoryVo from '../../vo/category.vo';
import { AccordionPanel } from '../../components/space-console/task/Task';

export interface TaskState {
  /**
   * The list of today's tasks.
   */
  taskList: TaskVo[];

  /**
   * The state of loading task list.
   */
  taskListLoadingState: LoadingState;

  /**
   * The loading state of the selected task.
   */
  selectedTaskLoadingState: LoadingState;

  /**
   * The selected task.
   */
  selectedTask: TaskVo | null;

  subjectList: SubjectVo[];

  subjectListLoadingState: LoadingState;

  inputSubjectId: number;

  categoryList: CategoryVo[];

  categoryListLoadingState: LoadingState;

  inputCategoryId: number;

  inputComment: string;

  createLoadingState: LoadingState;

  expandedAccordion: AccordionPanel;
}

export const createTaskSlice = createSlice<TaskState, SliceCaseReducers<TaskState>>({
  name: 'task',
  initialState: {
    taskList: [],
    taskListLoadingState: LoadingState.PENDING,

    selectedTaskLoadingState: LoadingState.PENDING,
    selectedTask: null,

    subjectList: [],
    subjectListLoadingState: LoadingState.PENDING,
    inputSubjectId: 0,

    categoryList: [],
    categoryListLoadingState: LoadingState.PENDING,
    inputCategoryId: 0,

    inputComment: '',

    createLoadingState: LoadingState.PENDING,

    expandedAccordion: 'taskDashboard',
  },
  reducers: {
    setTaskList(state: TaskState, _taskList: PayloadAction<TaskVo[]>) {
      state.taskList = _taskList.payload;
    },

    setTaskListLoadingState(state: TaskState, _taskLoadingState: PayloadAction<LoadingState>) {
      state.taskListLoadingState = _taskLoadingState.payload;
    },

    setSelectedTaskLoadingState(state: TaskState, _selectedTaskLoadingState: PayloadAction<LoadingState>) {
      state.selectedTaskLoadingState = _selectedTaskLoadingState.payload;
    },

    setSelectedTask(state: TaskState, _selectedTask: PayloadAction<TaskVo | null>) {
      state.selectedTask = _selectedTask.payload;
    },


    setSubjectListLoadingState(state: TaskState, _subjectListLoadingState: PayloadAction<LoadingState>) {
      state.subjectListLoadingState = _subjectListLoadingState.payload;
    },

    setSubjectList(state: TaskState, _subjectList: PayloadAction<SubjectVo[]>) {
      state.subjectList = _subjectList.payload;
    },

    changeSubject(state: TaskState, _subjectId: PayloadAction<number>) {
      state.inputSubjectId = _subjectId.payload;
    },

    setCategoryList(state: TaskState, _categoryList: PayloadAction<SubjectVo[]>) {
      state.categoryList = _categoryList.payload;
    },

    changeCategory(state: TaskState, _categoryId: PayloadAction<number>) {
      state.inputCategoryId = _categoryId.payload;
    },

    changeComment(state: TaskState, _comment: PayloadAction<string>) {
      state.inputComment = _comment.payload;
    },

    setCreateLoadingState(state: TaskState, _createLoadingState: PayloadAction<LoadingState>) {
      state.createLoadingState = _createLoadingState.payload;
    },

    setExpandedAccordion(state: TaskState, _accordionPanel: PayloadAction<AccordionPanel>) {
      state.expandedAccordion = _accordionPanel.payload;
    },
  },
});

export const {
  setTaskList,
  changeSubject,
  changeCategory,
  changeComment,
  setTaskListLoadingState,
  setSelectedTaskLoadingState,
  setSelectedTask,
  setSubjectListLoadingState,
  setSubjectList,
  setCategoryList,
  setCreateLoadingState,
  setExpandedAccordion,
} = createTaskSlice.actions;

export const selectTaskList = (state: RootState) => state.task.taskList;
export const selectTaskListLoadingState = (state: RootState) => state.task.taskListLoadingState;

export const selectSelectedTaskLoadingState = (state: RootState) => state.task.selectedTaskLoadingState;
export const selectSelectedTask = (state: RootState) => state.task.selectedTask;

export const selectSubjectList = (state: RootState) => state.task.subjectList;
// export const selectSubjectListLoadingState = (state: RootState) => state.task.subjectListLoadingState;
export const selectInputSubjectId = (state: RootState) => state.task.inputSubjectId;

export const selectCategoryList = (state: RootState) => state.task.categoryList;
// export const selectCategoryListLoadingState = (state: RootState) => state.task.categoryListLoadingState;
export const selectInputCategoryId = (state: RootState) => state.task.inputCategoryId;

export const selectInputComment = (state: RootState) => state.task.inputComment;

export const selectCreateLoadingState = (state: RootState) => state.task.createLoadingState;

export const selectExpandedAccordion = (state: RootState) => state.task.expandedAccordion;

export default createTaskSlice.reducer;