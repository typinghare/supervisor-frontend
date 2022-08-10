import React, { FunctionComponent } from 'react';
import './ConsoleTask.css';
import TaskDashBoard from '../../task-dashboard/TaskDashBoard';
import { CreateTask } from './CreateTask';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { SwitchTask } from './SwitchTask';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type AccordionPanel = 'taskDashboard' | 'createTask' | 'switchTask';

export const Task: FunctionComponent = () => {
  const [expandedAccordion, setExpandedAccordion] = React.useState<AccordionPanel>('taskDashboard');

  function handleChange(panel: AccordionPanel): React.FormEventHandler {
    return () => setExpandedAccordion(panel);
  }

  return <div>
    <Accordion expanded={expandedAccordion === 'taskDashboard'}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={handleChange('taskDashboard')}
      >
        <Typography className='ConsoleTaskAccordionSummary'>Dashboard</Typography>
      </AccordionSummary>
      <AccordionDetails><TaskDashBoard /></AccordionDetails>
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