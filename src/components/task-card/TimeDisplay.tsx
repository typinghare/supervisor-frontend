import React, { FunctionComponent } from 'react';
import { Box, BoxProps } from '@mui/material';

export interface TimeDisplayProps extends BoxProps {
  // the time to be shown
  date: Date | null;

  // whether the colon flashes
  flash?: boolean;

  // the interval of flashing in milliseconds, default value: 1000
  flashInterval?: number;
}

export const TimeDisplay: FunctionComponent<TimeDisplayProps> = (props) => {
  function getHourMinuteString(): [string, string] {
    if (props.date) {
      const date = new Date(props.date);
      const hour = date.getHours();
      const minute = date.getMinutes();

      return [
        hour < 10 ? `0${hour}` : `${hour}`,
        minute < 10 ? `0${minute}` : `${minute}`,
      ];
    }

    return ['--', '--'];
  }

  const [showColon, setShowColon] = React.useState(true);
  const [hourString, minuteString] = getHourMinuteString();

  React.useEffect(() => {
    const flashInterval = props.flash ? setInterval(() => {
      setShowColon(!showColon);
    }, props.flashInterval || 1000) : null;

    return () => {
      flashInterval && clearInterval(flashInterval);
    };
  }, [props.flash, props.flashInterval, showColon]);

  return <Box display='inline-block' className={props.className} sx={props.sx}>
    {hourString + (props.flash && !showColon ? ' ' : ':') + minuteString}
  </Box>;
};