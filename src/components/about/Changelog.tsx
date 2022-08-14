/* eslint-disable react/jsx-pascal-case */
import { FunctionComponent } from 'react';
import { Alert, Box, BoxProps, Typography } from '@mui/material';
import { Changelog_2_0_0 } from './changelog/Changelog_2_0_0';
import './Changelog.css';
import { Changelog_2_1_0 } from './changelog/Changelog_2_1_0';
import { Changelog_2_1_1 } from './changelog/Changelog_2_1_1';

export const Changelog: FunctionComponent = () => {
  return <Box>
    <Alert severity='info' sx={{ marginTop: '1em' }}>
      <Typography variant='h5'>Statement</Typography>
      <Typography variant='body1' mb={1}>
        The earliest version of <b>Supervisor</b> was developed in 2019 when I was a sophomore student.
        It accompanied me for a half year, and I kept myself self-disciplined with its assistance.
        But after then I indulged myself in playing computer games due to the Covid-19 Lockdown Policy,
        not using it anymore.
        Even worse, I lost all my source code after wrongly formatting my computer without pushing it to any remote
        repository.
      </Typography>
      <Typography variant='body1' mb={1}>
        Now, I am suffering from the desperation of solitary after immigrating to the United States,
        without a chance to go to university and pursue my favorite subject, computer science.
        Next month my family will move to Boston, a city with better social security than Chicago,
        where I am living right now. I hope I can restart my transient life there.
      </Typography>
      <Typography variant='body1' mb={1}>
        By remaking <b>Supervisor</b>, I want myself to delve into study once again, just like what I did three years
        ago.
        My friends, coworkers, classmates, teammates, all of you guys can supervise me and witness my growth and
        change.
      </Typography>
      <Typography variant='body1'>
        —March 18, 2022
      </Typography>
    </Alert>

    <Typography variant='h4' mt={4} sx={{ color: 'dodgerblue' }}>
      Changelog
    </Typography>

    <Changelog_2_0_0 />

    <Changelog_2_1_0 />

    <Changelog_2_1_1 />
  </Box>;
};

export interface ChangelogSectionProps extends BoxProps {
  version: string;
  publishDate: string;  /* format: MM/DD/YYYY */
}

export const ChangelogSection: FunctionComponent<ChangelogSectionProps> = (props: ChangelogSectionProps) => {
  return <Box className='ChangelogSection'>
    <Box className='ChangelogTitle'>
      {props.version}
      <span className='ChangelogPublishDate'>{props.publishDate}</span>
    </Box>

    <Box sx={{ marginTop: '0.5em' }}>{props.children}</Box>
  </Box>;
};