import "./Charts.css";
import React, {
  Component,
  PureComponent,
  useEffect /* useState */,
  useState,
} from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import { AreaChart, Area } from "recharts";
import GaugeChart from "react-gauge-chart";
//import { useEffect } from "react";

const data01 = [
  { hour: "12h", index: 1, value: 170 },
  { hour: "13h", index: 1, value: 180 },
  { hour: "14h", index: 1, value: 150 },
  { hour: "15h", index: 1, value: 120 },
  { hour: "16h", index: 1, value: 200 },
  { hour: "17h", index: 1, value: 300 },
  { hour: "18h", index: 1, value: 400 },
  { hour: "19h", index: 1, value: 200 },
  { hour: "20h", index: 1, value: 100 },
  { hour: "21h", index: 1, value: 150 },
  { hour: "22h", index: 1, value: 160 },
  { hour: "23h", index: 1, value: 170 },
  { hour: "00h", index: 1, value: 180 },
];

const data02 = [
  { hour: "12h", index: 1, value: 160 },
  { hour: "13h", index: 1, value: 180 },
  { hour: "14h", index: 1, value: 150 },
  { hour: "15h", index: 1, value: 120 },
  { hour: "16h", index: 1, value: 200 },
  { hour: "17h", index: 1, value: 300 },
  { hour: "18h", index: 1, value: 100 },
  { hour: "19h", index: 1, value: 200 },
  { hour: "20h", index: 1, value: 100 },
  { hour: "21h", index: 1, value: 150 },
  { hour: "22h", index: 1, value: 160 },
  { hour: "23h", index: 1, value: 160 },
  { hour: "00h", index: 1, value: 180 },
];

const parseDomain = () => [
  0,
  Math.max(
    Math.max.apply(
      null,
      data01.map((entry) => entry.value)
    ),
    Math.max.apply(
      null,
      data02.map((entry) => entry.value)
    )
  ),
];

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/multi-bubble-chart-gb82x";

  renderTooltip = (props) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const data = payload[0] && payload[0].payload;

      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #999",
            margin: 0,
            padding: 10,
          }}
        >
          <p>{data.hour}</p>
          <p>
            <span>value: </span>
            {data.value}
          </p>
        </div>
      );
    }

    return null;
  };

  render() {
    const domain = parseDomain();
    const range = [16, 225];

    return (
      <div style={{ width: "100%" }}>
        <ResponsiveContainer width="100%" height={60}>
          <ScatterChart
            width={800}
            height={60}
            margin={{
              top: 10,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <XAxis
              type="category"
              dataKey="hour"
              name="hour"
              interval={0}
              tick={{ fontSize: 0 }}
              tickLine={{ transform: "translate(0, -6)" }}
            />
            <YAxis
              type="number"
              dataKey="index"
              height={10}
              width={80}
              tick={false}
              tickLine={false}
              axisLine={false}
              label={{ value: "Segunda", position: "insideRight" }}
            />
            <ZAxis
              type="number"
              dataKey="value"
              domain={domain}
              range={range}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              wrapperStyle={{ zIndex: 100 }}
              content={this.renderTooltip}
            />
            <Scatter data={data02} fill="#7bb662" />
          </ScatterChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={60}>
          <ScatterChart
            width={800}
            height={60}
            margin={{
              top: 10,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <XAxis
              type="category"
              dataKey="hour"
              name="hour"
              interval={0}
              tick={{ fontSize: 0 }}
              tickLine={{ transform: "translate(0, -6)" }}
            />
            <YAxis
              type="number"
              dataKey="index"
              height={10}
              width={80}
              tick={false}
              tickLine={false}
              axisLine={false}
              label={{ value: "Terça", position: "insideRight" }}
            />
            <ZAxis
              type="number"
              dataKey="value"
              domain={domain}
              range={range}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              wrapperStyle={{ zIndex: 100 }}
              content={this.renderTooltip}
            />
            <Scatter data={data01} fill="#7bb662" />
          </ScatterChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={60}>
          <ScatterChart
            width={800}
            height={60}
            margin={{
              top: 10,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <XAxis
              type="category"
              dataKey="hour"
              name="hour"
              interval={0}
              tick={{ fontSize: 0 }}
              tickLine={{ transform: "translate(0, -6)" }}
            />
            <YAxis
              type="number"
              dataKey="index"
              height={10}
              width={80}
              tick={false}
              tickLine={false}
              axisLine={false}
              label={{ value: "Quarta", position: "insideRight" }}
            />
            <ZAxis
              type="number"
              dataKey="value"
              domain={domain}
              range={range}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              wrapperStyle={{ zIndex: 100 }}
              content={this.renderTooltip}
            />
            <Scatter data={data02} fill="#7bb662" />
          </ScatterChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={60}>
          <ScatterChart
            width={800}
            height={60}
            margin={{
              top: 10,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <XAxis
              type="category"
              dataKey="hour"
              name="hour"
              interval={0}
              tick={{ fontSize: 0 }}
              tickLine={{ transform: "translate(0, -6)" }}
            />
            <YAxis
              type="number"
              dataKey="index"
              height={10}
              width={80}
              tick={false}
              tickLine={false}
              axisLine={false}
              label={{ value: "Quinta", position: "insideRight" }}
            />
            <ZAxis
              type="number"
              dataKey="value"
              domain={domain}
              range={range}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              wrapperStyle={{ zIndex: 100 }}
              content={this.renderTooltip}
            />
            <Scatter data={data01} fill="#7bb662" />
          </ScatterChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={60}>
          <ScatterChart
            margin={{
              top: 10,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <XAxis
              type="category"
              dataKey="hour"
              interval={0}
              tick={{ fontSize: 0 }}
              tickLine={{ transform: "translate(0, -6)" }}
            />
            <YAxis
              type="number"
              dataKey="index"
              name="Sexta"
              height={10}
              width={80}
              tick={false}
              tickLine={false}
              axisLine={false}
              label={{ value: "Sexta", position: "insideRight" }}
            />
            <ZAxis
              type="number"
              dataKey="value"
              domain={domain}
              range={range}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              wrapperStyle={{ zIndex: 100 }}
              content={this.renderTooltip}
            />
            <Scatter data={data01} fill="#7bb662" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

const data = [
  {
    name: "09h",
    Avisos: 300,
    Normal: 139,
    Sucesso: 221,
  },
  {
    name: "10h",
    Avisos: 200,
    Normal: 980,
    Sucesso: 229,
  },
  {
    name: "11h",
    Avisos: 278,
    Normal: 398,
    Sucesso: 200,
  },
  {
    name: "12h",
    Avisos: 189,
    Normal: 480,
    Sucesso: 211,
  },
  {
    name: "13h",
    Avisos: 239,
    Normal: 380,
    Sucesso: 250,
  },
];

const data3 = [
  {
    timestamp: "08h",
    value: 0.5,
  },
  {
    timestamp: "09h",
    value: 0.3,
  },
  {
    timestamp: "10h",
    value: 0.9,
  },
  {
    timestamp: "11h",
    value: 0.5,
  },
  {
    timestamp: "12h",
    value: 0.55,
  },
  {
    timestamp: "13h",
    value: 0.53,
  },
  {
    timestamp: "14h",
    value: 0.6,
  },
];

const data4 = [
  {
    timestamp: "08h",
    value: 100,
  },
  {
    timestamp: "09h",
    value: 150,
  },
  {
    timestamp: "10h",
    value: 300,
  },
  {
    timestamp: "11h",
    value: 360,
  },
  {
    timestamp: "12h",
    value: 50,
  },
  {
    timestamp: "13h",
    value: 515,
  },
  {
    timestamp: "14h",
    value: 451,
  },
];

export function Piechart(props) {
  const valor = props.Percentagem;
  return (
    <GaugeChart
      id="gauge-chart1"
      textColor={"#8884d8"}
      colors={["#e03c32", "#ffd301", "#7bb662"]}
      percent={valor}
      hideText={true}
    />
  );
}

export function Charts2(props) {
  const [height, setheight] = useState(200);
  useEffect(() => {
    setheight(props.Height);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="box-width">
      <div style={{ width: "100%", height: height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Normal" stackId="a" fill="#49b6ff" />
            <Bar dataKey="Sucesso" stackId="a" fill="#7bb662" />
            <Bar dataKey="Avisos" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ChartsEnergia(props) {
  /* const [energia, setEnergia] = useState([]);
  useEffect(() => {
      setEnergia(props.EnergiaDados)
    },[props.EnergiaDados]); */

  const energia = data4;

  return (
    <div className="box-width">
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={energia}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" fill="#49b6ff" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ChartsOEE(props) {
  /*   const [OEE, setOEE] = useState([]);
  useEffect(() => {
    console.log(props.OEEDados)
    setOEE(props.OEEDados)
    },[props.OEEDados]); */

  const [height, setheight] = useState(200);
  useEffect(() => {
    setheight(props.Height);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const OEE = data3;

  return (
    <div className="box-width">
      <div style={{ width: "100%", height: height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={height}
            data={OEE}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#000000"
              fill="#ffd301"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function Charts1() {
  return (
    <div className="box-width">
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data3}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="ef"
              stroke="#3ab827"
              fill="#3ab827"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function Charts3() {
  return (
    <div className="box">
      <h2> Produtividade </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="amt"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function Charts4() {
  return (
    <div className="box-width">
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <BarChart
            width={800}
            height={700}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
            <Bar dataKey="uv" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function Charts5() {
  return (
    <div className="box">
      <MovingChart nb_bar={10} />
    </div>
  );
}

class MovingChart extends Component {
  randomDataArray(nb_elem) {
    var data_bar = [];
    for (var i = 0; i < nb_elem; i++) {
      data_bar.push({
        name: "core " + i,
        freq: Math.round(Math.random() * 1000),
        freq2: Math.round(Math.random() * 1000),
      });
    }
    return data_bar;
  }

  constructor(props) {
    super(props);
    this.state = {
      nb_bar: props.nb_bar,
      data: this.randomDataArray(props.nb_bar),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 2500);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      data: this.randomDataArray(this.props.nb_bar),
    });
  }

  render() {
    return (
      <BarChart width={450} height={340} data={this.state.data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Bar dataKey="freq" fill="#8884d8" />
        <Bar dataKey="freq2" fill="#8214d8" />
      </BarChart>
    );
  }
}
