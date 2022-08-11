/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import { Box, Container, Tab, Tabs } from '@mui/material';
import React, { FunctionComponent } from 'react';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import EqualizerIcon from '@mui/icons-material/Equalizer';
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
      <Container sx={{ padding: { xs: '0 !important' }, fontSize: { xs: '0.75em !important' } }}>
        <Tabs
          value={spaceTab}
          onChange={handleChange}
          textColor='secondary'
          indicatorColor='secondary'
        >
          <Tab value='worklist' label='Worklist' iconPosition='start' icon={<FactCheckIcon />} />
          <Tab value='graph' label='Graph' iconPosition='start' icon={<EqualizerIcon />} />
          {/*<Tab value='subject' label='Subject' iconPosition='start' icon={<CategoryIcon />} />*/}
          <Tab value='console' label='Console' iconPosition='start' icon={<TerminalIcon />} />
        </Tabs>

        <TabContext value={spaceTab}>
          <TabPanel value='worklist' sx={{ padding: { xs: '12px !important' } }}>
            <ConsoleWorklist />
          </TabPanel>
          <TabPanel value='graph' sx={{ padding: { xs: '12px !important' } }}>
            <Graph userId={userId} />
          </TabPanel>
          {/*<TabPanel value='subject' sx={{ padding: { xs: '12px !important' } }}>Subject</TabPanel>*/}
          <TabPanel value='console' sx={{ padding: { xs: '12px !important' } }}>
            <SpaceConsole />
          </TabPanel>
        </TabContext>
      </Container>
    );
  } else {
    // incorrect user id
    return <Box>Incorrect user id</Box>;
  }
};