import { Component } from 'react';
import { Box, Grid } from '@mui/material';
import { TaskCardProps } from '../task-card/TaskCard';
import { LoadStatus } from '../../common/enum';
import { fetchSelectedTask, fetchTaskPaged, switchSelectedTask } from '../../api/task.api';
import { localUser } from '../../common/user';
import TaskVo from '../../vo/task.vo';
import moment from 'moment';
import { DATE_FORMAT } from '../../common/constant';
import TaskCardShield from '../task-card/TaskCardShield';
import './ConsoleTask';

export interface SwitchTaskProps {}

export interface SwitchTaskState {
  loadStatus: LoadStatus;
  taskList: TaskCardProps[];
  selectedKey: number;
}

export default class SwitchTask extends Component<SwitchTaskProps, SwitchTaskState> {
  constructor(props: SwitchTaskProps) {
    super(props);
    this.state = {
      loadStatus: LoadStatus.LOADING,
      taskList: [],
      selectedKey: 0,
    };
  }

  componentDidMount() {
    fetchTaskPaged({ selectedDate: moment().format(DATE_FORMAT), userId: localUser.userId }).then(
      (response) => {
        const taskList = response.data.data;
        fetchSelectedTask(localUser.userId).then((response) => {
          const selectedTask: TaskVo = response.data.data;
          if (!selectedTask) {
            this.setState({
              taskList,
              selectedKey: 0,
              loadStatus: LoadStatus.LOADED,
            });
          } else {
            this.setState({
              taskList,
              selectedKey: selectedTask.id,
              loadStatus: LoadStatus.LOADED,
            });
          }
        });
      }
    );
  }

  render = () => {
    if (this.state.loadStatus === LoadStatus.LOADING) {
      return <></>;
    } else if (this.state.loadStatus === LoadStatus.LOADED && this.state.taskList) {
      return <>{this.workList()}</>;
    }
  };

  workList = () => (
    <Box sx={{ padding: '0 1em' }}>
      <Grid container spacing={2} sx={{ marginTop: '0.25em' }}>
        {this.state.taskList.map((task: TaskCardProps) => (
          <Grid
            item
            xs={12}
            md={6}
            key={task.id}
            className="TaskCardItem"
            onClick={() => {
              this.switchSelectedTask(task.id);
            }}
          >
            <TaskCardShield task={task} shine={task.id === this.state.selectedKey} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  switchSelectedTask = (taskId: number) => {
    switchSelectedTask(taskId).then((response) => {
      if (response.status === 200) {
        this.setState({ selectedKey: taskId });
      }
    });
  };
}
