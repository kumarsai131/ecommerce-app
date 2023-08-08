import axios from "axios";
import { useEffect, useState } from "react";

export default function AddEditUsers() {
  const [users, setUsers] = useState([]);

  function getAllUsers() {
    axios.get("http://localhost:8080/getAllUsers").then((res) => {
      setUsers(res.data);
    });
  }

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <div>
        <ul>
          {users.map((e) => {
            return (
              <li>
                {e.username} - {e.role}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
