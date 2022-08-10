import React, { FunctionComponent } from 'react';
import { Box, LinearProgress } from '@mui/material';
import { Stage } from '../../common/enum';
import { TimeDisplay } from './TimeDisplay';
import { parseEnum } from '../../common/helper';

export interface ProgressBarProps {
  stage: string | Stage;
  startedAt: Date | null;
  endedAt: Date | null;
  duration: number;
  expectedDuration: number;
}

export const ProgressBar: FunctionComponent<ProgressBarProps> = (props) => {
  function getEndTime(duration: number): Date | null {
    switch (parseEnum(props.stage)) {
      case Stage.PENDING:
      case Stage.PAUSED:
        return null;
      case Stage.ONGOING:
        return mockDurationDate(duration);
      case Stage.ENDED:
        return props.endedAt;
      default:
        return null;
    }
  }

  function mockDurationDate(duration: number): Date {
    const date: Date = new Date();
    date.setHours(Math.floor(duration / 60));
    date.setMinutes(duration % 60);

    return date;
  }

  const [duration, setDuration] = React.useState(props.duration);
  const [progress, setProgress] = React.useState(getProgress(props.duration, props.expectedDuration));

  React.useEffect(() => {
    const durationInterval = parseEnum(props.stage) === Stage.ONGOING ?
      setInterval(() => {
        const newDuration = duration + 1;
        setDuration(newDuration);
        setProgress(getProgress(newDuration, props.expectedDuration));
      }, 60000) : null;

    return () => {
      durationInterval && clearInterval(durationInterval);
    };
  }, [props.stage, duration, progress, props.expectedDuration]);

  function StartTimeDisplay() {
    return <TimeDisplay className='ProgressBarLeftTimeDisplay' date={props.startedAt} />;
  }

  function LinearProgressBar() {
    return <LinearProgress className='ProgressBarLinearProgress' variant='determinate' value={progress} />;
  }

  function EndTimeDisplay() {
    return <TimeDisplay
      className='ProgressBarRightTimeDisplay'
      date={getEndTime(duration)}
      flash={parseEnum(props.stage) === Stage.ONGOING}
      sx={{ color: parseEnum(props.stage) === Stage.ONGOING ? 'green' : 'inherit' }}
    />;
  }

  return <Box>
    {StartTimeDisplay()}

    {LinearProgressBar()}

    {EndTimeDisplay()}
  </Box>;
};

function getProgress(duration: number, expectedDuration: number): number {
  return Math.min(100, Math.floor((duration / expectedDuration) * 100));
}