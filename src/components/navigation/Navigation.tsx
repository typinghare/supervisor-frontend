import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { localUser } from '../../common/local-user';
import history from '../../common/history';

export const Navigation: FunctionComponent = () => {
  function handleTitleClick() {
    const userId = localUser.userId || 0;
    history.push(`/supervisor/space/${userId}`);
    window.location.reload();
  }

  return <AppBar position='static' sx={{ padding: '0 !important' }}>
    <Toolbar sx={{ minHeight: '3em' }}>
      <Typography
        sx={{ fontSize: '1.25em', fontWeight: 'bold', fontStyle: 'italic', cursor: 'pointer' }}
        onClick={handleTitleClick}
      >
        Supervisor 2
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <AboutLink />
        {(localUser.isSignedIn && <UserInfoBlock />) || <SignInLink />}
      </Box>
    </Toolbar>
  </AppBar>;
};

const AboutLink: FunctionComponent = () => {
  return <Link href='/supervisor/about' sx={{ color: 'white', display: 'inline-block', margin: '0 1em' }}>
    About
  </Link>;
};

const UserInfoBlock: FunctionComponent = () => {
  return <Link href='#' sx={{ color: 'white', display: 'inline-block', float: 'right' }}>
    {localUser.username}
  </Link>;
};

const SignInLink: FunctionComponent = () => {
  return <Link
    href='/supervisor/sign-in'
    sx={{ color: 'white', display: 'inline-block', float: 'right' }}
  >
    Sign In
  </Link>;
};