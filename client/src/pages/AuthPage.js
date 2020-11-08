import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { useMessage } from "../hooks/messageHook";
import { AuthContext } from "../context/authContext";

export const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, request, error, clearError } = useHttp();

  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log("data", data);
      message(data.message);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });

      login(data.token, data.userId);

      message(data.message);
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  name="email"
                  type="text"
                  className="validate"
                  onChange={changeHandler}
                  value={form.email}
                />
                <label className="active" htmlFor="email">
                  Почта
                </label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  name="password"
                  type="text"
                  className="validate"
                  onChange={changeHandler}
                  value={form.password}
                />
                <label className="active" htmlFor="password">
                  Last Name
                </label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              onClick={loginHandler}
              style={{ marginRight: "10px" }}
              disabled={loading}
            >
              Войти
            </button>

            <button onClick={registerHandler} disabled={loading}>
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
