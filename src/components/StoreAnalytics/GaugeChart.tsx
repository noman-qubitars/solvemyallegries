"use client";

import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const GaugeChart = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadModules = async () => {
      if (typeof window === "undefined") return;
      try {
        const more = await import("highcharts/highcharts-more");
        const solid = await import("highcharts/modules/solid-gauge");
        const moreInit = (more as any).default || (more as any);
        const solidInit = (solid as any).default || (solid as any);
        if (typeof moreInit === "function") moreInit(Highcharts);
        if (typeof solidInit === "function") solidInit(Highcharts);
        if (isMounted) setIsReady(true);
      } catch (e) {
        // swallow to avoid SSR crashes; component just won't render
        if (isMounted) setIsReady(false);
      }
    };
    loadModules();
    return () => {
      isMounted = false;
    };
  }, []);

  const options = {
    chart: {
      type: "solidgauge",
      height: 150,
      backgroundColor: "transparent",
    },

    title: null,

    pane: {
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: "#E6E9ED", // light grey arc background
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc",
      },
    },

    // Disable credits and tooltip
    credits: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },

    yAxis: {
      min: 0,
      max: 200, // adjust to your max value
      stops: [
        [1, "#0B3D1F"], // dark green
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        text: null,
      },
      labels: {
        enabled: false,
      },
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: -25,
          borderWidth: 0,
          useHTML: true,
          format:
            '<div style="text-align:center">' +
            '<span style="font-size:24px; font-weight:500; color:#404040">{y}</span><br/>' +
            '<span style="font-size:12px; font-weight:500; color:#404040">New Users</span>' +
            "</div>",
        },
      },
    },

    series: [
      {
        type: "solidgauge",
        name: "New Users",
        data: [120], // your value
      },
    ],
  };

  if (!isReady) return null;
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GaugeChart;