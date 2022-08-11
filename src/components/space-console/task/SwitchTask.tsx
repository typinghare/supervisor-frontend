/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent } from 'react';
import { Alert, Box, Grid } from '@mui/material';
import { LoadingState } from '../../../common/enum';
import { TaskCardShield } from '../../task-card/TaskCardShield';
import './Task';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectSelectedTask,
  selectTaskList,
  selectTaskListLoadingState,
  setSelectedTask,
  setSelectedTaskLoadingState,
} from '../../../app/slice/TaskSlice';
import { switchSelectedTask } from '../../../api/task.api';
import _ from 'lodash';

export const SwitchTask: FunctionComponent = () => {
  const taskList = useAppSelector(selectTaskList);
  const selectedTask = useAppSelector(selectSelectedTask);
  const taskListLoadingState = useAppSelector(selectTaskListLoadingState);
  const dispatch = useAppDispatch();

  function switchTask(taskId: number) {
    return () => {
      dispatch(setSelectedTaskLoadingState(LoadingState.LOADING));

      switchSelectedTask(taskId).then(() => {
        const newSelectedTask = _.find(taskList, task => task.id === taskId) || null;
        dispatch(setSelectedTask(newSelectedTask));
        dispatch(setSelectedTaskLoadingState(LoadingState.LOADED));
      });
    };
  }

  if (taskListLoadingState === LoadingState.LOADING) {
    return <></>;
  } else if (taskListLoadingState === LoadingState.LOADED) {
    if (taskList.length === 0) {
      return <Box>
        <Alert severity='warning'>User has no task today</Alert>
      </Box>
    }

    return <Box sx={{ padding: '0 1em' }}>
      <Grid container spacing={2} sx={{ marginTop: '0.25em' }}>
        {taskList.map((task) => (
          <Grid
            item
            xs={12}
            md={6}
            key={task.id}
            className='TaskCardItem'
            onClick={switchTask(task.id)}
          >
            <TaskCardShield task={task} shine={!!selectedTask && task.id === selectedTask.id} />
          </Grid>
        ))}
      </Grid>
    </Box>;
  }

  return <></>;
};