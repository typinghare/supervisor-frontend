import { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import { RecentWeekAreaChart } from './RecentWeekAreaChart';
import { RecentWeekPieChart } from './RecentWeekPieChart';

export const Graph: FunctionComponent = () => {
  return <Box>
    <RecentWeekAreaChart />

    <RecentWeekPieChart/>
  </Box>;
};