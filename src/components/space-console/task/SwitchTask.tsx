import React, { FunctionComponent } from 'react';
import { Box, Grid } from '@mui/material';
import { LoadingState } from '../../../common/enum';
import { fetchSelectedTask, fetchTaskPaged, switchSelectedTask } from '../../../api/task.api';
import TaskVo from '../../../vo/task.vo';
import { TaskCardShield } from '../../task-card/TaskCardShield';
import './Task';
import { getTodayString } from '../../../common/helper';
import { useParams } from 'react-router-dom';

export const SwitchTask: FunctionComponent = () => {
  const [loadingState, setLoadingState] = React.useState(LoadingState.LOADING);
  const [taskList, setTaskList] = React.useState<TaskVo[]>([]);
  const [selectedKey, setSelectedKey] = React.useState(0);

  const { userId: userIdString } = useParams();
  const userId = parseInt(userIdString as string);

  React.useEffect(() => {
    fetchTaskPaged({ selectedDate: getTodayString(), userId }).then(
      (taskList) => {
        fetchSelectedTask(userId).then((selectedTask) => {
          setTaskList(taskList);
          setLoadingState(LoadingState.LOADED);
          setSelectedKey(selectedTask ? selectedTask.id : 0);
        });
      },
    );
  });

  function switchTask(taskId: number) {
    switchSelectedTask(taskId).then(() => {
      setSelectedKey(taskId);
    });
  }

  if (loadingState === LoadingState.LOADING) {
    return <></>;
  } else if (loadingState === LoadingState.LOADED) {
    return <Box sx={{ padding: '0 1em' }}>
      <Grid container spacing={2} sx={{ marginTop: '0.25em' }}>
        {taskList.map((task) => (
          <Grid
            item
            xs={12}
            md={6}
            key={task.id}
            className='TaskCardItem'
            onClick={() => {
              switchTask(task.id);
            }}
          >
            <TaskCardShield task={task} shine={task.id === selectedKey} />
          </Grid>
        ))}
      </Grid>
    </Box>;
  }

  return <></>;
};