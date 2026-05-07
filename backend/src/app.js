const path = require("path");
const dotenv = require("dotenv");

// Must be first — routes transitively create the DB pool on require()
dotenv.config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const codeRoutes = require("./routes/codeRoutes");
const progressRoutes = require("./routes/progressRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({ message: "AlgoPro Judge API is running" });
});

// API routes
app.use("/api", codeRoutes);
app.use("/api", progressRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});