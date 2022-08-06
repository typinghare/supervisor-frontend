import { Component } from 'react';
import TaskCard, { TaskCardProps } from './TaskCard';
import { Box } from '@mui/material';
import './Taskcard.css';

export interface TaskCardShieldProps {
  task: TaskCardProps;
  shine: boolean;
}

export default class TaskCardShield extends Component<TaskCardShieldProps, any> {
  render = () => (
    <Box className={this.props.shine ? 'TaskCardShield' : ''}>
      <TaskCard {...this.props.task}></TaskCard>
    </Box>
  );
}
