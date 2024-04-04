import React, { useState, useEffect } from "react";
import "./teams.css";

function TeamHeader({ search, setSearch }) {
  return (
    <>
      <div className="team-header">
        <h3>Team</h3>
        <div className="input-group w-25">
          <span className="input-group-text" id="basic-addon1">
            <i className="bi bi-search" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default TeamHeader;
