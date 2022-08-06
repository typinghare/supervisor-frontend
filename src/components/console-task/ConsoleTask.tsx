import React, { Component } from 'react';
import './ConsoleTask.css';
import TaskDashBoard from '../task-dashboard/TaskDashBoard';
import ConsoleNewTask from './ConsoleNewTask';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import SwitchTask from './SwitchTask';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type AccordionPanel = 'taskDashboard' | 'createTask' | 'switchTask';

export interface ConsoleTaskProps {}

export interface ConsoleTaskState {
  expandedAccordion: AccordionPanel;
}

export default class ConsoleTask extends Component<ConsoleTaskProps, ConsoleTaskState> {
  constructor(props: ConsoleTaskProps) {
    super(props);
    this.state = { expandedAccordion: 'taskDashboard' };
  }

  handleChange =
    (panel: AccordionPanel): React.FormEventHandler =>
    () => {
      this.setState({ expandedAccordion: panel });
    };

  render = () => (
    <div>
      <Accordion expanded={this.state.expandedAccordion === 'taskDashboard'}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={this.handleChange('taskDashboard')}
        >
          <Typography className="ConsoleTaskAccordionSummary">Dashboard</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TaskDashBoard />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={this.state.expandedAccordion === 'createTask'}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={this.handleChange('createTask')}>
          <Typography className="ConsoleTaskAccordionSummary">Create Tasks</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ConsoleNewTask />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={this.state.expandedAccordion === 'switchTask'}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={this.handleChange('switchTask')}>
          <Typography className="ConsoleTaskAccordionSummary">Switch Tasks</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SwitchTask />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
