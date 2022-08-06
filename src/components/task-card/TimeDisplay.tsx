import { Component } from 'react';
import { Box, BoxProps } from '@mui/material';

export interface TimeDisplayProps extends BoxProps {
  // the time to be shown
  date: Date | null;

  // whether the colon flashes
  flash?: boolean;

  // the interval of flashing in milliseconds, default value: 1000
  flashInterval?: number;
}

export interface TimeDisplayState {
  showColon: boolean;
}

export default class TimeDisplay extends Component<TimeDisplayProps, TimeDisplayState> {
  protected colonFlashInterval: NodeJS.Timeout | null = null;

  constructor(props: TimeDisplayProps) {
    super(props);
    this.state = { showColon: true };
  }

  componentDidMount() {
    this.props.flash && this.startFlash();
  }

  componentWillUnmount() {
    this.colonFlashInterval && clearInterval(this.colonFlashInterval);
  }

  componentDidUpdate(prevProps: TimeDisplayProps) {
    prevProps.flash && !this.props.flash && this.stopFlash();
    this.props.flash && this.startFlash();
  }

  startFlash() {
    this.stopFlash();
    this.colonFlashInterval = setInterval(() => {
      /** The colon flashes every second by default. */
      this.setState((state) => ({ showColon: !state.showColon }));
    }, this.props.flashInterval || 1000);
  }

  stopFlash() {
    this.colonFlashInterval && clearInterval(this.colonFlashInterval);
  }

  render() {
    const { hourString, minuteString } = this.getHourMinuteString();

    return (
      <Box display='inline-block' className={this.props.className} sx={this.props.sx}>
        {hourString}
        {this.props.flash && !this.state.showColon ? ' ' : ':'}
        {minuteString}
      </Box>
    );
  }

  getHourMinuteString(): { hourString: string; minuteString: string } {
    if (this.props.date) {
      const date = new Date(this.props.date);
      const hour = date.getHours();
      const minute = date.getMinutes();

      return {
        hourString: hour < 10 ? `0${hour}` : `${hour}`,
        minuteString: minute < 10 ? `0${minute}` : `${minute}`,
      };
    }

    return { hourString: '--', minuteString: '--' };
  }
}
