const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const router = require("./routes/auth.routes");

const app = express();

const PORT = config.get("port") || 5000;
const MONGO_URI = config.get("mongoUri");

app.use("/api/auth", router);

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
