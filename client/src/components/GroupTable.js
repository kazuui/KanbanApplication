import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Page from "./Page";

function GroupTable () {
  
  useEffect( () => {
    fetchGroups();
  }, []);

  const [groupName, setGroupName] = useState("");
  const [Groups, setGroups] = useState([]);

  const fetchGroups = async() => {
    const data = await fetch('/groups'); //fetching data from port 5000 on proxy
    const groups = await data.json();
    setGroups(groups);
  };

  return (
    <section>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>ID</th>
            <th style={{ textAlign: "left" }}>Group Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input autoFocus required id="groupName" name="groupName" className="form-control" type="text" autoComplete="off" placeholder="Group name" onChange={(e) =>{ setGroupName(e.target.value) }} />
            </td>
            <td>
              <Link to={`/groups/create`}>
                <button className="btn btn-edit">Create</button>
              </Link>
            </td>
          </tr>
          {Groups.map((group, index) => {
            return (
              <tr key={group.group_id}>
                <th scope="row">{group.group_id}</th>
                <td>{group.group_name}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  )
}

export default GroupTable;