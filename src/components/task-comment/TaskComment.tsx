import { Component } from 'react';
import { LoadingState } from '../../common/enum';
import { TaskCommentVo } from '../../vo/TaskCommentVo';
import { fetchComments } from '../../api/task-comment.api';
import { TaskCommentCard } from './TaskCommentCard';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export interface TaskCommentProps {
  taskId: number;
}

export interface TaskCommentState {
  commentList?: TaskCommentVo[];
  loadStatus: LoadingState;
}

export default class TaskComment extends Component<TaskCommentProps, TaskCommentState> {
  constructor(props: TaskCommentProps) {
    super(props);
    this.state = {
      commentList: undefined,
      loadStatus: LoadingState.LOADING,
    };
  }

  componentDidMount() {
    fetchComments(this.props.taskId).then((response) => {
      this.setState({
        commentList: response.data.data,
        loadStatus: LoadingState.LOADED,
      });
    });
  }

  render() {
    if (this.state.loadStatus === LoadingState.LOADING) {
      // loading comments
      return <></>;
    } else if (this.state.loadStatus === LoadingState.LOADED && this.state.commentList) {
      return <>
        <Button
          variant='text'
          startIcon={<AddIcon />}
          sx={{ color: '#ffac33' }}
        >
          Add
        </Button>
        {this.renderCommentList(this.state.commentList)}
      </>;
    }
  }

  renderCommentList(commentList: TaskCommentVo[]) {
    return (
      <>
        {commentList.map((comment) => (
          <TaskCommentCard {...comment} key={comment.id}></TaskCommentCard>
        ))}
      </>
    );
  }
}
