import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options: Highcharts.Options = {
  chart: {
    type: "column",
    borderRadius: 12
  },
  title: {
    text: ""
  },
  xAxis: {
    categories: [
      "Headache",
      "Sinus",
      "Itchy Eyes",
      "Breathing Issues",
      "Fatigue",
      "Throat Symptoms",
      "Inflammation",
      "Burning",
      "Insomnia",
      "Swollen Throat"
    ],
    labels: {
      style: {
        color: "#222222",
        fontSize: "14px",
        fontWeight: "400",
        whiteSpace: "normal",
        textAlign: "center"
      }
    },
    lineWidth: 0
  },
  yAxis: {
    min: 0,
    max: 10,
    title: {
      text: ""
    },
    gridLineWidth: 0,
    lineWidth: 0
  },
  legend: {
    align: "center",
    verticalAlign: "bottom",
    itemStyle: {
      fontSize: "12px"
    }
  },
  plotOptions: {
    column: {
      stacking: "normal",
      borderRadius: 4,
      pointPadding: 0.05,
      groupPadding: 0.1,
      pointWidth: 35
    }
  },
  series: [
    {
      name: "High",
      type: "column",
      data: [4, 3, 2, 3, 3, 3, 3, 3, 3, 3],
      color: "#DCE6FF" 
    },
    {
      name: "Medium",
      type: "column",
      data: [3, 5, 4, 3, 6, 6, 6, 6, 6, 3],
      color: "#8FA6FF" 
    },
    {
      name: "Low",
      type: "column",
      data: [3, 2, 4, 4, 1, 1, 1, 1, 1, 4],
      color: "#2D4BFF"
    }
  ],
  credits: {
    enabled: false
  }
};

export default function SymptomsChart() {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}