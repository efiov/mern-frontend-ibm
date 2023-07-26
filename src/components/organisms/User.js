"use client";

import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function User() {
  const [users, setUsers] = useState([]);

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
  };

  const updateRoleToUser = (id) => {
    axios.post("http://localhost:3001/updateRoleToUser", {
      id: id,
    });
  };

  return (
    <TableContainer component={Paper}>
      <Button onClick={() => window.location.reload(false)}>Click to reload!</Button>
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
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {user.role === "ADMIN" ? (
                  <Button
                    variant="outlined"
                    onClick={() => updateRoleToUser(user._id)}
                  >
                    USER
                  </Button>
                ) : (
                  <Button
                    variant="outlined" color="error"
                    onClick={() => updateRoleToAdmin(user._id)}
                  >
                    ADMIN
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
