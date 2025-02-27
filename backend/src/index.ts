import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("stratos backend's running"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server's running on port ${PORT}`);
});
