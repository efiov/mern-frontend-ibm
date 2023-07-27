import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import InputAtom from "../atoms/Input";

export default function User() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch("http://localhost:3001/getUsers");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };
    fetchPeople();
  }, []);

  const updateRoleToAdmin = (id) => {
    axios.post("http://localhost:3001/updateRoleToAdmin", {
      id: id,
    });
    window.location.reload(false);
  };

  const updateRoleToUser = (id) => {
    axios.post("http://localhost:3001/updateRoleToUser", {
      id: id,
    });
    window.location.reload(false);
  };

  const filteredUsers = users
    ? users.filter((user) => {
        const regex = new RegExp(searchQuery, "i");
        return regex.test(user.name);
      })
    : [];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end", margin: "10px" }}>
        <InputAtom
          label="Search User"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: 16 }}
        />
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Old Role</TableCell>
              <TableCell>New role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.role === "ADMIN" ? (
                    <Button
                      variant="outlined"
                      onClick={() => updateRoleToUser(user._id)}>
                      USER
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => updateRoleToAdmin(user._id)}>
                      ADMIN
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
