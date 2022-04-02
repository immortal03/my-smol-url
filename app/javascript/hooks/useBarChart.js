import React, { useRef, useState } from "react"
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
import { Bar } from "react-chartjs-2"

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: { stepSize: 1 },
    },
  },
  plugins: {
    legend: {
      position: "bottom",
    },
  },
}

const useBarChart = () => {
  const [newData, setNewData] = useState(null)
  const dataRef = useRef()

  const BarChart = ({ data }) => {
    dataRef.current = data

    return <Bar type="bar" data={newData || data} options={barChartOptions} />
  }

  const updateChartData = (labels, values) => {
    setNewData({
      ...dataRef.current,
      labels,
      datasets: [{ ...dataRef.current.datasets[0], data: values }],
    })
  }

  return [BarChart, updateChartData]
}

export default useBarChart
