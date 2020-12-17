// Инициализация проекта:
// - npm init
// - ответить на базовые вопросы которые предлагает wizard
// - для того чтобы разрабатывать на Ноде нужны базовые зависимости – express, mongoose
// - пакеты для разработки nodemon, concurrently
// - создаем начальные скрипты для запуска фронта и бека
// Чтобы создать базовое приложение на express мы получаем его через require.
// В node.js чтобы получать пакеты у нас есть глобальная функция require.

const express = require("express");
const config = require("config");
// подключаемся к mongoDB
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.routes");

// сервер
const app = express();

// регистрируем роуты которые будут обрабатывать апи запросы с фронта
app.use("/api/auth", authRoute);

const PORT = config.get("port") || 5000;
const MONGO_URI = config.get("mongoUri");

// нужно вызвать метод connect который позволит подключиться к базе данных, метод возвращает промис, поэтому оборачиваем в ассинхронную функцию

const start = async () => {
  // try catch чтоб обработать промис
  try {
    // uri и набор опций
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log("Server Error", error.message);

    // выйти из процесса node.js
    process.exit(1);
  }
};

start();

app.listen(PORT, () => console.log(`App has been started on ${PORT}...`));
