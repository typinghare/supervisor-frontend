import React, { FunctionComponent } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskCommentVo } from '../../vo/TaskCommentVo';
import { editComment, pinComment } from '../../api/task-comment.api';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

export interface TaskCommentCardProps extends TaskCommentVo {
}

export const TaskCommentCard: FunctionComponent<TaskCommentCardProps> = (props: TaskCommentCardProps) => {
  const [isPinned, setIsPinned] = React.useState(props.isPinned);
  const [content, setContent] = React.useState(props.content);

  function pin() {
    pinComment(props.id).then(() => {
      setIsPinned(true);
    });
  }

  function edit() {
    editComment(props.id, content).then((comment) => {
      setContent(comment.content);
    });
  }

  function remove() {

  }

  function PinButton() {
    return isPinned ? (
      <Button
        size='small'
        variant='text'
        color='info'
        startIcon={<PushPinOutlinedIcon />}
        onClick={pin}
      >
        Pinned
      </Button>
    ) : (
      <Button
        size='small'
        variant='text'
        color='info'
        startIcon={<PushPinIcon />}
        onClick={pin}
      >
        Pin
      </Button>
    );
  }

  function EditButton() {
    return <Button
      size='small'
      variant='text'
      color='success'
      startIcon={<EditIcon />}
      onClick={edit}
    >
      EDIT
    </Button>;
  }

  function RemoveButton() {
    return <Button
      size='small'
      variant='text'
      color='error'
      startIcon={<DeleteIcon />}
      onClick={remove}
    >
      REMOVE
    </Button>;
  }

  return <Card sx={{ marginBottom: '0.5em' }}>
    <CardContent sx={{ paddingBottom: '0.5em !important' }}>
      <Typography sx={{ display: 'inline-block' }}>{props.content}</Typography>
      <Box sx={{ float: 'right', marginBottom: '0.5em' }}>
        <PinButton />

        <EditButton />

        <RemoveButton />
      </Box>
    </CardContent>
  </Card>;
};