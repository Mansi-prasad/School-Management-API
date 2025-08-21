import express from "express";
import dotenv from "dotenv";

import schoolRoute from "./src/routes/school.routes.js";

dotenv.config();

const app = express();
const port = 5000;

// middleware
app.use(express.json());

// API routes
app.get("/", (req, res) => {
  res.send("Home page route ");
});

app.use("/api/school", schoolRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});