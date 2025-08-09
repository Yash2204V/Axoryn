// Simple utility for making authenticated API calls

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Helper function for making authenticated fetch requests
export const authenticatedFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers
    }
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    // Handle 401 unauthorized - token might be expired
    if (response.status === 401) {
      localStorage.removeItem('token');
      // You could dispatch logout action here if needed
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Helper for multipart/form-data requests (file uploads)
export const authenticatedFormDataFetch = async (endpoint, formData) => {
  const token = localStorage.getItem('token');
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    method: 'POST',
    body: formData,
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` })
      // Don't set Content-Type for FormData, browser will set it with boundary
    }
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};
