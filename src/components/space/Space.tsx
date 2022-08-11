/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import { Box, Container, Tab, Tabs } from '@mui/material';
import React, { FunctionComponent } from 'react';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CategoryIcon from '@mui/icons-material/Category';
import TerminalIcon from '@mui/icons-material/Terminal';
import { TabContext, TabPanel } from '@mui/lab';
import { ConsoleWorklist } from '../worklist/Worklist';
import Graph from '../graph/Graph';
import { SpaceConsole } from '../space-console/SpaceConsole';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeSpaceTab, selectSpaceTab } from '../../app/slice/SpaceSlice';

export const Space: FunctionComponent = () => {
  const { userId: userIdString } = useParams();
  const spaceTab = useAppSelector(selectSpaceTab);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const match = /#(.*?)(\?.*)?$/.exec(window.location.href);
    if (match) {
      const value = match[1].toLowerCase();
      if (spaceTab !== value) dispatch(changeSpaceTab(value));
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, value: string) => {
    // const href = window.location.href;
    // const match = /[^#]*/.exec(href);
    // if (match) history.push(match[1] + `#${value}`);
    dispatch(changeSpaceTab(value));
  };

  if (typeof userIdString == 'string' && !isNaN(parseInt(userIdString))) {
    const userId = parseInt(userIdString);
    return (
      <Container>
        <Tabs
          value={spaceTab}
          onChange={handleChange}
          textColor='secondary'
          indicatorColor='secondary'
          aria-label='secondary tabs example'
        >
          <Tab value='worklist' label='Worklist' iconPosition='start' icon={<FactCheckIcon />} />
          <Tab value='graph' label='Graph' iconPosition='start' icon={<EqualizerIcon />} />
          <Tab value='subject' label='Subject' iconPosition='start' icon={<CategoryIcon />} />
          <Tab value='console' label='Console' iconPosition='start' icon={<TerminalIcon />} />
        </Tabs>

        <TabContext value={spaceTab}>
          <TabPanel value='worklist'>
            <ConsoleWorklist />
          </TabPanel>
          <TabPanel value='graph'>
            <Graph userId={userId} />
          </TabPanel>
          <TabPanel value='subject'>Subject</TabPanel>
          <TabPanel value='console'>
            <SpaceConsole userId={userId} />
          </TabPanel>
        </TabContext>
      </Container>
    );
  } else {
    // incorrect user id
    return <Box>Incorrect user id</Box>;
  }
};