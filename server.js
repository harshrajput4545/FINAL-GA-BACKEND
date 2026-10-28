
import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} | ${req.method} ${req.url}`
  );
  next();
});

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "its done bro🚀",
    version: "1.0.0",
    endpoints: ["/health", "/api/info", "/api/users"],
  });
});

// Health check - useful for DevOps monitoring
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Application information
app.get("/api/info", (req, res) => {
  res.json({
    app: "Express Pro Server",
    environment: process.env.NODE_ENV || "development",
    platform: process.platform,
    nodeVersion: process.version,
  });
});

// Sample users API
const users = [
  { id: 1, name: "Harsh", role: "DevOps Trainee" },
  { id: 2, name: "Aman", role: "Backend Developer" },
];

app.get("/api/users", (req, res) => {
  res.json({
    success: true,
    count: users.length,
    data: users,
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Local: http://localhost:${PORT}`);
});
