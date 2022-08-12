import React, { FunctionComponent } from 'react';
import { TaskCard } from '../task-card/TaskCard';
import { LoadingState } from '../../common/enum';
import { fetchTaskPaged } from '../../api/task.api';
import { Box, CircularProgress, Dialog, Grid } from '@mui/material';
import './Worklist.css';
import { getDate, getDateString, getFormalDate, getTodayString } from '../../common/helper';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TaskVo from '../../vo/task.vo';
import { useParams } from 'react-router-dom';

export const ConsoleWorklist: FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = React.useState(getTodayString());
  const [loadingState, setLoadingState] = React.useState(LoadingState.LOADING);
  const [taskList, setTaskList] = React.useState<TaskVo[]>([]);
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const { userId: userIdString } = useParams();
  const userId = parseInt(userIdString as string);

  const handlePickDate = function() {
    setShowDatePicker(true);
  };

  const changeSelectedDate = function(date: Date | null) {
    if (!date) return;
    setLoadingState(LoadingState.LOADING);
    setSelectedDate(getDateString(date));
    setTaskList([]);
    setShowDatePicker(false);
  };

  const loadTaskList = function() {
    fetchTaskPaged({ selectedDate, userId }).then((taskList: TaskVo[]) => {
      setTaskList(taskList);
      setLoadingState(LoadingState.LOADED);
    }).catch(() => {
      setLoadingState(LoadingState.FAILED);
    });
  };

  if (loadingState === LoadingState.LOADING) {
    loadTaskList();
    return <Box textAlign='center' mt='1em'><CircularProgress /></Box>;
  } else if (loadingState === LoadingState.LOADED) {
    return <>
      <Box className='WorklistDateLabel'>
        {getFormalDate(getDate(selectedDate))}
      </Box>

      <Box className='WorklistSelectDateIcon'>
        <CalendarMonthIcon onClick={handlePickDate} />
      </Box>

      <Dialog open={showDatePicker} onClose={() => {
        setShowDatePicker(false);
      }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarPicker
            date={getDate(selectedDate)}
            onChange={changeSelectedDate}
          />
        </LocalizationProvider>
      </Dialog>

      <Grid container spacing={2} mt={0}>
        {taskList.map((task) => (
          <Grid item xs={12} md={6} key={task.id}>
            <TaskCard {...task} />
          </Grid>
        ))}
      </Grid>
    </>;
  }

  return <></>;
};