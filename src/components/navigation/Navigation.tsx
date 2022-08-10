import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import history from '../../common/history';
import { localUser } from '../../common/local-user';

export const Navigation: FunctionComponent = () => (
  <AppBar position='static' sx={{ padding: '0 !important' }}>
    <Toolbar sx={{ minHeight: '3em' }}>
      <Typography sx={{ fontSize: '1.25em', fontWeight: 'bold', fontStyle: 'italic' }}>Supervisor 2</Typography>
      <Box sx={{ flexGrow: 1 }}>
        <AboutLink />
        {(localUser.isSignedIn && <UserInfoBlock />) || <SignInLink />}
      </Box>
    </Toolbar>
  </AppBar>
);

const AboutLink: FunctionComponent = () => {
  return <Link href='#' sx={{ color: 'white', display: 'inline-block', margin: '0 1em' }}>
    About
  </Link>;
};

const UserInfoBlock: FunctionComponent = () => {
  return <Link href='#' sx={{ color: 'white', display: 'inline-block', float: 'right' }}>
    {localUser.username}
  </Link>;
};

const SignInLink: FunctionComponent = () => {
  function toSignInPage() {
    history.push('/supervisor/sign-in');
    window.location.reload();
  }

  return <Link href='#' sx={{ color: 'white', display: 'inline-block', float: 'right' }} onClick={toSignInPage}>
    Sign In
  </Link>;
};