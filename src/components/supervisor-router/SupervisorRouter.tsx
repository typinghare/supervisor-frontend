import React, { FunctionComponent } from 'react';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { Space } from '../space/Space';
import { SignIn } from '../sign-in/SignIn';
import { Index } from '../index/Index';
import { createBrowserHistory } from 'history';
import { About } from '../about/About';

const history = createBrowserHistory({ window });

export const SupervisorRouter: FunctionComponent = () => {
  return <HistoryRouter basename='/supervisor' history={history}>
    <Routes>

      <Route path='/' element={<Index />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/about' element={<About />} />
      <Route path='/space/:userId' element={<Space />} />

    </Routes>
  </HistoryRouter>;
};