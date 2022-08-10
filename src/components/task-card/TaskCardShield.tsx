import { FunctionComponent } from 'react';
import {TaskCard} from './TaskCard';
import { Box } from '@mui/material';
import './Taskcard.css';
import TaskVo from '../../vo/task.vo';

export interface TaskCardShieldProps {
  task: TaskVo;
  shine: boolean;
}

export const TaskCardShield: FunctionComponent<TaskCardShieldProps> = (props) => {
  return <Box className={props.shine ? 'TaskCardShield' : ''}>
    <TaskCard {...props.task}></TaskCard>
  </Box>;
};