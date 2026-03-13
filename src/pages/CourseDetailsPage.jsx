import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCourseById } from '../services/api';

function StarRating({ rating, size = '1rem' }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < full; i++) {
    stars.push(<i key={`f${i}`} className="bi bi-star-fill"></i>);
  }

  if (half) stars.push(<i key="h" className="bi bi-star-half"></i>);

  const empty = 5 - stars.length;
  for (let i = 0; i < empty; i++) {
    stars.push(<i key={`e${i}`} className="bi bi-star"></i>);
  }

  return <div className="stars" style={{ fontSize: size }}>{stars}</div>;
}

export default function CourseDetailsPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [course,setCourse] = useState(null);
  const [loading,setLoading] = useState(true);
  const [activeTab,setActiveTab] = useState('overview');

  useEffect(()=>{

    setLoading(true);

    getCourseById(id)
      .then(res => setCourse(res.data))
      .catch(err => console.error(err))
      .finally(()=>setLoading(false))

  },[id])


  /* LMS ENROLL LOGIC */
  const handleEnroll = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){
      alert("Please login first to enroll in this course");
      navigate("/login");
      return;
    }

    alert("Course Enrolled Successfully!");

    navigate(`/courses/${course.id}/play`);
  };


  if(loading){
    return(
      <div className="loading-screen" style={{minHeight:"60vh"}}>
        <div className="loading-spinner"></div>
        <p>Loading course...</p>
      </div>
    )
  }

  if(!course){
    return(
      <div className="empty-state" style={{minHeight:"60vh"}}>
        <h5>Course not found</h5>
        <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
      </div>
    )
  }

  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);


  return (
    <div>

      {/* HERO */}
      <section className="details-hero">
        <div className="container">

          <h1 className="course-details-title">{course.title}</h1>

          <p className="course-details-desc">{course.description}</p>

          <div className="details-meta">

            <div className="details-meta-item">
              <StarRating rating={course.rating}/>
              <span>{course.rating}</span>
            </div>

            <div className="details-meta-item">
              <span>{course.students?.toLocaleString()} students</span>
            </div>

            <div className="details-meta-item">
              <span>{course.duration}</span>
            </div>

          </div>

        </div>
      </section>



      {/* MAIN CONTENT */}
      <section style={{background:"#F8F7FF",padding:"3rem 0"}}>

        <div className="container">

          <div className="row g-5">

            {/* LEFT SIDE */}
            <div className="col-lg-8">

              {/* TABS */}
              <div style={{display:"flex",gap:"10px",marginBottom:"20px"}}>

                <button onClick={()=>setActiveTab("overview")}>Overview</button>

                <button onClick={()=>setActiveTab("curriculum")}>Curriculum</button>

                <button onClick={()=>setActiveTab("instructor")}>Instructor</button>

              </div>


              {/* OVERVIEW */}
              {activeTab==="overview" && (

                <div className="card p-4">

                  <h4>What you'll learn</h4>

                  <ul>
                    {course.whatYouWillLearn?.map((item,i)=>(
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                </div>

              )}



              {/* CURRICULUM */}
              {activeTab==="curriculum" && (

                <div className="card p-4">

                  <h4>Course Curriculum</h4>

                  {course.lessons?.map((lesson,index)=>(
                    <div key={lesson.id} className="d-flex justify-content-between py-2">

                      <span>{index+1}. {lesson.title}</span>

                      <span>{lesson.duration}</span>

                    </div>
                  ))}

                  <div className="text-center mt-4">

                    <button
                      className="btn btn-primary"
                      onClick={handleEnroll}
                    >
                      Start Learning
                    </button>

                  </div>

                </div>

              )}



              {/* INSTRUCTOR */}
              {activeTab==="instructor" && (

                <div className="card p-4">

                  <h4>{course.instructor}</h4>

                  <p>Expert in {course.category}</p>

                  <p>
                    Experienced instructor with thousands of students and
                    professional experience in the industry.
                  </p>

                </div>

              )}

            </div>



            {/* RIGHT SIDE CHECKOUT */}
            <div className="col-lg-4">

              <div className="checkout-card">

                <img
                  src={course.thumbnail}
                  alt={course.title}
                  style={{width:"100%"}}
                />

                <div className="checkout-card-body">

                  <div className="mb-3">

                    <span className="checkout-price">
                      ₹{course.price}
                    </span>

                    <span className="checkout-original ms-2">
                      ₹{course.originalPrice}
                    </span>

                    <span className="checkout-discount ms-2">
                      {discount}% off
                    </span>

                  </div>


                  <button
                    className="btn btn-enroll w-100"
                    onClick={handleEnroll}
                  >
                    Enroll Now
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}