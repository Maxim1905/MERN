import React, { useContext, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
  const auth = useContext(AuthContext);
  const [link, setLink] = useState();

  const history = useHistory();

  const { request } = useHttp();

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer: ${auth.token}` }
        );

        console.log("data ", data);
        history.push(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            className="validate"
            onChange={(event) => {
              setLink(event.target.value);
            }}
            onKeyPress={pressHandler}
            value={link}
          />
          <label className="active" htmlFor="link">
            Введите ссылку
          </label>
        </div>
      </div>
    </div>
  );
};
