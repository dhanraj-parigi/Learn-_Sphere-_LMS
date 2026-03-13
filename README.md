# 🎓 LearnSphere — LMS Platform

A modern, production-ready Learning Management System built with **React + Vite + Bootstrap**.

---

## ✨ Features

- 🏠 **Home Page** with hero section, featured courses, categories, testimonials, and CTA
- 📚 **Courses Page** with search, filter by category, filter by price, and sorting
- 📄 **Course Details Page** with tabs (overview, curriculum, instructor), sticky checkout card
- 🎥 **Course Player Page** with YouTube embed, sidebar lesson list, progress tracking
- 🌙 Dark hero sections with gradient backgrounds
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Custom design with `Sora` + `DM Sans` fonts and purple brand theme

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd lms-platform
npm install
```

### 2. Start the Fake Backend (JSON Server)
```bash
npx json-server --watch backend/db.json --port 3001
```
> The API will be available at: `http://localhost:3001`

### 3. Start the Frontend (in a new terminal)
```bash
npm run dev
```
> App runs at: `http://localhost:5173`

---

## 📁 Project Structure

```
lms-platform/
├── backend/
│   └── db.json              # Fake API data (10 courses, categories, testimonials)
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Sticky top navbar with brand + links
│   │   ├── Footer.jsx       # Full footer with links, socials, newsletter
│   │   └── CourseCard.jsx   # Reusable course card with price, rating, discount
│   ├── pages/
│   │   ├── HomePage.jsx     # Hero + categories + featured courses + testimonials
│   │   ├── CoursesPage.jsx  # All courses with search + filters
│   │   ├── CourseDetailsPage.jsx  # Full course info + checkout sidebar
│   │   └── CoursePlayerPage.jsx   # Video player + lesson sidebar + progress
│   ├── services/
│   │   └── api.js           # Axios API functions
│   ├── styles/
│   │   └── custom.css       # All custom CSS with CSS variables
│   ├── App.jsx              # Routes
│   └── main.jsx             # Entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| React Router v6 | Client-side routing |
| Bootstrap 5.3 | CSS framework |
| Bootstrap Icons | Icon library |
| Axios | HTTP requests |
| JSON Server | Fake REST API backend |
| Google Fonts | Sora + DM Sans typography |

---

## 📡 API Endpoints (JSON Server)

| Endpoint | Description |
|----------|-------------|
| `GET /courses` | All courses |
| `GET /courses/:id` | Single course by ID |
| `GET /courses?_limit=6` | First 6 courses (featured) |
| `GET /courses?category=Web Development` | Filter by category |
| `GET /categories` | All categories |
| `GET /testimonials` | Student testimonials |

---

## 🎨 Design System

- **Primary color**: `#6C3EF4` (purple)
- **Accent color**: `#F59E0B` (amber)
- **Display font**: Sora (headings)
- **Body font**: DM Sans (text)
- **Border radius**: 8–24px
- **Theme**: Light with dark hero sections

---

## 💡 Notes

- Course thumbnails use real Udemy CDN images (may vary by availability)
- YouTube videos are real educational content embeds
- All prices are in Indian Rupees (₹)
- The app runs fully locally without any paid services

---

© 2024 LearnSphere Technologies Pvt. Ltd.
