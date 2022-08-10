import { SupervisorRouter } from '../supervisor-router/SupervisorRouter';
import { useCookies } from 'react-cookie';
import { CookieKey } from '../../common/constant';
import { Navigation } from '../navigation/Navigation';
import { localUser } from '../../common/local-user';

export default function App() {
  // initialize local user
  const [cookies] = useCookies([CookieKey.USER_ID, CookieKey.TOKEN, CookieKey.USERNAME]);
  const userId = cookies[CookieKey.USER_ID];
  const token = cookies[CookieKey.TOKEN];
  const username = cookies[CookieKey.USERNAME];
  if (userId && token) localUser.signIn(userId, token, username);

  // App DOMs
  return (
    <>
      <Navigation />
      <SupervisorRouter />
    </>
  );
}