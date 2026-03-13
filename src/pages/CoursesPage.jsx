import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { getCourses } from '../services/api';

const ALL_CATEGORIES = ['All', 'Web Development', 'Data Science', 'Design', 'Cloud', 'Mobile Development', 'Security', 'Marketing'];
const SORT_OPTIONS = [
  { value: 'default', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export default function CoursesPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    getCourses()
      .then(res => {
        setCourses(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...courses];

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(c => c.category === selectedCategory);
    }

    // Price filter
    if (priceRange === 'free') {
      result = result.filter(c => c.price === 0);
    } else if (priceRange === 'under500') {
      result = result.filter(c => c.price < 500);
    } else if (priceRange === '500-1000') {
      result = result.filter(c => c.price >= 500 && c.price <= 1000);
    } else if (priceRange === 'above1000') {
      result = result.filter(c => c.price > 1000);
    }

    // Sort
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    setFiltered(result);
  }, [courses, search, selectedCategory, sortBy, priceRange]);

  return (
    <div>
      {/* Header */}
      <section className="courses-header">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <h1 style={{ fontFamily: 'Sora', fontSize: '2.5rem', fontWeight: 800, color: 'white', letterSpacing: '-0.8px', marginBottom: '0.75rem' }}>
                All Courses
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', margin: 0 }}>
                Discover {courses.length}+ courses across all categories
              </p>
            </div>
            <div className="col-lg-6">
              <div className="search-bar-wrapper ms-lg-auto">
                <i className="bi bi-search search-bar-icon"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search courses, instructors..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

        {/*** */}
{/* Student Dashboard */}
{user && (
  <div className="container mt-4">

    <h4 className="mb-4">
      Welcome {user.name}
    </h4>

    <div className="row g-3 mb-4">

      <div className="col-md-4">
        <div className="card shadow-sm text-center p-3">
          <h6 className="text-muted">Enrolled Courses</h6>
          <h3>2</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm text-center p-3">
          <h6 className="text-muted">Completed Courses</h6>
          <h3>1</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm text-center p-3">
          <h6 className="text-muted">Total Courses</h6>
          <h3>{courses.length}</h3>
        </div>
      </div>

    </div>

  </div>
)}


      {/* Filters Bar */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '1rem 0', position: 'sticky', top: 64, zIndex: 100, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
        <div className="container">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0 }}>
              Filter:
            </span>
            <div className="d-flex gap-2 flex-wrap filter-pills">
              {ALL_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="ms-auto d-flex align-items-center gap-3 flex-shrink-0">
              {/* Price filter */}
              <select
                className="form-select form-select-sm"
                style={{ borderRadius: 50, border: '1.5px solid var(--border)', fontSize: '0.85rem', padding: '0.4rem 2rem 0.4rem 1rem', minWidth: 140 }}
                value={priceRange}
                onChange={e => setPriceRange(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="under500">Under ₹500</option>
                <option value="500-1000">₹500 – ₹1,000</option>
                <option value="above1000">Above ₹1,000</option>
              </select>
              {/* Sort */}
              <select
                className="form-select form-select-sm"
                style={{ borderRadius: 50, border: '1.5px solid var(--border)', fontSize: '0.85rem', padding: '0.4rem 2rem 0.4rem 1rem', minWidth: 160 }}
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <section style={{ padding: '2.5rem 0 4rem', background: '#F8F7FF', minHeight: '60vh' }}>
        <div className="container">
          {/* Results count */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <p className="results-count mb-0">
              {loading ? 'Loading...' : (
                <>Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'course' : 'courses'}
                  {selectedCategory !== 'All' && <> in <strong>{selectedCategory}</strong></>}
                  {search && <> for "<strong>{search}</strong>"</>}
                </>
              )}
            </p>
            {(search || selectedCategory !== 'All' || priceRange !== 'all') && (
              <button
                className="btn btn-sm"
                style={{ fontSize: '0.82rem', color: 'var(--primary)', background: 'rgba(108,62,244,0.08)', borderRadius: 50, border: 'none', padding: '0.35rem 1rem' }}
                onClick={() => { setSearch(''); setSelectedCategory('All'); setPriceRange('all'); setSortBy('default'); }}
              >
                <i className="bi bi-x me-1"></i>Clear Filters
              </button>
            )}
          </div>

          {loading ? (
            <div className="loading-screen">
              <div className="loading-spinner"></div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Loading courses...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-search d-block mb-3" style={{ fontSize: '3rem', color: 'var(--text-muted)' }}></i>
              <h5 style={{ fontFamily: 'Sora', fontWeight: 700 }}>No courses found</h5>
              <p style={{ fontSize: '0.9rem' }}>Try adjusting your filters or search terms</p>
              <button
                className="btn btn-primary rounded-pill px-4 mt-2"
                onClick={() => { setSearch(''); setSelectedCategory('All'); setPriceRange('all'); }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {filtered.map((course, index) => (
                <div key={course.id} className="col-xl-4 col-md-6">
                  <CourseCard course={course} index={index % 6} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
