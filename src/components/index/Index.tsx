import { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import { localUser } from '../../common/local-user';
import history from '../../common/history';

export const Index: FunctionComponent = () => {
  if (localUser.userId) {
    history.push(`/supervisor/space/${localUser.userId}`);
    window.location.reload();
  }

  return <Box>

  </Box>;
};