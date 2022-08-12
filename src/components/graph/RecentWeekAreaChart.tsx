/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent } from 'react';
import { Area, AreaChart, CartesianGrid, Label, XAxis, YAxis } from 'recharts';
import { LoadingState } from '../../common/enum';
import { fetchLastWeekDurationAggregation } from '../../api/statistics.api';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { monthMapping } from '../../common/constant';

export type RecentWeekAreaCharDataItem = {
  name: string;
  durationSum: number;
};

export const RecentWeekAreaChart: FunctionComponent = function() {
  const [areaChartData, setAreaChartData] = React.useState<RecentWeekAreaCharDataItem[]>([]);
  const [areaChartDataLoadingState, setAreaChartDataLoadingState] = React.useState(LoadingState.PENDING);
  const { userId: userIdString } = useParams();
  const userId = parseInt(userIdString || '0');

  React.useEffect(() => {
    if (areaChartDataLoadingState === LoadingState.LOADED) return;

    setAreaChartDataLoadingState(LoadingState.LOADING);
    fetchLastWeekDurationAggregation(userId).then((durationSumList) => {
      const data: RecentWeekAreaCharDataItem[] = [];
      const sevenDaysAgo = moment().subtract(7, 'days');

      for (let i = 0; i < durationSumList.length; i++) {
        const thatDay = sevenDaysAgo.add(1, 'day');
        data.push({
          name: monthMapping[thatDay.month()] + ' ' + thatDay.date(),
          durationSum: durationSumList[i].durationSum,
        });
      }

      setAreaChartData(data);
      setAreaChartDataLoadingState(LoadingState.LOADED);
    });
  }, []);

  if (areaChartDataLoadingState === LoadingState.LOADING) {
    return <></>;
  } else if (areaChartDataLoadingState === LoadingState.LOADED) {
    return <AreaChart
      width={725}
      height={275}
      data={areaChartData}
      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
    >
      <defs>
        <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='30%' stopColor='#a2d2ff' stopOpacity={0.8} />
          <stop offset='100%' stopColor='#a2d2ff' stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey='name'>
        <Label position='insideBottom' offset={-10} fill='#666666'>
          Date
        </Label>
      </XAxis>
      <YAxis>
        <Label
          angle={-90}
          value='Duration/min'
          position='insideLeft'
          fill='#666666'
          textAnchor='middle'
        />
      </YAxis>
      <CartesianGrid strokeDasharray='3 3' />
      <Area
        type='monotone'
        dataKey='durationSum'
        stroke='#8884d8'
        fillOpacity={1}
        fill='url(#colorUv)'
      />
    </AreaChart>;
  } else {
    return <></>;
  }
};