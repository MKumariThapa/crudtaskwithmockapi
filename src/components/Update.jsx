import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { useParams } from "react-router";
const Update = () => {
  const [datas, setDatas] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useNavigate();

  let { id } = useParams();
  console.log(id, "id is");

  const getData = () => {
    axios
      // .get("https://63b6e65f4f17e3a931c3f074.mockapi.io/crude-operation/")
      .get(`https://63b6e65f4f17e3a931c3f074.mockapi.io/crude-operation/${id}`)

      .then((res) => {
        // console.log(res.data, "id is");
        // console.log("email", res.data.email);
        setDatas(res.data);
        // console.log("datas", datas);
        setName(res.data.name);
        setEmail(res.data.email);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const header = { "Access-Control-Allow-Origin": "*" };
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("clicked");
    axios
      .put(
        `https://63b6e65f4f17e3a931c3f074.mockapi.io/crude-operation/${id}`,
        {
          name: name,
          email: email,
          header,
        }
      )
      .then(() => {
        history("/read");
      });
  };
  return (
    <>
      <h2>Update Data </h2>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            // id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            // id="exampleInputPassword1"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mx-2"
          onClick={handleUpdate}
        >
          Update
        </button>
        <Link to="/read">
          <button className="btn btn-secondary mx-2">Back</button>
        </Link>
      </form>
    </>
  );
};

export default Update;
