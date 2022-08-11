import { Component } from 'react';
import { fetchLastWeekDurationAggregation, fetchLastWeekSubjectDuration } from '../../api/statistics.api';
import moment from 'moment';
import { monthMapping } from '../../common/constant';
import { Typography } from '@mui/material';
import { Area, AreaChart, CartesianGrid, Label, XAxis, YAxis } from 'recharts';

type AreaCharDataItem = {
  name: string;
  durationSum: number;
};

type PieCharDataItem = {
  subjectName: string;
  duration: number;
};

export interface GraphProps {
  userId: number;
}

export interface GraphState {
  areaChartData: AreaCharDataItem[];
  pieChartData: PieCharDataItem[];
}

export default class Graph extends Component<GraphProps, GraphState> {
  constructor(props: GraphProps) {
    super(props);
    this.state = {
      areaChartData: [],
      pieChartData: [],
    };
  }

  componentDidMount() {
    fetchLastWeekDurationAggregation(this.props.userId).then((response) => {
      if (response.status !== 200) return;

      const data: { durationSum: number }[] = response.data.data;
      const areaChartData: AreaCharDataItem[] = [];
      const sevenDaysAgo = moment().subtract(7, 'days');

      for (let i = 0; i < data.length; i++) {
        const thatDay = sevenDaysAgo.add(1, 'day');
        areaChartData.push({
          name: monthMapping[thatDay.month()] + ' ' + thatDay.date(),
          durationSum: data[i].durationSum,
        });
      }

      this.setState({ areaChartData });
    });

    fetchLastWeekSubjectDuration(this.props.userId).then((response) => {
      if (response.status !== 200) return;

      const data: PieCharDataItem[] = response.data.data;
      console.log(data);
      this.setState({ pieChartData: data });
    });
  }

  render = () => (
    <>
      <Typography sx={{ fontSize: '1.5em', color: 'dodgerblue' }}>
        Data For the Last Week
      </Typography>
      {this.renderAreaChart()}

      {/* this.renderPieChart() */}
    </>
  );

  renderAreaChart = () => (
    <AreaChart
      width={650}
      height={250}
      data={this.state.areaChartData}
      margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
    >
      <defs>
        <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
          <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
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
    </AreaChart>
  );
}
