import React, { FunctionComponent } from 'react';
import { Box, Card, CardActions, CardContent, Collapse, Typography } from '@mui/material';
import './Taskcard.css';
import { Stage } from '../../common/enum';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TaskCommentVo } from '../../vo/TaskCommentVo';
import { ProgressBar } from './ProgressBar';
import { parseEnum } from '../../common/helper';
import { ExpandIcon } from '../expand-icon/ExpandIcon';
import moment from 'moment';
import { monthMapping } from '../../common/constant';

export interface TaskCardProps {
  id: number;
  stage: string | Stage;
  subjectName: string;
  categoryName: string;
  createdAt: Date;
  startedAt: Date | null;
  endedAt: Date | null;
  lastResumeAt: Date;
  duration: number; // in minutes
  expectedDuration: number; // in minutes
  commentList: TaskCommentVo[];
}

export const TaskCard: FunctionComponent<TaskCardProps> = (props) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  function getRightSideString(): string {
    switch (parseEnum(props.stage)) {
      case Stage.PENDING:
        return 'PENDING';
      case Stage.ONGOING:
        return 'ONGOING';
      case Stage.PAUSED:
        return `PAUSED (${props.duration}min)`;
      case Stage.ENDED:
        return props.duration + 'min';
      default:
        return '';
    }
  }

  function getPinnedComment(): string {
    for (const comment of props.commentList) {
      if (comment.isPinned) return comment.content;
    }

    return '';
  }

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function Title() {
    return <Box className='TaskCardTitle'>
      <Box className='TaskCardSubject'>{props.subjectName}</Box>
      <Box className='TaskCardCategory'>{props.categoryName}</Box>
      <Box className='TaskCardDuration'>{getRightSideString()}</Box>
    </Box>;
  }

  function dateTimeString(date: Date): string {
    const m = moment(date);
    const time = m.format('HH:mm');
    const month = monthMapping[m.month()];
    return `${time}, ${month} ${m.date()}, ${m.year()}`;
  }

  function TaskCardExpansion() {
    return <Box className='TaskCardDetailInfo'>
      <p>Create - {dateTimeString(props.createdAt)}</p>
      {props.lastResumeAt && <p>Last resume - {dateTimeString(props.lastResumeAt)}</p>}
      {props.endedAt && <p>End - {dateTimeString(props.endedAt)}</p>}
    </Box>;
  }

  return <Card variant='elevation' elevation={3}>
    <CardContent sx={{ paddingBottom: '0 !important' }}>
      {Title()}

      {/* Card body, including progress bar and comments. */}
      <ProgressBar {...props} />

      {/* Comment and dropdown button */}
      <CardActions disableSpacing className='TaskCardComment'>
        <Typography variant='body2' sx={{ color: '#999', marginLeft: '0.5em' }}>
          {getPinnedComment()}
        </Typography>

        <ExpandIcon expanded={expanded} onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </ExpandIcon>
      </CardActions>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent sx={{ padding: '0 0 0.5em 0.5em !important' }}>
          <TaskCardExpansion />
        </CardContent>
      </Collapse>
    </CardContent>
  </Card>;
};