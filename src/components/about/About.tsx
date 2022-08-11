import { FunctionComponent } from 'react';
import { Container } from '@mui/material';
import { Changelog } from './Changelog';

export const About: FunctionComponent = () => {
  return <Container>
    <Changelog />
  </Container>;
};