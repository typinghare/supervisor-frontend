import { Component, SyntheticEvent } from 'react';
import { Tab, Tabs } from '@mui/material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CategoryIcon from '@mui/icons-material/Category';
import TerminalIcon from '@mui/icons-material/Terminal';
import Worklist from '../../components/worklist/Worklist';
import { TabContext, TabPanel } from '@mui/lab';
import Console from '../../components/console/Console';
import Graph from '../../components/graph/Graph';

export interface MainTabsProps {
  userId: number;
}

export interface MainTabsState {
  tab: string;
}

export default class MainTabs extends Component<MainTabsProps, MainTabsState> {
  constructor(props: MainTabsProps) {
    super(props);

    const match = /#(.*?)(\?.*)?$/.exec(window.location.href);
    const initTab = match ? match[1].toLowerCase() : 'worklist';

    this.state = { tab: initTab };
  }

  handleChange = (event: SyntheticEvent, tab: string) => {
    this.setState({ tab });
  };

  render = () => (
    <>
      <Tabs
        value={this.state.tab}
        onChange={this.handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="worklist" label="Worklist" iconPosition="start" icon={<FactCheckIcon />} />
        <Tab value="graph" label="Graph" iconPosition="start" icon={<EqualizerIcon />} />
        <Tab value="subject" label="Subject" iconPosition="start" icon={<CategoryIcon />} />
        <Tab value="console" label="Console" iconPosition="start" icon={<TerminalIcon />} />
      </Tabs>

      <TabContext value={this.state.tab}>
        <TabPanel value="worklist" id="worklist">
          <Worklist userId={this.props.userId} />
        </TabPanel>
        <TabPanel value="graph">
          <Graph userId={this.props.userId} />
        </TabPanel>
        <TabPanel value="subject">Subject</TabPanel>
        <TabPanel value="console" id="console">
          <Console userId={this.props.userId} />
        </TabPanel>
      </TabContext>
    </>
  );
}
