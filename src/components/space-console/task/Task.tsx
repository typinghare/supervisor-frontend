/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent } from 'react';
import './Task.css';
import { Dashboard } from './Dashboard';
import { CreateTask } from './CreateTask';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { SwitchTask } from './SwitchTask';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectExpandedAccordion,
  setExpandedAccordion,
  setSelectedTask,
  setSelectedTaskLoadingState,
  setSubjectList,
  setSubjectListLoadingState,
  setTaskList,
  setTaskListLoadingState,
} from '../../../app/slice/TaskSlice';
import { fetchSelectedTask, fetchTaskPaged } from '../../../api/task.api';
import { getTodayString } from '../../../common/helper';
import { LoadingState } from '../../../common/enum';
import { fetchSubjects } from '../../../api/subject.api';

export type AccordionPanel = 'taskDashboard' | 'createTask' | 'switchTask';

export const Task: FunctionComponent = () => {
  const { userId: userIdString } = useParams();
  const userId = parseInt(userIdString as string);
  const dispatch = useAppDispatch();
  const expandedAccordion = useAppSelector(selectExpandedAccordion);

  React.useEffect(() => {
    dispatch(setTaskListLoadingState(LoadingState.LOADING));
    fetchTaskPaged({ selectedDate: getTodayString(), userId }).then((taskList) => {
      dispatch(setTaskList(taskList));
      dispatch(setTaskListLoadingState(LoadingState.LOADED));
    }).catch(() => {
      dispatch(setTaskListLoadingState(LoadingState.FAILED));
    });

    dispatch(setSelectedTaskLoadingState(LoadingState.LOADING));
    fetchSelectedTask(userId).then((selectedTask) => {
      dispatch(setSelectedTaskLoadingState(LoadingState.LOADED));
      dispatch(setSelectedTask(selectedTask));
    }).catch(() => {
      dispatch(setSelectedTaskLoadingState(LoadingState.FAILED));
    });

    dispatch(setSubjectListLoadingState(LoadingState.LOADING));
    fetchSubjects(userId).then((subjectList) => {
      dispatch(setSubjectList(subjectList));
      dispatch(setSubjectListLoadingState(LoadingState.LOADED));
    });
  }, []);


  function handleChange(panel: AccordionPanel): React.FormEventHandler {
    return () => {
      dispatch(setExpandedAccordion(panel));
    };
  }

  return <div>
    <Accordion expanded={expandedAccordion === 'taskDashboard'}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={handleChange('taskDashboard')}
      >
        <Typography className='ConsoleTaskAccordionSummary'>Dashboard</Typography>
      </AccordionSummary>
      <AccordionDetails><Dashboard /></AccordionDetails>
    </Accordion>
    <Accordion expanded={expandedAccordion === 'createTask'}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={handleChange('createTask')}>
        <Typography className='ConsoleTaskAccordionSummary'>Create Tasks</Typography>
      </AccordionSummary>
      <AccordionDetails><CreateTask /></AccordionDetails>
    </Accordion>
    <Accordion expanded={expandedAccordion === 'switchTask'}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={handleChange('switchTask')}>
        <Typography className='ConsoleTaskAccordionSummary'>Switch Tasks</Typography>
      </AccordionSummary>
      <AccordionDetails><SwitchTask /></AccordionDetails>
    </Accordion>
  </div>;
};