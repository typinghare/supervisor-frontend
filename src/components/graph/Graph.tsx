import { Component } from 'react';
import {
  fetchLastWeekDurationAggregation,
  fetchLastWeekSubjectDuration,
} from '../../api/statistics';
import moment from 'moment';
import { monthMapping } from '../../common/helper';
import { Typography } from '@mui/material';
import { Area, AreaChart, CartesianGrid, Label, Pie, XAxis, YAxis } from 'recharts';
import { PieChart } from '@mui/icons-material';

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

const data01 = [
  {
    name: 'Group A',
    value: 400,
  },
  {
    name: 'Group B',
    value: 300,
  },
  {
    name: 'Group C',
    value: 300,
  },
  {
    name: 'Group D',
    value: 200,
  },
  {
    name: 'Group E',
    value: 278,
  },
  {
    name: 'Group F',
    value: 189,
  },
];
const data02 = [
  {
    name: 'Group A',
    value: 2400,
  },
  {
    name: 'Group B',
    value: 4567,
  },
  {
    name: 'Group C',
    value: 1398,
  },
  {
    name: 'Group D',
    value: 9800,
  },
  {
    name: 'Group E',
    value: 3908,
  },
  {
    name: 'Group F',
    value: 4800,
  },
];

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
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name">
        <Label position="insideBottom" offset={-10} fill="#666666">
          Date
        </Label>
      </XAxis>
      <YAxis>
        <Label
          angle={-90}
          value="Duration/min"
          position="insideLeft"
          fill="#666666"
          textAnchor="middle"
        />
      </YAxis>
      <CartesianGrid strokeDasharray="3 3" />
      <Area
        type="monotone"
        dataKey="durationSum"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </AreaChart>
  );

  renderPieChart = () => (
    <PieChart width={730} height={250}>
      <Pie
        data={data01}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={50}
        fill="#8884d8"
      />
      <Pie
        data={data02}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#82ca9d"
        label
      />
    </PieChart>
  );
}
