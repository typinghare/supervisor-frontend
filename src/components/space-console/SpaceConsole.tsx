import React, { FunctionComponent, SyntheticEvent } from 'react';
import { Alert, Box } from '@mui/material';
import { Task } from './task/Task';
import { localUser } from '../../common/local-user';
import { useParams } from 'react-router-dom';


export const SpaceConsole: FunctionComponent = () => {
  const [tabValue, setTabValue] = React.useState('task');

  function handleChange(event: SyntheticEvent, tabValue: string) {
    setTabValue(tabValue);
  }

  const tabPanelStyle = { width: '100%' };

  return <Box>
    <Task />
  </Box>;

  // return <Box>
  //   <AlertBoard {...props} />
  //
  //   <Box sx={{ display: 'flex' }}>
  //     <Tabs
  //       orientation='vertical'
  //       variant='scrollable'
  //       value={tabValue}
  //       onChange={handleChange}
  //       sx={{ borderRight: '1px solid', borderColor: 'divider' }}
  //     >
  //       < Tab label='Task' value='task' />
  //       <Tab label='Category' value='category' />
  //       <Tab label='Subject' value='subject' />
  //     </Tabs>
  //
  //     <TabContext value={tabValue}>
  //       <TabPanel value='task' sx={tabPanelStyle}><Task /></TabPanel>
  //       <TabPanel value='category' sx={tabPanelStyle}><ConsoleCategory /></TabPanel>
  //       <TabPanel value='subject' sx={tabPanelStyle}><ConsoleSubject /></TabPanel>
  //     </TabContext>
  //   </Box>
  // </Box>;
};

const AlertBoard: FunctionComponent = (props) => {
  const { userId: userIdString } = useParams();
  const userId = parseInt(userIdString as string);

  if (userId !== localUser.userId) {
    return <Alert severity='warning' sx={{ mb: 1 }}>
      You cannot access this console.
    </Alert>;
  } else {
    return <></>;
  }
};