import { Alert, Box, Button, FormControl, Paper, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import React, { FunctionComponent } from 'react';
import KeyIcon from '@mui/icons-material/Key';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  alertHidden,
  alertShow,
  selectAlertShow,
  selectPassword,
  selectUsername,
  setPassword,
  setUsername,
} from '../../app/slice/signInSlice';
import { signIn } from '../../api/user.api';
import { localUser } from '../../common/local-user';
import { useCookies } from 'react-cookie';
import { CookieKey } from '../../common/constant';
import moment from 'moment';
import history from '../../common/history';

export const SignIn: FunctionComponent = () => {
  if (localUser.isSignedIn) {
    history.push(`/supervisor/space/${localUser.userId}`);
    window.location.reload();
  }

  const alertShow = useAppSelector(selectAlertShow);

  return <Box>
    <Alert severity='error' sx={{ visibility: alertShow ? 'visible' : 'hidden' }}>
      Your username or password is incorrect. Please try again.
    </Alert>
    <Paper
      elevation={3}
      sx={{
        width: { md: '20%', sm: '80%' },
        margin: { md: '8em auto', sm: '2em auto' },
        padding: '1.5em',
      }}>
      <FormControl sx={{ width: '100%' }}>
        <UsernameInput />

        <PasswordInput />

        <Box>
          <SubmitButton />
        </Box>
      </FormControl>
    </Paper>
  </Box>;
};

const UsernameInput: FunctionComponent = () => {
  const username = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(event.target.value));
  };

  return <>
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField
        label='username'
        variant='standard'
        value={username}
        sx={{ width: '100%' }}
        onChange={handleChange}
        role='username'
      />
    </Box>
  </>;
};

const PasswordInput: FunctionComponent = () => {
  const password = useAppSelector(selectPassword);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(event.target.value));
  };

  return <>
    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2.5 }}>
      <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField
        label='password'
        variant='standard'
        type='password'
        value={password}
        sx={{ width: '100%' }}
        onChange={handleChange}
        role='password'
      />
    </Box>
  </>;
};

const SubmitButton: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUsername);
  const password = useAppSelector(selectPassword);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCookie] = useCookies([CookieKey.USER_ID, CookieKey.TOKEN, CookieKey.USERNAME]);

  return <Button
    variant='contained'
    color='info'
    sx={{ float: 'right' }}
    role='submit'
    onClick={() => {
      signIn(username, password).then(userInfo => {
        dispatch(alertHidden());
        localUser.signIn(userInfo.userId, userInfo.token, userInfo.username);

        // set cookies
        const expires = moment().add(12, 'months').toDate();
        setCookie(CookieKey.USER_ID, localUser.userId, { path: '/supervisor', expires });
        setCookie(CookieKey.TOKEN, localUser.token, { path: '/supervisor', expires });
        setCookie(CookieKey.USERNAME, localUser.username, { path: '/supervisor', expires });
      }).catch(() => {
        dispatch(alertShow());
        dispatch(setPassword(''));
      });
    }}
  >
    SIGN IN
  </Button>;
};