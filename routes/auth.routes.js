// подключаем роутер из экспресса и экспортируем его
const { Router } = require("express");
const router = Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");

// обрабатываем два пост запроса

// префикс /api/auth/auth
router.post("/register", async (request, response) => {
  try {
    // с фронта прилетает запрос, в его теле получаем поля
    const { email, password } = request.body;

    // проверяем наличие такого пользователя по email
    const candidate = await User.findOne({ email });

    // если есть то вернем статус ошибки с сообщением
    if (candidate) {
      return response
        .status(400)
        .json({ message: "Такой пользователь уже существует" });
    }
    // если нет, то хэшируем пароль и создаем нового пользователя
    const hashPassword = bcrypt.hash(password, 12);

    const user = new User({ email, password: hashPassword });
    // дожидаемся сохранения в БД и возврашаем статус успешного создания
    await user.save();

    response.status(201).json({ message: "Пользователь создан" });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

// префикс /api/auth/login
router.post("/login", async (request, respons) => {});

module.exports = router;
