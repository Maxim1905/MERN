const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes");
const linkRoutes = require("./routes/link.routes");
const redirectRoutes = require("./routes/redirect.routes");
const path = require("path");

const app = express();

const PORT = config.get("port") || 5000;
const MONGO_URI = config.get("mongoUri");

app.use(express.json({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/link", linkRoutes);
app.use("/t", redirectRoutes);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    //Метод connect позоволяет подключиться к базе даннных mongoDB

    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}...`);
    });
  } catch (error) {
    console.log(`Error ${error.message}`);
    process.exit(1);
    // Выход из процесса node.js
  }
}

start();
