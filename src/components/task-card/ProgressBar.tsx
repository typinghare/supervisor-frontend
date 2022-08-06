import { Component } from 'react';
import { LinearProgress } from '@mui/material';
import { Stage } from '../../common/enum';
import TimeDisplay from './TimeDisplay';

export interface ProgressBarProps {
  stage: string | Stage;
  startedAt: Date | null;
  endedAt: Date | null;
  duration: number;
  expectedDuration: number;
}

export interface ProgressBarState {
  duration: number;
  progress: number;
  endTimeDate: Date | null;
}

export default class ProgressBar extends Component<ProgressBarProps, ProgressBarState> {
  private durationInterval: NodeJS.Timeout | null = null;

  /**
   * @param duration
   * @param expectedDuration
   * @return percentage
   */
  public static getProgress(duration: number, expectedDuration: number): number {
    return Math.min(100, Math.floor((duration / expectedDuration) * 100));
  }

  constructor(props: ProgressBarProps) {
    super(props);
    this.state = {
      duration: this.props.duration || 0,
      progress: 0,
      endTimeDate: this.getEndTimeDate(this.props.duration),
    };
  }

  componentDidMount() {
    this.setState({
      progress: ProgressBar.getProgress(this.state.duration, this.props.expectedDuration),
    });

    if (parseInt(this.props.stage as string) === Stage.ONGOING) {

    }
  }

  componentDidUpdate(prevProps: Readonly<ProgressBarProps>, prevState: Readonly<ProgressBarState>) {
    if (parseInt(this.props.stage as string) !== Stage.ONGOING) {
      this.stopProgressInterval();
    } else {
      this.startProgressInterval();
    }
  }

  componentWillUnmount() {
    this.stopProgressInterval();
  }

  startProgressInterval() {
    this.stopProgressInterval();
    this.durationInterval = setInterval(() => {
      this.setState((state) => ({
        duration: state.duration + 1,
        progress: ProgressBar.getProgress(state.duration + 1, this.props.expectedDuration),
        endTimeDate: this.getEndTimeDate(state.duration + 1),
      }));
    }, 60000);
  }

  stopProgressInterval() {
    this.durationInterval && clearInterval(this.durationInterval);
  }

  render = () => {
    return (
      <>
        {this.renderStartTimeDisplay()}

        {this.renderLinearProgress()}

        {this.renderEndTimeDisplay()}
      </>
    );
  };

  renderStartTimeDisplay = () => (
    <TimeDisplay className='ProgressBarLeftTimeDisplay' date={this.props.startedAt} flash={false} />
  );

  renderEndTimeDisplay = () => (
    <TimeDisplay
      className='ProgressBarRightTimeDisplay'
      date={this.getEndTimeDate(this.props.duration)}
      flash={parseInt(this.props.stage as string) === Stage.ONGOING}
      sx={{ color: parseInt(this.props.stage as string) === Stage.ONGOING ? 'green' : 'inherit' }}
    />
  );

  getEndTimeDate = (duration: number): Date | null => {
    switch (parseInt(this.props.stage as string)) {
      case Stage.PENDING:
      case Stage.PAUSED:
        return null;
      case Stage.ONGOING:
        return this.mockDurationDate(duration);
      case Stage.ENDED:
        return this.props.endedAt;
      default:
        return null;
    }
  };

  mockDurationDate(duration: number): Date {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);

    const date: Date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    return date;
  }

  renderLinearProgress = () => (
    <LinearProgress
      className='ProgressBarLinearProgress'
      variant='determinate'
      value={this.state.progress}
    />
  );
}
