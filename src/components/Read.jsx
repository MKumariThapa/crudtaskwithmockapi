import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Read = () => {
  const [datas, setDatas] = useState([]);
  const [tabledark, setTableDark] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  // const history = useNavigate();
  const getData = () => {
    axios
      .get("https://63b6e65f4f17e3a931c3f074.mockapi.io/crude-operation")
      .then((res) => {
        console.log(res.data);
        setDatas(res.data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (recID) => {
    console.log(recID);
    axios
      .delete(
        `https://63b6e65f4f17e3a931c3f074.mockapi.io/crude-operation/${recID}`
      )
      .then(() => {
        getData();
      });
  };
  // const viewData = (recId) => {

  //   console.log(recId);
  // };
  const inputSearchHanlde = (e) => {
    setInputSearch(e.target.value.toLowerCase());
  };
  return (
    <>
      {/* <h2>Read Datas</h2> */}
      <div class="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          onClick={() => {
            if (tabledark === "table-dark") {
              setTableDark("");
            } else {
              setTableDark("table-dark");
            }
          }}
        />
      </div>
      <div className="d-flex justify-content-between">
        <h2>Read Datas </h2>
        <div class="mb-3">
          <input
            type="search"
            class="form-control"
            placeholder="search..."
            onChange={inputSearchHanlde}
          />
        </div>
        <Link to="/">
          <button className="btn btn-primary">Create Data</button>
        </Link>
      </div>
      <table className={`table ${tabledark}`}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>

            {/* <th scope="col"></th> */}
          </tr>
        </thead>
        {datas
          .filter((singleEl) => {
            if (singleEl === "") {
              return singleEl;
            } else {
              return (
                singleEl.name.toLowerCase().includes(inputSearch) ||
                singleEl.email.toLowerCase().includes(inputSearch)
              );
            }
          })
          .map((singleData) => {
            // datas.map((singleData) => {
            return (
              <>
                <tbody>
                  <tr>
                    <th scope="row">{singleData.id}</th>
                    <td>{singleData.name}</td>
                    <td>{singleData.email}</td>

                    <td>
                      {/* <Link to="/update/"> */}
                      <Link to={`/update/${singleData.id}`}>
                        <button
                          className="btn-success"
                          // onClick={() => viewData(singleData.id)}
                        >
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(singleData.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
      </table>
    </>
  );
};

export default Read;
