import React, { useState, useEffect } from "react";
import TeamHeader from "./TeamHeader";
import axios from "axios";
import _ from "lodash";

function TeamPage() {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("/data.json");
    const groupData = _.groupBy(response.data, "role");
    setUserData(groupData);
    console.log(JSON.stringify(Object.keys(groupData).reverse()));
  };

  const filteredData = (userData) =>
    userData.filter((data) => {
      return (
        data.first_name
          .toString()
          .toLowerCase()
          .includes(search.toString().toLocaleLowerCase()) ||
        data.last_name
          .toString()
          .toLowerCase()
          .includes(search.toString().toLocaleLowerCase())
      );
    });

  return (
    <>
      <TeamHeader search={search} setSearch={setSearch} />
      <div className="user-data">
        {Object.entries(userData)?.map(([keys, values], index) => (
          <div className="row m-0 user-row">
            <div className="col-md-12 col-sm-12 col-xs-12 role">
              <h3>{keys === "admin" ? "Administrators" : "Members"}</h3>
            </div>
            {filteredData(values).length != 0? filteredData(values).map((user) => (
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="user-inner mb-4">
                  <div>
                    <img className="user-img" alt="userimg" src={user.img} />
                  </div>
                  <div className="inner-user-data">
                    <h6>
                      {user.first_name} {user.last_name}
                    </h6>
                    <p>{user.email}</p>
                  </div>
                </div>
              </div>
            )): <div className="col-md-12 col-sm-12 col-xs-12">No data found.</div>}
          </div>
        ))}
      </div>
    </>
  );
}

export default TeamPage;
