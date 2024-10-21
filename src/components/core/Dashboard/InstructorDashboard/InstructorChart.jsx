import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import './InstructorChart.css'; // Import the custom CSS file

Chart.register(...registerables);

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students");

  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };

  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container">
      <p className="chart-title">Visualize</p>
      <div className="chart-buttons">
        <button
          onClick={() => setCurrChart("students")}
          className={`chart-button ${
            currChart === "students" ? "active" : ""
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`chart-button ${
            currChart === "income" ? "active" : ""
          }`}
        >
          Income
        </button>
      </div>
      <div className="chart-wrapper">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
}
