import dotenv from "dotenv";

dotenv.config();

import express from "express";

import authRoutes from "./routes/auth.route";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

//Health Check
app.get("/", (_, res) => {
  res.json({
    status: "OK",
    message: "JWT Auth API Running"
  });
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});