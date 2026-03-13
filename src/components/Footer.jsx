import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="lms-footer">
      <div className="container">
        <div className="row g-5">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">
              <div className="brand-icon" style={{ width: 36, height: 36, background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1rem' }}>
                <i className="bi bi-mortarboard-fill"></i>
              </div>
              LearnSphere
            </div>
            <p className="footer-desc">
              India's most loved online learning platform. Learn from industry experts, gain certifications, and accelerate your career.
            </p>
            <div className="footer-social">
              {[
                { icon: 'twitter-x', href: '#' },
                { icon: 'linkedin', href: '#' },
                { icon: 'youtube', href: '#' },
                { icon: 'instagram', href: '#' },
                { icon: 'facebook', href: '#' },
              ].map(({ icon, href }) => (
                <a key={icon} href={href} className="social-btn">
                  <i className={`bi bi-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="footer-heading">Platform</h6>
            <ul className="footer-links">
              {['Home', 'Courses', 'Instructors', 'Certifications', 'Blog', 'Pricing'].map(link => (
                <li key={link}>
                  <a href="#">
                    <i className="bi bi-arrow-right-short"></i>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="footer-heading">Categories</h6>
            <ul className="footer-links">
              {['Web Development', 'Data Science', 'UI/UX Design', 'Cloud & DevOps', 'Cybersecurity', 'Mobile Dev'].map(cat => (
                <li key={cat}>
                  <a href="#">
                    <i className="bi bi-arrow-right-short"></i>
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6">
            <h6 className="footer-heading">Contact Us</h6>
            <div className="footer-contact-item">
              <i className="bi bi-geo-alt-fill"></i>
              <span>4th Floor, Tower B, DLF Cyber City, Gurugram, Haryana 122002</span>
            </div>
            <div className="footer-contact-item">
              <i className="bi bi-envelope-fill"></i>
              <span>hello@learnsphere.in</span>
            </div>
            <div className="footer-contact-item">
              <i className="bi bi-telephone-fill"></i>
              <span>+91 98765 43210</span>
            </div>
            <div className="footer-contact-item">
              <i className="bi bi-clock-fill"></i>
              <span>Mon–Sat, 9:00 AM – 6:00 PM IST</span>
            </div>

            {/* Newsletter */}
            <div className="mt-4">
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Subscribe to our newsletter</p>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    borderRadius: '10px 0 0 10px',
                    fontSize: '0.85rem'
                  }}
                />
                <button
                  className="btn"
                  style={{ background: 'var(--primary)', color: 'white', borderRadius: '0 10px 10px 0', border: 'none', padding: '0 1.2rem', fontSize: '0.85rem', fontWeight: 600 }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          <p className="footer-copyright mb-0">
            © {new Date().getFullYear()} LearnSphere Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="d-flex gap-4" style={{ fontSize: '0.85rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'].map(link => (
              <a key={link} href="#" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseOver={e => e.target.style.color = 'white'}
                onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.3)'}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
