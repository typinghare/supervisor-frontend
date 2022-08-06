import { Component } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskCommentVo } from '../../vo/TaskCommentVo';
import { pinComment } from '../../api/task-comment.api';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

export interface TaskCommentCardProps {
  comment: TaskCommentVo;
}

export interface TaskCommentCardState {
  commentId: number;
  content: string;
  isPinned: boolean;
}

export default class TaskCommentCard extends Component<TaskCommentCardProps, TaskCommentCardState> {
  constructor(props: TaskCommentCardProps) {
    super(props);

    this.state = {
      commentId: this.props.comment.id,
      content: this.props.comment.content,
      isPinned: this.props.comment.isPinned,
    };
  }

  render = () => (
    <Card sx={{ marginBottom: '0.5em' }}>
      <CardContent sx={{ paddingBottom: '0.5em !important' }}>
        <Typography sx={{ display: 'inline-block' }}>{this.props.comment.content}</Typography>
        <Box sx={{ float: 'right', marginBottom: '0.5em' }}>
          {this.state.isPinned ? (
            <Button
              size="small"
              variant="text"
              color="info"
              startIcon={<PushPinOutlinedIcon />}
              onClick={this.pinComment}
            >
              Pinned
            </Button>
          ) : (
            <Button
              size="small"
              variant="text"
              color="info"
              startIcon={<PushPinIcon />}
              onClick={this.pinComment}
            >
              Pin
            </Button>
          )}

          <Button
            size="small"
            variant="text"
            color="success"
            startIcon={<EditIcon />}
            onClick={this.editComment}
          >
            EDIT
          </Button>

          <Button
            size="small"
            variant="text"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={this.removeComment}
          >
            REMOVE
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  pinComment = () => {
    pinComment(this.props.comment.id).then((response) => {
      if (response.status === 200) {
        this.setState({
          isPinned: true,
        });
      }
    });
  };

  editComment = () => {
    // const content = '';
    // editComment(this.props.comment.id, content).then((response) => {
    //   this.setState({
    //     content: response.data.data.content,
    //   });
    // });
  };

  removeComment = () => {};
}
