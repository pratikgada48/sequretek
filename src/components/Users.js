import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import Chart from "react-google-charts";

const Users = (props) => {
  const [userList, setUserList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [listUpdated, setListUpdated] = useState(true);
  const [leaderCount, setLeaderCount] = useState(0);
  const [workerCount, setWorkerCount] = useState(0);
  let pagination = [];
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BaseUrl}/api/users?page=${pageNo}`)
      .then((res) => {
        let data = res.data.data.map((item) =>
          item.id % 2 == 0
            ? { ...item, job: "Leader" }
            : { ...item, job: "Worker" }
        );
        data.map((item, i) => {
          item.job === "Leader"
            ? setLeaderCount((prevState) => prevState + 1)
            : setWorkerCount((prevState) => prevState + 1);
        });
        setUserList(data);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNo, listUpdated]);

  const handleAddUser = () => {
    navigate(`/add-user`);
  };

  const handlePageSet = (val) => {
    setPageNo(val);
  };

  const handleEditUser = (val) => {
    navigate(`/edit-user`, { state: { id: val } });
  };

  const handleDeleteUser = (val) => {
    axios
      .delete(`${BaseUrl}/api/users/${val}`)
      .then((res) => {
        setListUpdated(!listUpdated);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  for (let i = 1; i <= totalPages; i++) {
    pagination.push(i);
  }

  const data = [
    ["Job Role", "Job Count"],
    ["Leaders", leaderCount],
    ["Workers", workerCount],
  ];

  const options = {
    title: "Sequretek Jobs",
  };

  return (
    <>
      <h2 className="title">SEQURETEK ASSIGNMENT</h2>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
      <div className="container">
        <h3 className="heading">Users List</h3>
        <button className="addBtn" onClick={handleAddUser}>
          Add User
        </button>

        <div className="table-container">
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Email ID</th>
                <th>Job</th>
                <th>Avatar</th>
                <th>Edit/Delete User</th>
              </tr>
              {userList?.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.first_name} {item.last_name}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.job}</td>
                  <td>{item.avatar}</td>
                  <td>
                    <button
                      type="button"
                      className="editBtn"
                      onClick={() => handleEditUser(item.id)}
                    >
                      Edit
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      className="deleteBtn"
                      onClick={() => handleDeleteUser(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pagination?.map((item) => (
          <button
            className="pagination"
            key={item}
            onClick={() => handlePageSet(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
};

export default Users;
