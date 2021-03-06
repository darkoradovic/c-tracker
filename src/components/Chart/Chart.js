import React, { useEffect, useState } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ data, country }) => {
  const [dailyData, setDailyData] = useState([]);

useEffect(() => {
  const fetchAPI = async () => {
    const initialData = await fetchDailyData()

    setDailyData(initialData)
    console.log(initialData[0])
  }
  fetchAPI()
},[])

  //may not work for every country becouse we check if first day is available
  const lineChart =
    dailyData.length !== 0 ? (
      <Line
        data={{
          labels: dailyData.map(data => data.date),
          datasets: [
            {
              data: dailyData.map(data => data.confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true
            },
            {
              data: dailyData.map(data => data.deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              fill: true
            }
          ]
        }}
      />
    ) : null;

  const barChart = data.confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)"
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value
            ]
          }
        ]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` }
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{barChart}</div>
  );
};

export default Chart;
