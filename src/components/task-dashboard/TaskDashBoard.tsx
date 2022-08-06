import { Component } from 'react';
import TaskCard, { TaskCardProps } from '../task-card/TaskCard';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@mui/material';
import { Action, LoadStatus, Stage } from '../../common/enum';
import './TaskDashboard.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PauseIcon from '@mui/icons-material/Pause';
import { fetchSelectedTask, updateTaskStage } from '../../api/task.api';
import TaskComment from '../task-comment/TaskComment';
import { localUser } from '../../common/user';

export interface TaskDashBoardProps {
}

export interface TaskDashBoardState {
  task?: TaskCardProps;
  loadStatus: LoadStatus;
  isRemoveDialogShow: boolean;
}

export default class TaskDashBoard extends Component<TaskDashBoardProps, TaskDashBoardState> {
  constructor(props: TaskDashBoardProps) {
    super(props);
    this.state = {
      task: undefined,
      loadStatus: LoadStatus.LOADED,
      isRemoveDialogShow: false,
    };
    this.start.bind(this);
  }

  loadSelectedTask() {
    fetchSelectedTask(localUser.userId)
      .then((response) => {
        const task = response.data.data;
        if (!task) {
        } else {
          this.setState({
            task: response.data.data,
            loadStatus: LoadStatus.LOADED,
          });
        }
      })
      .catch(() => {
        this.setState({ loadStatus: LoadStatus.FAILED });
      });
  }

  componentDidMount() {
    this.loadSelectedTask();
  }

  render = () => {
    switch (this.state.loadStatus) {
      case LoadStatus.LOADING:
        return <></>;
      case LoadStatus.LOADED:
        const task = this.state.task;
        if (!task) return <></>;
        return (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}><TaskCard {...task} /></Grid>

              {this.buttonGroup(typeof task.stage == 'string' ? parseInt(task.stage) : task.stage)}
            </Grid>
            <TaskComment taskId={task.id} />
          </Box>
        );
    }
  };

  buttonGroup(stage: Stage) {
    switch (stage) {
      case Stage.PENDING:
        return (
          <Box className='ConsoleTaskButtonGroup'>
            {this.buttonStart()}
            {this.buttonRemove()}
          </Box>
        );
      case Stage.ONGOING:
        return (
          <Box className='ConsoleTaskButtonGroup'>
            {this.buttonPause()}
            {this.buttonFinish()}
            {this.buttonRemove()}
          </Box>
        );
      case Stage.PAUSED:
        return (
          <Box className='ConsoleTaskButtonGroup'>
            {this.buttonResume()}
            {this.buttonFinish()}
            {this.buttonRemove()}
          </Box>
        );
      case Stage.ENDED:
        return <Box className='ConsoleTaskButtonGroup'>{this.buttonRemove()}</Box>;
    }
  }

  buttonStart = () => (
    <Button
      variant='contained'
      color='success'
      className='ConsoleTaskButton'
      startIcon={<PlayArrowIcon />}
      onClick={this.start}
    >
      START
    </Button>
  );

  buttonPause = () => (
    <Button
      variant='contained'
      color='warning'
      className='ConsoleTaskButton'
      startIcon={<PauseIcon />}
      onClick={this.pause}
    >
      PAUSE
    </Button>
  );

  buttonResume = () => (
    <Button
      variant='contained'
      color='success'
      className='ConsoleTaskButton'
      startIcon={<ArrowRightIcon />}
      onClick={this.resume}
    >
      RESUME
    </Button>
  );

  buttonFinish = () => (
    <Button
      variant='contained'
      color='info'
      className='ConsoleTaskButton'
      startIcon={<DoneIcon />}
      onClick={this.finish}
    >
      FINISH
    </Button>
  );

  buttonRemove = () => (
    <>
      <Button
        variant='contained'
        color='error'
        className='ConsoleTaskButton'
        startIcon={<DeleteIcon />}
        onClick={this.remove}
      >
        REMOVE
      </Button>
      <Dialog open={this.state.isRemoveDialogShow} onClose={this.handleRemoveClose}>
        <DialogTitle>Alert</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure to remove this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={this.handleRemoveClose} autoFocus>
            NOT NOW
          </Button>
          <Button variant='text' color='error' onClick={this.handleRemoveClose}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  start = () => {
    const task = this.state.task;
    if (task) {
      updateTaskStage(task.id, Action.START).then((response) => {
        const task = response.data.data
        this.setState({ task });
      });
    }
  };

  pause = () => {
    const task = this.state.task;
    if (task) {
      updateTaskStage(task.id, Action.PAUSE).then((response) => {
        this.setState({
          task: response.data.data,
        });
      });
    }
  };

  resume = () => {
    const task = this.state.task;
    if (task) {
      updateTaskStage(task.id, Action.RESUME).then((response) => {
        this.setState({
          task: response.data.data,
        });
      });
    }
  };

  finish = () => {
    const task = this.state.task;
    if (task) {
      updateTaskStage(task.id, Action.FINISH).then((response) => {
        this.setState({
          task: response.data.data,
        });
      });
    }
  };

  remove = () => {
    const task = this.state.task;
    if (task) {
      this.handleRemoveOpen();
    }
  };

  handleRemoveOpen = () => {
    this.setState({ isRemoveDialogShow: true });
  };

  handleRemoveClose = () => {
    this.setState({ isRemoveDialogShow: false });
  };

  handleRemove = () => {
    const task = this.state.task;
    if (task) {
      updateTaskStage(task.id, Action.REMOVE).then((response) => {
        this.setState({
          task: response.data.data,
        });
      });
    }
  };
}
