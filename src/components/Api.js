// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apiqa.mrhecloud.com/',
});


// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add token or custom headers here
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Il9qTndqZVNudlRUSzhYRWRyNVFVUGtCUkxMbyIsImtpZCI6Il9qTndqZVNudlRUSzhYRWRyNVFVUGtCUkxMbyJ9.eyJhdWQiOiJhcGk6Ly80NWI0ZjllYy0zMjBlLTRhODctYjMwYy0zMWNmMWMxOTNmZTMiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81MjMxNTc0ZC0zYTQyLTQ5YTMtOWNkOC01OTkxZDk3YjA1ZTcvIiwiaWF0IjoxNzUyNjY1ODA2LCJuYmYiOjE3NTI2NjU4MDYsImV4cCI6MTc1MjY2OTcwNiwiYWlvIjoiazJSZ1lGRExmN1hQa3QzWHRPUGI1UGdVOGZnN0FBPT0iLCJhcHBpZCI6IjQ1YjRmOWVjLTMyMGUtNGE4Ny1iMzBjLTMxY2YxYzE5M2ZlMyIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzUyMzE1NzRkLTNhNDItNDlhMy05Y2Q4LTU5OTFkOTdiMDVlNy8iLCJvaWQiOiI4MjdlNWNiYS0yMmYxLTRkNDgtOWFmMy1jNWQ3NmVjZGQ0N2UiLCJyaCI6IjEuQVNBQVRWY3hVa0k2bzBtYzJGbVIyWHNGNS16NXRFVU9Nb2RLc3d3eHp4d1pQLU94QVFBZ0FBLiIsInJvbGVzIjpbIklza2FuLkdsb2JhbC5BZG1pbiJdLCJzdWIiOiI4MjdlNWNiYS0yMmYxLTRkNDgtOWFmMy1jNWQ3NmVjZGQ0N2UiLCJ0aWQiOiI1MjMxNTc0ZC0zYTQyLTQ5YTMtOWNkOC01OTkxZDk3YjA1ZTciLCJ1dGkiOiJjN05HaG1XUmxVeUgwdFo1eWExdEFBIiwidmVyIjoiMS4wIiwieG1zX2Z0ZCI6IjRRdFJEd0Jsc1NNZE5id1ZXUi0yaGJHYWVreExHQTMtamdUV3RDTjZjNk1CWm5KaGJtTmxZeTFrYzIxeiJ9.iup3_blaC7JKjdut0PslU65k1YVxCrH_7BQvskeiKGOCUXhZFry3sykwIxHOsaUKN95GqfkfqCfa2KaLjgwYN8r7bZa1Az7j-mwMOk8-n6Jss1dvnMHC9TaIP-8_KSbDlnvDO-2lfSZBGaKv9qGRM3LEVqdVh--2ytvcxIxtKKjEKMCsjSNL_VK1xsX0uS0no_3aaQmtWBwaN3zaIhgB335v18CcmtQ2gCTrpRl5mRzHBm-NgX8vmZG12Hk52ZJVEGAJ2THCYg-bEVRYrEd6u3c-m5DrrY4GoTmwB3U1lk_c4G2DpXh11V25cSu0geCkDT0yb4EswAGHMWQ_0JADUA';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    if (error.response.status === 401) {
      // Handle unauthorized access
      console.warn("Unauthorized, redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default api;
