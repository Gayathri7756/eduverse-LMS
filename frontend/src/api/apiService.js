import axios from 'axios';
import { SAMPLE_COURSES } from '../utils/sampleData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Enhanced getCourses function with fallback to sample data
 */
export const getCourses = async () => {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) {
    console.warn('API unavailable, using sample data for courses', error);
    return SAMPLE_COURSES;
  }
};

export default api;
