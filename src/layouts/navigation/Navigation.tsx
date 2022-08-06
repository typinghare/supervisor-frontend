import { Component } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export default class Navigation extends Component<any, any> {
  render = () => (
    <>
      <AppBar position="static" sx={{ padding: '0 !important' }}>
        <Toolbar sx={{ minHeight: '3em' }}>
          <Typography sx={{ fontSize: '1.25em', fontWeight: 'bold', fontStyle: 'italic' }}>Supervisor 2</Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Button sx={{ my: 2, color: 'white', display: 'block', margin: '0 0.75em' }}>
              About
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
