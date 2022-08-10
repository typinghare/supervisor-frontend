export {};
// import SubjectVo from '../vo/subject.vo';
// import CategoryVo from '../vo/category.vo';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { LoadingState } from '../common/enum';
//
// interface CreateTaskState {
//   subjectList: SubjectVo[];
//   categoryList: CategoryVo[];
//   selectedSubject: string;
//   selectedCategory: string;
//   inputComment: string;
//   createLoadingState: LoadingState;
//   snackBarOpen: boolean;
// }
//
// export const createTaskSlice = createSlice({
//   name: 'createTask',
//   initialState: {
//     subjectList: [],
//     categoryList: [],
//     selectedSubject: '',
//     selectedCategory: '',
//     inputComment: '',
//     createLoadingState: LoadingState.LOADING,
//     snackBarOpen: false,
//   },
//   reducers: {
//     setSelectedSubject: (state: CreateTaskState, action: PayloadAction<string>) => {
//       state.selectedSubject = action.payload;
//     },
//     setSelectedCategory: (state: CreateTaskState, action: PayloadAction<string>) => {
//       state.selectedCategory = action.payload;
//     },
//     setInputComment: (state: CreateTaskState, action: PayloadAction<string>) => {
//       state.inputComment = action.payload;
//     },
//     setCreateLoadingState: (state: CreateTaskState, action: PayloadAction<string>) => {
//       state.inputComment = action.payload;
//     },
//   },
// });
//
// export const {} = createTaskSlice.actions;
//
// export default createTaskSlice.reducer;