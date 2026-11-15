import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/interview",
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
