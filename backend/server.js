
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Management API is running");
});

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/tasks", require("./src/routes/taskRoutes"));

const PORT = process.env.PORT || 5000;
const User = require("./src/models/User");

async function removeObsoletePhoneIndex() {
  const indexes = await User.collection.indexes();
  const obsoleteIndex = indexes.find((index) => {
    const keys = Object.keys(index.key || {});
    return (
      index.unique &&
      keys.length === 1 &&
      index.key.phone === 1
    );
  });

  if (obsoleteIndex) {
    await User.collection.dropIndex(obsoleteIndex.name);
    console.log(`Removed obsolete unique index: ${obsoleteIndex.name}`);
  }
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await removeObsoletePhoneIndex();
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB startup failed:", error.message);
    process.exit(1);
  });
