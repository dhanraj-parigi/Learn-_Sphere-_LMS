import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
});

// Courses
export const getCourses = () => API.get('/courses');
export const getCourseById = (id) => API.get(`/courses/${id}`);
export const getFeaturedCourses = () => API.get('/courses?_limit=6');
export const getCoursesByCategory = (category) => API.get(`/courses?category=${category}`);

// Categories
export const getCategories = () => API.get('/categories');

// Testimonials
export const getTestimonials = () => API.get('/testimonials');

export default API;
