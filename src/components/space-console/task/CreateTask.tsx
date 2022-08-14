/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent } from 'react';
import {
  Alert,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from '@mui/material';
import SubjectVo from '../../../vo/subject.vo';
import CategoryVo from '../../../vo/category.vo';
import { LoadingButton } from '@mui/lab';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { LoadingState } from '../../../common/enum';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  changeCategory,
  changeComment,
  changeSubject,
  selectCategoryList,
  selectCreateLoadingState,
  selectInputCategoryId,
  selectInputComment,
  selectInputSubjectId,
  selectSelectedTask,
  selectSubjectList,
  selectTaskList,
  setCategoryList,
  setCreateLoadingState,
  setExpandedAccordion,
  setSelectedTask,
  setSelectedTaskLoadingState,
  setTaskList,
} from '../../../app/slice/TaskSlice';
import { fetchCategories } from '../../../api/category.api';
import { createTask, fetchSelectedTask } from '../../../api/task.api';
import { postComment } from '../../../api/task-comment.api';
import { localUser } from '../../../common/local-user';
import TaskVo from '../../../vo/task.vo';
import _ from 'lodash';

export const CreateTask: FunctionComponent = () => {
  const subjectList = useAppSelector(selectSubjectList);
  const categoryList = useAppSelector(selectCategoryList);
  const inputSubjectId = useAppSelector(selectInputSubjectId);
  const inputCategoryId = useAppSelector(selectInputCategoryId);
  const inputComment = useAppSelector(selectInputComment);
  const createLoadingState = useAppSelector(selectCreateLoadingState);
  const taskList = useAppSelector(selectTaskList);
  const selectedTask = useAppSelector(selectSelectedTask);
  const dispatch = useAppDispatch();

  function handleChangeSubject(event: SelectChangeEvent) {
    const subjectId = parseInt(event.target.value);
    dispatch(changeSubject(subjectId));
    fetchCategories(subjectId).then((categoryList) => {
      dispatch(setCategoryList(categoryList));
    });
  }

  function handleChangeCategory(event: SelectChangeEvent) {
    dispatch(changeCategory(event.target.value));
  }

  function handleChangeComment(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(changeComment(event.target.value));
  }

  function handleCommentKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCreate();
    }
  }

  function handleCreate() {
    if (!inputCategoryId || isNaN(inputCategoryId)) {
      // User has to select a category first
      return;
    }

    createTask(inputCategoryId).then((task) => {
      postComment(task.id, inputComment)
        .then((comment) => {
          // restore the form
          dispatch(changeSubject(0));
          dispatch(setCategoryList([]));
          dispatch(changeCategory(0));
          dispatch(changeComment(''));
          dispatch(setCreateLoadingState(LoadingState.LOADED));

          // snackbar close timer
          setInterval(() => {
            dispatch(setCreateLoadingState(LoadingState.PENDING));
          }, 3500);

          // add the new task to task list
          task.commentList = [comment];
          const newTaskList: TaskVo[] = _.concat(taskList, [task]);
          dispatch(setTaskList(newTaskList));

          // refresh the selected task
          if (localUser.userId) {
            const selectedTaskId = selectedTask ? selectedTask.id : 0;
            dispatch(setSelectedTaskLoadingState(LoadingState.LOADING));
            fetchSelectedTask(localUser.userId).then((selectedTask) => {
              dispatch(setSelectedTaskLoadingState(LoadingState.LOADED));
              dispatch(setSelectedTask(selectedTask));
              if (selectedTask) {
                if (selectedTaskId !== selectedTask.id) {
                  dispatch(setExpandedAccordion('taskDashboard'));
                } else {
                  dispatch(setExpandedAccordion('switchTask'));
                }
              }
            }).catch(() => {
              dispatch(setSelectedTaskLoadingState(LoadingState.FAILED));
            });
          }
        }).catch(() => {
        dispatch(setCreateLoadingState(LoadingState.FAILED));
      });
    }).catch(() => {
      dispatch(setCreateLoadingState(LoadingState.FAILED));
    });
  }

  return <Box>
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={createLoadingState === LoadingState.LOADED}
    >
      <Alert severity='success'>Successfully created the task.</Alert>
    </Snackbar>

    <Grid container spacing={2}>
      <Grid item md={4} xs={6}>
        <FormControl fullWidth>
          <InputLabel>Subject</InputLabel>
          <Select
            label='Subject'
            value={inputSubjectId === 0 ? '' : String(inputSubjectId)}
            onChange={handleChangeSubject}
          >
            {subjectList.map((subject: SubjectVo) => (
              <MenuItem value={subject.id} key={subject.id}>{subject.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item md={4} xs={6}>
        <FormControl fullWidth>
          <InputLabel>{inputSubjectId === 0 ? 'Please select a subject' : 'Category'}</InputLabel>
          <Select
            label='Category'
            value={inputCategoryId === 0 ? '' : String(inputCategoryId)}
            onChange={handleChangeCategory}
          >
            {categoryList.map((category: CategoryVo) => (
              <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item md={8} xs={12}>
        <FormControl fullWidth>
          <TextField
            label='Comment'
            variant='standard'
            value={inputComment}
            onChange={handleChangeComment}
            onKeyDown={handleCommentKeyDown}
          />
        </FormControl>
      </Grid>

      <Grid item md={4} xs={6}>
        <LoadingButton
          variant='contained'
          color='info'
          loading={createLoadingState === LoadingState.LOADING}
          loadingPosition='start'
          startIcon={<AddOutlinedIcon />}
          onClick={handleCreate}
        >
          CREATE
        </LoadingButton>
      </Grid>
    </Grid>
  </Box>;
};