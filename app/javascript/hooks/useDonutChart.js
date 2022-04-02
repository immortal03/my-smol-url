import React from "react"
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const donutChartOptions = {
  cutout: "70%",
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
    },
  },
}

const useDonutChart = () => {
  return ({ data }) => {
    return <Doughnut type="doughnut" data={data} options={donutChartOptions} />
  }
}

export default useDonutChart
