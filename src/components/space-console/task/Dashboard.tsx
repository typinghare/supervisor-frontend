/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent } from 'react';
import { TaskCard } from '../../task-card/TaskCard';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@mui/material';
import { Action, LoadingState, Stage } from '../../../common/enum';
import './TaskDashboard.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PauseIcon from '@mui/icons-material/Pause';
import TaskComment from '../../task-comment/TaskComment';
import { parseEnum } from '../../../common/helper';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectSelectedTask,
  selectSelectedTaskLoadingState,
  selectTaskList,
  setSelectedTask,
  setTaskList,
} from '../../../app/slice/TaskSlice';
import { removeTask, updateTaskStage } from '../../../api/task.api';

export const Dashboard: FunctionComponent = () => {
  const task = useAppSelector(selectSelectedTask);
  const selectedTask = useAppSelector(selectSelectedTask);
  const selectedTaskLoadingState = useAppSelector(selectSelectedTaskLoadingState);
  const taskList = useAppSelector(selectTaskList);
  const dispatch = useAppDispatch();

  const [showRemoveDialog, setShowRemoveDialog] = React.useState(false);

  function changeTaskStage(action: Action) {
    return () => {
      if (selectedTask === null) return;
      updateTaskStage(selectedTask.id, action).then((task) => {
        dispatch(setSelectedTask(task));
      });
    };
  }

  function StartButton() {
    return <Button
      variant='contained'
      color='success'
      className='ConsoleTaskButton'
      startIcon={<PlayArrowIcon />}
      onClick={() => {
        dispatch(changeTaskStage(Action.START));
      }}
    >
      START
    </Button>;
  }

  function PauseButton() {
    return <Button
      variant='contained'
      color='warning'
      className='ConsoleTaskButton'
      startIcon={<PauseIcon />}
      onClick={() => {
        dispatch(changeTaskStage(Action.PAUSE));
      }}
    >
      PAUSE
    </Button>;
  }

  function ResumeButton() {
    return <Button
      variant='contained'
      color='success'
      className='ConsoleTaskButton'
      startIcon={<ArrowRightIcon />}
      onClick={() => {
        dispatch(changeTaskStage(Action.RESUME));
      }}
    >
      RESUME
    </Button>;
  }

  function FinishButton() {
    return <Button
      variant='contained'
      color='info'
      className='ConsoleTaskButton'
      startIcon={<DoneIcon />}
      onClick={() => {
        dispatch(changeTaskStage(Action.FINISH));
      }}
    >
      FINISH
    </Button>;
  }

  function RemoveButton() {
    return <>
      <Button
        variant='contained'
        color='error'
        className='ConsoleTaskButton'
        startIcon={<DeleteIcon />}
        onClick={handleRemoveOpen}
      >
        REMOVE
      </Button>
      <Dialog open={showRemoveDialog} onClose={handleRemoveClose}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure to remove this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={handleRemoveClose} autoFocus>
            NOT NOW
          </Button>
          <Button variant='text' color='error' onClick={handleRemove}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>;
  }

  function ButtonGroup(stage: Stage) {
    switch (stage) {
      case Stage.PENDING:
        return <Box className='ConsoleTaskButtonGroup'>
          <StartButton />
          <RemoveButton />
        </Box>;
      case Stage.ONGOING:
        return <Box className='ConsoleTaskButtonGroup'>
          <PauseButton />
          <FinishButton />
          <RemoveButton />
        </Box>;
      case Stage.PAUSED:
        return <Box className='ConsoleTaskButtonGroup'>
          <ResumeButton />
          <FinishButton />
          <RemoveButton />
        </Box>;
      case Stage.ENDED:
        return <Box className='ConsoleTaskButtonGroup'>
          <RemoveButton />
        </Box>;
    }
  }

  function handleRemove() {
    if (selectedTask) {
      const taskId = selectedTask.id;
      removeTask(taskId).then(() => {
        dispatch(setSelectedTask(null));

        // remove the task from the task list
        const newTaskList = [];
        for (const task of taskList) {
          if (task.id !== taskId) newTaskList.push(task);
        }
        dispatch(setTaskList(newTaskList));
      });
    }

    handleRemoveClose();
  }

  function handleRemoveOpen() {
    setShowRemoveDialog(true);
  }

  function handleRemoveClose() {
    setShowRemoveDialog(false);
  }

  if (selectedTaskLoadingState === LoadingState.LOADING) {
    return <></>;
  } else if (selectedTaskLoadingState === LoadingState.LOADED) {
    if (task === null) {
      return <Box>
        <Alert severity='warning'>User currently has no selected task.</Alert>
      </Box>;
    } else {
      return <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}><TaskCard {...task} /></Grid>
          {ButtonGroup(parseEnum(task.stage))}
        </Grid>
        <TaskComment taskId={task.id} />
      </Box>;
    }
  }

  return <></>;
};