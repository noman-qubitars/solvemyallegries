"use client";

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineChart = () => {
  const options = {
    chart: {
      type: "spline", // smooth line
      backgroundColor: "transparent",
      height: 300,
    },
    title: { text: null },
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      categories: [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ],
      lineColor: "#F1F1F5",
      tickColor: "transparent",
      crosshair: {
        color: "#2563EB",     // blue vertical line (match series color)
        width: 2,
        dashStyle: "Solid",   // or "Dash" if you want dotted
        zIndex: 3
      },
      labels: {
        style: {
          color: "#9CA3AF", // subtle grey
          fontSize: "12px"
        }
      }
    },
    yAxis: {
      title: { text: null },
      gridLineColor: "#F3F4F6",
      labels: {
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject): string {
          return this.value === 1000 ? "1k" : String(this.value);
        },
        style: {
          color: "#9CA3AF",
          fontSize: "12px"
        }
      }
    },
    tooltip: {
      shared: true,  
      useHTML: true,
      backgroundColor: "#FFFFFF",
      borderColor: "transparent",
      borderRadius: 8,
      shadow: true,
      formatter: function (this: any): string {
        const yValue = typeof this.y === "number" ? this.y : Number(this.y || 0);
        const monthLabel = (this.point && typeof this.point.category === "string")
          ? this.point.category
          : String(this.x ?? "");
        return `<div style="text-align:center;">
              <span style="font-weight:bold; font-size:14px;">$${Highcharts.numberFormat(yValue * 100, 0)}</span><br/>
              <span style="font-size:12px; color:#6B7280;">${monthLabel}</span>
           </div>`;
      }
    },
    plotOptions: {
      series: {
        marker: {
          enabled: true,
          radius: 5,
          symbol: "circle",
          lineWidth: 2,
        },
        lineWidth: 3
      }
    },
    series: [
      {
        name: "Series 1",
        color: "#10B981", // green
        data: [450, 420, 480, 530, 600, 650, 620, 580, 540, 500, 480, 500]
      },
      {
        name: "Series 2",
        color: "#2563EB", // blue
        data: [500, 450, 300, 500, 520, 500, 470, 530, 500, 480, 460, 490]
      }
    ]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;