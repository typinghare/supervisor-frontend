import { Component, SyntheticEvent } from 'react';
import { Alert, Box, Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import './Console.css';
import ConsoleTask from '../console-task/ConsoleTask';
import ConsoleCategory from '../console-category/ConsoleCategory';
import ConsoleSubject from '../console-subject/ConsoleSubject';
import { localUser } from '../../common/user';

export interface ConsoleProps {
  userId: number;
}

export interface ConsoleState {
  tabValue: string;
}

export default class Console extends Component<ConsoleProps, ConsoleState> {
  constructor(props: ConsoleProps) {
    super(props);
    this.state = { tabValue: 'ConsoleTask' };
    this.handleChange.bind(this);
  }

  handleChange = (event: SyntheticEvent, tabValue: string) => {
    this.setState({ tabValue });
  };

  render = () => (
    <>
      {this.props.userId !== localUser.userId && (
        <Alert severity="warning" sx={{ marginBottom: '1em' }}>
          You cannot access this console.
        </Alert>
      )}
      <Box sx={{ display: 'flex' }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={this.state.tabValue}
          onChange={this.handleChange}
          className="ConsoleTabs"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Task" value="ConsoleTask" />
          <Tab label="Category" value="ConsoleCategory" />
          <Tab label="Subject" value="ConsoleSubject" />
        </Tabs>

        <TabContext value={this.state.tabValue}>
          <TabPanel value="ConsoleTask" className="ConsoleTabContext">
            <ConsoleTask />
          </TabPanel>
          <TabPanel value="ConsoleCategory" className="ConsoleTabContext">
            <ConsoleCategory />
          </TabPanel>
          <TabPanel value="ConsoleSubject" className="ConsoleTabContext">
            <ConsoleSubject />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
