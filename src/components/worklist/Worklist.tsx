import { Component } from 'react';
import TaskCard, { TaskCardProps } from '../task-card/TaskCard';
import { LoadStatus } from '../../common/enum';
import { fetchTaskPaged } from '../../api/task.api';
import { Box, CircularProgress, Dialog, DialogTitle, Grid } from '@mui/material';
import moment from 'moment';
import { DATE_FORMAT } from '../../common/constant';
import './Worklist.css';
import { getFormalDate } from '../../common/helper';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export interface WorklistProps {
  userId: number;
}

export interface WorklistState {
  selectedDate: string;
  loadStatus: LoadStatus;
  taskList: TaskCardProps[];
  openDatePickDialog: boolean;
}

export default class Worklist extends Component<WorklistProps, WorklistState> {
  constructor(props: WorklistProps) {
    super(props);
    this.state = {
      selectedDate: moment().format(DATE_FORMAT),
      loadStatus: LoadStatus.LOADING,
      taskList: [],
      openDatePickDialog: false,
    };
  }

  loadTaskList() {
    fetchTaskPaged({
      selectedDate: this.state.selectedDate,
      userId: this.props.userId,
    }).then((response) => {
      this.setState({
        taskList: response.data.data || [],
        loadStatus: LoadStatus.LOADED,
      });
    });
  }

  componentDidMount() {
    this.loadTaskList();
  }

  componentDidUpdate() {
    if (this.state.loadStatus === LoadStatus.LOADING) this.loadTaskList();
  }

  handlePickDate = () => {
    this.setState({ openDatePickDialog: true });
  };

  render = () => {
    if (this.state.loadStatus === LoadStatus.LOADING) {
      return (
        <Box textAlign="center" mt="1em">
          <CircularProgress />
        </Box>
      );
    }

    if (this.state.loadStatus === LoadStatus.LOADED) {
      return (
        <>
          <Box className="WorklistDateLabel">
            {getFormalDate(moment(this.state.selectedDate, DATE_FORMAT).toDate())}
          </Box>
          <Box className="WorklistSelectDateIcon">
            <CalendarMonthIcon onClick={this.handlePickDate} />
          </Box>

          <Dialog open={this.state.openDatePickDialog}>
            <DialogTitle>Pick up a date</DialogTitle>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CalendarPicker
                date={moment(this.state.selectedDate, DATE_FORMAT).toDate()}
                onChange={this.changeSelectedDate}
              />
            </LocalizationProvider>
          </Dialog>

          <Grid container spacing={2} sx={{ marginTop: '0.25em' }}>
            {this.state.taskList.map((task) => (
              <Grid item xs={12} md={6} key={task.id}>
                <TaskCard {...task} />
              </Grid>
            ))}
          </Grid>
        </>
      );
    }
  };

  changeSelectedDate = (date: Date | null) => {
    if (!date) return;
    this.setState({
      loadStatus: LoadStatus.LOADING,
      selectedDate: moment(date).format(DATE_FORMAT),
      taskList: [],
      openDatePickDialog: false,
    });
  };
}
