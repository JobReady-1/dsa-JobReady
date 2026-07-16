const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const codeRoutes = require("./routes/codeRoutes");
const progressRoutes = require("./routes/progressRoutes");
const codeStorageRoutes = require("./routes/codeStorageRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({ message: "AlgoPro Judge API is running" });
});

// API routes
app.use("/api", codeRoutes);
app.use("/api", progressRoutes);
app.use("/api", codeStorageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});