import { styled } from '@mui/material/styles';
import { IconButton, IconButtonProps } from '@mui/material';
import React from 'react';

interface ExpandMoreProps extends IconButtonProps {
  expanded: boolean;
}

export const ExpandIcon = styled((props: ExpandMoreProps) => {
  const { expanded, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expanded }) => ({
  transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));