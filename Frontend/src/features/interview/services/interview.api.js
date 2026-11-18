import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api/interview`
  : "/api/interview";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export async function generateReport(formData) {
  try {
    const response = await api.post("/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      "Failed to generate report. Please try again.";
    const err = new Error(msg);
    err.errorCode = error.response?.data?.error;
    throw err;
  }
}

export async function getReports() {
  try {
    const response = await api.get("/reports");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch reports"
    );
  }
}

export async function getReportById(id) {
  try {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch report"
    );
  }
}

export async function getStats() {
  try {
    const response = await api.get("/stats");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch statistics"
    );
  }
}
