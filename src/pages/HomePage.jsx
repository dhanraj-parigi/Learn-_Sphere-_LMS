import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { getFeaturedCourses, getCategories, getTestimonials } from '../services/api';

const CATEGORIES_ICONS = {
  'Web Development': 'code-slash',
  'Data Science': 'graph-up-arrow',
  'Design': 'palette',
  'Cloud': 'cloud',
  'Mobile Development': 'phone',
  'Security': 'shield-check',
  'Marketing': 'megaphone',
};

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, categoriesRes, testimonialsRes] = await Promise.all([
          getFeaturedCourses(),
          getCategories(),
          getTestimonials(),
        ]);
        setCourses(coursesRes.data);
        setCategories(categoriesRes.data);
        setTestimonials(testimonialsRes.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* ======== HERO SECTION ======== */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="hero-badge animate-in">
                <span className="hero-badge-dot"></span>
                🎓 Trusted by 1,50,000+ learners across India
              </div>
              <h1 className="hero-title animate-in stagger-1">
                Upgrade Your Skills with{' '}
                <span className="highlight">Online Courses</span>
              </h1>
              <p className="hero-subtitle animate-in stagger-2">
                Learn from industry experts and boost your career. Get certified, build real projects, and land your dream job.
              </p>
              <div className="d-flex flex-wrap gap-3 animate-in stagger-3">
                <Link to="/courses" className="btn btn-hero-primary">
                  <i className="bi bi-grid me-2"></i>Browse Courses
                </Link>
                <a href="#how-it-works" className="btn btn-hero-secondary">
                  <i className="bi bi-play-circle me-2"></i>How It Works
                </a>
              </div>

              <div className="hero-stats animate-in stagger-4">
                <div className="hero-stat">
                  <div className="hero-stat-number">50K+</div>
                  <div className="hero-stat-label">Students</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">200+</div>
                  <div className="hero-stat-label">Courses</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">100+</div>
                  <div className="hero-stat-label">Instructors</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">4.8★</div>
                  <div className="hero-stat-label">Avg. Rating</div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="col-lg-6 d-none d-lg-block">
              <div className="hero-visual">
                <div className="hero-float-card">
                  <div className="row g-3">
                    {[
                      { icon: 'code-slash', label: 'Web Dev', color: '#6C3EF4', students: '12.5k' },
                      { icon: 'graph-up', label: 'Data Science', color: '#F59E0B', students: '8.2k' },
                      { icon: 'palette', label: 'UI/UX Design', color: '#10B981', students: '6.7k' },
                      { icon: 'cloud', label: 'Cloud & AWS', color: '#F87171', students: '5.1k' },
                    ].map(item => (
                      <div key={item.label} className="col-6">
                        <div style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 12,
                          padding: '1.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8
                        }}>
                          <div style={{
                            width: 44, height: 44, background: `${item.color}22`,
                            borderRadius: 10, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: '1.2rem', color: item.color
                          }}>
                            <i className={`bi bi-${item.icon}`}></i>
                          </div>
                          <div style={{ color: 'white', fontFamily: 'Sora', fontWeight: 700, fontSize: '0.9rem' }}>{item.label}</div>
                          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>
                            <i className="bi bi-people me-1"></i>{item.students} students
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Progress indicator */}
                  <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>Your Progress</span>
                      <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 700 }}>72%</span>
                    </div>
                    <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 50 }}>
                      <div style={{ height: '100%', width: '72%', background: 'linear-gradient(90deg, var(--primary), var(--primary-light))', borderRadius: 50 }}></div>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', marginTop: 6 }}>React for Beginners · 4/6 lessons</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== TRUST BAR ======== */}
      <section style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '1.5rem 0' }}>
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 text-center">
            {[
              { icon: 'patch-check-fill', label: 'Industry Certifications' },
              { icon: 'shield-check', label: '30-Day Money Back' },
              { icon: 'phone', label: 'Learn on Mobile' },
              { icon: 'translate', label: 'Hindi & English' },
              { icon: 'person-check', label: 'Expert Instructors' },
            ].map(item => (
              <div key={item.label} className="d-flex align-items-center gap-2" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
                <i className={`bi bi-${item.icon}`} style={{ color: 'var(--primary)', fontSize: '1.1rem' }}></i>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CATEGORIES ======== */}
      <section className="category-section">
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-badge mx-auto d-inline-flex">
              <i className="bi bi-grid"></i> Categories
            </div>
            <h2 className="section-title mt-2">Browse Top Categories</h2>
            <p className="section-subtitle">Find the perfect course for your career goals</p>
          </div>

          <div className="row g-4">
            {categories.map(cat => (
              <div key={cat.id} className="col-lg-2 col-md-3 col-sm-4 col-6">
                <Link to={`/courses?category=${cat.name}`} style={{ textDecoration: 'none' }}>
                  <div className="category-card">
                    <div className="category-icon">
                      <i className={`bi bi-${CATEGORIES_ICONS[cat.name] || 'book'}`}></i>
                    </div>
                    <div className="category-name">{cat.name}</div>
                    <div className="category-count">{cat.count} courses</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== FEATURED COURSES ======== */}
      <section style={{ padding: '5rem 0', background: '#F8F7FF' }}>
        <div className="container">
          <div className="d-flex align-items-end justify-content-between flex-wrap gap-3 mb-5">
            <div>
              <div className="section-badge d-inline-flex">
                <i className="bi bi-fire"></i> Featured
              </div>
              <h2 className="section-title mt-2">Our Best Selling Courses</h2>
              <p className="section-subtitle">Handpicked courses loved by thousands of learners</p>
            </div>
            <Link to="/courses" className="btn btn-outline-primary rounded-pill px-4 fw-semibold">
              View All Courses <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          {loading ? (
            <div className="loading-screen">
              <div className="loading-spinner"></div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Loading courses...</p>
            </div>
          ) : (
            <div className="row g-4">
              {courses.map((course, index) => (
                <div key={course.id} className="col-xl-4 col-md-6">
                  <CourseCard course={course} index={index} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ======== WHY CHOOSE US ======== */}
      <section id="how-it-works" style={{ background: 'white', padding: '5rem 0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-badge mx-auto d-inline-flex">
              <i className="bi bi-star"></i> Why Us
            </div>
            <h2 className="section-title mt-2">Why Choose LearnSphere?</h2>
            <p className="section-subtitle">We're different from others — here's how</p>
          </div>

          <div className="row g-4">
            {[
              { icon: 'camera-video', title: 'HD Video Content', desc: 'Crystal clear video lectures with downloadable resources and lifetime access.', color: '#6C3EF4' },
              { icon: 'trophy', title: 'Industry Certifications', desc: 'Earn certificates recognized by top companies across India and globally.', color: '#F59E0B' },
              { icon: 'person-video3', title: 'Live Doubt Sessions', desc: 'Weekly live Q&A sessions with instructors and a dedicated community forum.', color: '#10B981' },
              { icon: 'briefcase', title: 'Job Placement Help', desc: 'Resume reviews, mock interviews, and connections to 500+ hiring partners.', color: '#F87171' },
              { icon: 'phone', title: 'Learn Anywhere', desc: 'Access all courses on mobile, tablet, or desktop. Download for offline study.', color: '#8B63F7' },
              { icon: 'arrow-counterclockwise', title: '30-Day Refund', desc: 'Not satisfied? Get a full refund within 30 days, no questions asked.', color: '#06B6D4' },
            ].map(item => (
              <div key={item.title} className="col-lg-4 col-md-6">
                <div style={{
                  background: '#F8F7FF',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                  height: '100%',
                  transition: 'var(--transition)',
                }}
                  onMouseOver={e => {
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 12px 30px ${item.color}20`;
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: 52, height: 52,
                    background: `${item.color}15`,
                    borderRadius: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.4rem', color: item.color,
                    marginBottom: '1.25rem'
                  }}>
                    <i className={`bi bi-${item.icon}`}></i>
                  </div>
                  <h5 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{item.title}</h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== TESTIMONIALS ======== */}
      <section className="testimonials-section">
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-badge mx-auto d-inline-flex" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <i className="bi bi-chat-quote"></i> Testimonials
            </div>
            <h2 className="section-title mt-2" style={{ color: 'white' }}>What Our Students Say</h2>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.55)' }}>Real stories from real learners</p>
          </div>

          <div className="row g-4">
            {testimonials.map(t => (
              <div key={t.id} className="col-lg-4 col-md-6">
                <div className="testimonial-card">
                  <div className="stars mb-3" style={{ fontSize: '1rem' }}>
                    {[...Array(5)].map((_, i) => <i key={i} className="bi bi-star-fill me-1"></i>)}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    "{t.text}"
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <div className="testimonial-avatar">{t.avatar}</div>
                    <div>
                      <div style={{ color: 'white', fontFamily: 'Sora', fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CTA SECTION ======== */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-40%', right: '-5%',
          width: 400, height: 400,
          background: 'rgba(255,255,255,0.06)', borderRadius: '50%'
        }}></div>
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'Sora', fontSize: '2.5rem', fontWeight: 800, color: 'white', letterSpacing: '-0.8px', marginBottom: '1rem' }}>
            Ready to Start Learning?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: 520, margin: '0 auto 2.5rem' }}>
            Join over 50,000 students already learning on LearnSphere. Get unlimited access to all courses.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/courses" className="btn" style={{
              background: 'white', color: 'var(--primary)',
              fontWeight: 700, padding: '0.85rem 2.2rem',
              borderRadius: 50, fontSize: '1rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              transition: 'var(--transition)'
            }}>
              <i className="bi bi-play-circle me-2"></i>Sign Up & Start Learning
            </Link>
            <a href="#" className="btn" style={{
              background: 'rgba(255,255,255,0.12)', color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              fontWeight: 600, padding: '0.85rem 2.2rem',
              borderRadius: 50, fontSize: '1rem',
              backdropFilter: 'blur(10px)'
            }}>
              View Plans & Pricing
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
