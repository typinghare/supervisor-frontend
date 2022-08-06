import React from 'react';
import { Box, Container } from '@mui/material';
import MainTabs from '../main-tabs/MainTabs';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { localUser } from '../../common/user';

export default function Space() {
  const { userId } = useParams();
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  if (!token) {
    // not yet login
    localUser.token = '';
    localUser.userId = 1;
  } else {
    // already login
    localUser.token = token;
    localUser.userId = 1; // FIXED: dispatch
    // fetchUserId().then((response) => {
    //   if (response.status === 200) {
    //     localUser.userId = response.data.data.userId;
    //   }
    // });
  }

  if (typeof userId == 'string') {
    const _userId = parseInt(userId);
    return (
      <>
        <Container>
          <MainTabs userId={_userId} />
        </Container>
      </>
    );
  } else {
    // incorrect user id
    return <Box>Incorrect user id</Box>;
  }
}
