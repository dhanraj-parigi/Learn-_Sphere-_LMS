import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCourseById } from '../services/api';

export default function CoursePlayerPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){
      alert("Please login to watch this course");
      navigate("/login");
      return;
    }

    getCourseById(id)
      .then(res => setCourse(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

  }, [id, navigate]);


  const handleLessonClick = (index) => {
    setCurrentLesson(index);
  };


  const handleMarkComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(currentLesson);
    setCompleted(newCompleted);
  };


  const handleNextLesson = () => {

    const newCompleted = new Set(completed);
    newCompleted.add(currentLesson);
    setCompleted(newCompleted);

    if(currentLesson < course.lessons.length - 1){
      setCurrentLesson(currentLesson + 1);
    }

  };


  if (loading) {
    return (
      <div className="loading-screen" style={{ minHeight: '60vh' }}>
        <div className="loading-spinner"></div>
        <p style={{ color: 'var(--text-secondary)' }}>Loading player...</p>
      </div>
    );
  }


  if (!course) {
    return (
      <div className="empty-state" style={{ minHeight: '60vh' }}>
        <i className="bi bi-exclamation-circle d-block mb-3" style={{ fontSize: '3rem' }}></i>
        <h5>Course not found</h5>
        <Link to="/courses" className="btn btn-primary rounded-pill mt-3">
          Browse Courses
        </Link>
      </div>
    );
  }


  const lesson = course.lessons[currentLesson];

  const progress = Math.round(
    (completed.size / course.lessons.length) * 100
  );

  const isLast = currentLesson === course.lessons.length - 1;


  return (

    <div className="player-layout">

      {/* VIDEO AREA */}
      <div className="player-main">

        <div className="video-container">
          <iframe
            src={`${lesson.video}?autoplay=0&rel=0`}
            title={lesson.title}
            allowFullScreen
          />
        </div>


        {/* LESSON INFO */}
        <div className="player-info">

          <div className="d-flex justify-content-between flex-wrap gap-3">

            <div>
              <p className="player-course-name mb-1">

                <Link
                  to={`/courses/${course.id}`}
                  style={{
                    color:'rgba(255,255,255,0.45)',
                    textDecoration:'none',
                    fontSize:'0.82rem'
                  }}
                >
                  <i className="bi bi-arrow-left me-1"></i>
                  {course.title}

                </Link>

              </p>

              <h2 className="player-lesson-title">
                {currentLesson + 1}. {lesson.title}
              </h2>

            </div>


            <div className="d-flex gap-2">

              <button
                onClick={handleMarkComplete}
                disabled={completed.has(currentLesson)}
                className="btn btn-sm"
              >

                {completed.has(currentLesson)
                  ? "Completed"
                  : "Mark Complete"}

              </button>

            </div>

          </div>

        </div>


        {/* CONTROLS */}
        <div className="player-controls">


          {/* Previous */}
          <button
            className="btn btn-sm"
            disabled={currentLesson === 0}
            onClick={() =>
              setCurrentLesson(prev => Math.max(0, prev - 1))
            }
          >
            Previous
          </button>


          {/* Progress */}
          <div className="progress-bar-wrapper">

            <div className="progress-label">
              <span>Course Progress</span>
              <span>
                {progress}% · {completed.size}/{course.lessons.length}
              </span>
            </div>

            <div className="custom-progress">

              <div
                className="custom-progress-bar"
                style={{ width: `${progress}%` }}
              ></div>

            </div>

          </div>


          {/* Next */}
          <button
            className="btn btn-next-lesson"
            onClick={handleNextLesson}
            disabled={isLast && completed.has(currentLesson)}
          >

            {isLast
              ? completed.has(currentLesson)
                ? "Course Complete!"
                : "Finish Course"
              : "Next Lesson"}

          </button>

        </div>

      </div>


      {/* SIDEBAR */}
      <div className="player-sidebar">

        <div className="sidebar-header">

          <div className="d-flex justify-content-between">

            <span>
              <i className="bi bi-list-ul me-2"></i>
              Course Content
            </span>

            <span style={{fontSize:"0.8rem"}}>
              {course.lessons.length} lessons
            </span>

          </div>

        </div>


        {/* Lessons */}
        {course.lessons.map((l,index)=>(

          <div
            key={l.id}
            className={`sidebar-lesson-item 
              ${currentLesson === index ? 'active' : ''} 
              ${completed.has(index) ? 'completed' : ''}`}
            onClick={()=>handleLessonClick(index)}
          >

            <div className="sidebar-lesson-num">

              {completed.has(index)
                ? "✓"
                : currentLesson === index
                ? "▶"
                : index + 1}

            </div>


            <div style={{flex:1}}>

              <div className="sidebar-lesson-title">
                {l.title}
              </div>

              <div className="sidebar-lesson-duration">
                {l.duration}
              </div>

            </div>

          </div>

        ))}


        {/* CERTIFICATE */}
        {progress === 100 && (

          <div
            style={{
              padding:"1.5rem",
              margin:"1rem",
              background:"rgba(16,185,129,0.1)",
              borderRadius:12,
              textAlign:"center"
            }}
          >

            <h6>Course Completed!</h6>

            <button className="btn btn-success btn-sm w-100">
              Download Certificate
            </button>

          </div>

        )}

      </div>

    </div>

  );
}