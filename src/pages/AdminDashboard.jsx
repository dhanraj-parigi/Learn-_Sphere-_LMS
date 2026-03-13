import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{

    if(!user || user.role !== "admin"){
      navigate("/login");
    }

  },[]);

  // Example data (later you can fetch from API)

  const barData = {
    labels: ["Web Dev", "Data Science", "UI/UX", "Cloud", "Security"],
    datasets: [
      {
        label: "Course Enrollments",
        data: [120, 90, 70, 60, 40],
        backgroundColor: [
          "#6C3EF4",
          "#4F46E5",
          "#10B981",
          "#F59E0B",
          "#EF4444"
        ]
      }
    ]
  };

  const pieData = {
    labels: ["Students", "Admins", "Instructors"],
    datasets: [
      {
        data: [85, 5, 10],
        backgroundColor: ["#6C3EF4", "#10B981", "#F59E0B"]
      }
    ]
  };

  return (

    <div className="container mt-5">

      <h2 className="mb-4 fw-bold">
        Admin Dashboard
      </h2>

      {/* STAT CARDS */}

      <div className="row g-4 mb-5">

        <div className="col-md-4">
          <div className="card shadow border-0 p-4 text-center">
            <h6>Total Courses</h6>
            <h2 className="fw-bold text-primary">24</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 p-4 text-center">
            <h6>Total Students</h6>
            <h2 className="fw-bold text-success">310</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 p-4 text-center">
            <h6>Total Enrollments</h6>
            <h2 className="fw-bold text-warning">720</h2>
          </div>
        </div>

      </div>


      {/* CHARTS */}

      <div className="row g-4">

        <div className="col-lg-8">

          <div className="card shadow p-4 border-0">

            <h5 className="mb-3">
              Course Enrollment Analytics
            </h5>

            <Bar data={barData} />

          </div>

        </div>


        <div className="col-lg-4">

          <div className="card shadow p-4 border-0">

            <h5 className="mb-3">
              Platform Users
            </h5>

            <Pie data={pieData} />

          </div>

        </div>

      </div>


      {/* ADMIN ACTIONS */}

      <div className="mt-5">

        <h4 className="mb-3">
          Admin Actions
        </h4>

        <button
          className="btn btn-primary me-3"
          onClick={()=>navigate("/admin/add-course")}
        >
          Add Course
        </button>

        <button
          className="btn btn-danger"
          onClick={()=>navigate("/courses")}
        >
          Manage Courses
        </button>

      </div>

    </div>

  );

}

export default AdminDashboard;