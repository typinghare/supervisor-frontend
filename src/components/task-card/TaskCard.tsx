import { Component } from 'react';
import { Box, Card, CardActions, CardContent, Collapse, Typography } from '@mui/material';
import './Taskcard.css';
import { Stage } from '../../common/enum';
import { ExpandMore } from '../expand-more/ExpandMore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TaskCommentVo } from '../../vo/TaskCommentVo';
import ProgressBar from './ProgressBar';
import moment from 'moment';
import { DATE_FORMAT } from '../../common/constant';

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

export interface TaskCardState {
  expanded: boolean;
}

export default class TaskCard extends Component<TaskCardProps, TaskCardState> {
  constructor(props: TaskCardProps) {
    super(props);
    this.state = { expanded: false };
  }

  handleExpandClick = () => {
    this.setState((state) => ({ expanded: !state.expanded }));
  };

  getPinnedComment(): string {
    for (const comment of this.props.commentList) {
      if (comment.isPinned) {
        return comment.content;
      }
    }

    // no pinned comment
    return '';
  }

  getUnpinnedCommentList(): TaskCommentVo[] {
    return [];
  }

  render = () => (
    <Card variant="elevation" elevation={3}>
      <CardContent sx={{ paddingBottom: '0 !important' }}>
        {this.renderTitle()}
        {/* Card body, including progress bar and comments. */}
        {this.renderProgressBar()}

        {/* Comment and dropdown button */}
        <CardActions disableSpacing className="TaskCardComment">
          <Typography variant="body2" sx={{ color: '#999', marginLeft: '0.5em' }}>
            {this.getPinnedComment()}
          </Typography>

          <ExpandMore expanded={this.state.expanded} onClick={this.handleExpandClick}>
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ padding: '0.5em' }}>{this.renderExpandedContent()}</CardContent>
        </Collapse>
      </CardContent>
    </Card>
  );

  renderTitle() {
    return (
      <Box className="TaskCardTitle">
        <Box className="TaskCardSubject">{this.props.subjectName}</Box>
        <Box className="TaskCardCategory">{this.props.categoryName}</Box>
        <Box className="TaskCardDuration">{this.getRightSideString()}</Box>
      </Box>
    );
  }

  getRightSideString(): string {
    const stage = parseInt(this.props.stage as string);
    switch (stage) {
      case Stage.PENDING:
        return 'PENDING';
      case Stage.ONGOING:
        return 'ONGOING';
      case Stage.PAUSED:
        return `PAUSED (${this.props.duration}min)`;
      case Stage.ENDED:
        return this.props.duration + 'min';
    }

    return '';
  }

  renderProgressBar() {
    return <ProgressBar {...this.props} />;
  }

  renderExpandedContent = () => (
    <>
      <Box className="TaskCardDetailInfo">
        <p>
          created time: {moment(this.props.createdAt).format(DATE_FORMAT)}
        </p>
        {this.props.lastResumeAt && (
          <p>last resume time: {moment(this.props.lastResumeAt).format(DATE_FORMAT)}</p>
        )}
      </Box>
    </>
  );
}
