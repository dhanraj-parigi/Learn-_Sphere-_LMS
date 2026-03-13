import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg lms-navbar">
      <div className="container">

        {/* Brand */}
        <Link to="/" className="lms-brand">
          <div className="brand-icon">
            <i className="bi bi-mortarboard-fill"></i>
          </div>
          LearnSphere
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <i className="bi bi-list fs-4" style={{ color: 'var(--primary)' }}></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Nav Links */}
          <ul className="navbar-nav me-auto ms-4 gap-1">

            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link lms-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <i className="bi bi-house me-1"></i>Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `nav-link lms-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <i className="bi bi-grid me-1"></i>Courses
              </NavLink>
            </li>

          </ul>

          {/* Actions */}

          {user ? (

            <div className="d-flex align-items-center gap-3">

              <span className="fw-bold">
                Welcome {user.name}
              </span>

              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Sign Out
              </button>

            </div>

          ) : (

            <div className="d-flex align-items-center gap-2">

              <NavLink
                to="/login"
                className="nav-link lms-nav-link btn-login"
              >
                Log In
              </NavLink>

              <NavLink
                to="/signup"
                className="btn btn-signup"
              >
                Sign up
              </NavLink>

            </div>

          )}

        </div>
      </div>
    </nav>
  );
}