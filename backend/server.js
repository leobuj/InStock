const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const cron = require("node-cron");
const deleteExpiredShipments = require("./controllers/shipmentController");
const { notFound, errorHandler } = require("./middleware/ErrorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/shipments", shipmentRoutes);

// Schedule the task to run every day at midnight
cron.schedule("0 0 * * *", () => {
  deleteExpiredShipments();
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
