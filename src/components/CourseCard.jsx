import { Link } from 'react-router-dom';

function StarRating({ rating }) {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  for (let i = 0; i < full; i++) {
    stars.push(<i key={`f${i}`} className="bi bi-star-fill"></i>);
  }
  if (half) stars.push(<i key="h" className="bi bi-star-half"></i>);
  const empty = 5 - stars.length;
  for (let i = 0; i < empty; i++) {
    stars.push(<i key={`e${i}`} className="bi bi-star"></i>);
  }

  return <div className="stars">{stars}</div>;
}

function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`;
}

function getDiscount(original, current) {
  return Math.round(((original - current) / original) * 100);
}

export default function CourseCard({ course, index = 0 }) {
  const discount = getDiscount(course.originalPrice, course.price);

  return (
    <div className={`course-card animate-in stagger-${Math.min(index + 1, 6)}`}>
      {/* Thumbnail */}
      <div className="card-thumbnail-wrapper">
        <img
          src={course.thumbnail}
          alt={course.title}
          onError={e => {
            e.target.src = `https://placehold.co/480x270/6C3EF4/white?text=${encodeURIComponent(course.title.slice(0, 20))}`;
          }}
        />
        <span className="card-badge">
          <i className="bi bi-bar-chart-fill me-1" style={{ fontSize: '0.65rem' }}></i>
          {course.level}
        </span>
        <button className="card-wishlist">
          <i className="bi bi-heart" style={{ fontSize: '0.85rem', color: '#64748B' }}></i>
        </button>
      </div>

      {/* Body */}
      <div className="course-card-body">
        <p className="course-category">{course.category}</p>
        <h5 className="course-title">{course.title}</h5>
        <p className="course-instructor">
          <i className="bi bi-person-circle" style={{ color: 'var(--primary)', fontSize: '0.9rem' }}></i>
          {course.instructor}
        </p>

        {/* Rating */}
        <div className="rating-row">
          <span className="rating-number">{course.rating.toFixed(1)}</span>
          <StarRating rating={course.rating} />
          <span className="rating-count">({course.reviews?.toLocaleString()})</span>
        </div>

        {/* Meta */}
        <div className="course-meta">
          <span>
            <i className="bi bi-play-circle me-1"></i>
            {course.lessons?.length || 0} lessons
          </span>
          <span>·</span>
          <span>
            <i className="bi bi-clock me-1"></i>
            {course.duration}
          </span>
        </div>

        {/* Price Row */}
        <div className="price-row">
          <div className="d-flex align-items-baseline flex-wrap gap-1">
            <span className="current-price">{formatPrice(course.price)}</span>
            {course.originalPrice && (
              <>
                <span className="original-price">{formatPrice(course.originalPrice)}</span>
                <span className="discount-badge">{discount}% off</span>
              </>
            )}
          </div>
          <Link to={`/courses/${course.id}`} className="btn-view-course">
            Enroll
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
