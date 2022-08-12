/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent } from 'react';
import { LoadingState } from '../../common/enum';
import { useParams } from 'react-router-dom';
import { fetchLastWeekSubjectDuration } from '../../api/statistics.api';
import { Box } from '@mui/material';
import Chart from 'react-apexcharts';

export const RecentWeekPieChart: FunctionComponent = () => {
  const [durationSumList, setDurationSumList] = React.useState<number[]>([]);
  const [subjectList, setSubjectList] = React.useState<string[]>([]);

  const [pieChartDataLoadingState, setPieChartDataLoadingState] = React.useState(LoadingState.PENDING);
  const { userId: userIdString } = useParams();
  const userId = parseInt(userIdString || '0');

  React.useEffect(() => {
    if (pieChartDataLoadingState === LoadingState.LOADED) return;

    setPieChartDataLoadingState(LoadingState.LOADING);
    fetchLastWeekSubjectDuration(userId).then((subjectDurationList) => {
      const dsl = [], sl = [];
      for (const subjectDuration of subjectDurationList) {
        dsl.push(subjectDuration.durationSum);
        sl.push(subjectDuration.subjectName);
      }

      setDurationSumList(dsl);
      setSubjectList(sl);
      setPieChartDataLoadingState(LoadingState.LOADED);
    });
  }, []);

  if (pieChartDataLoadingState === LoadingState.LOADING) {
    return <></>;
  } else if (pieChartDataLoadingState === LoadingState.LOADED) {
    return <Box>
      <Chart type='donut' series={durationSumList} options={{
        labels: subjectList,
        dataLabels: {
          enabled: true,
          formatter: (val: number) => Math.round(val) + '%',
        },
      }} width={500}>
      </Chart>
    </Box>;
  } else {
    return <></>;
  }
};