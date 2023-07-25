"use client";

import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Avatar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';


export default function GroupsPage () {
   
  const [people, setPeople] = useState([]);
  const [groups, setGroups] = useState({});
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [isGroupsUpdated, setIsGroupsUpdated] = useState(false);
  const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);
const [openSelectPeopleModal, setOpenSelectPeopleModal] = useState(false);

  const handleOpenCreateGroupModal = () => {
    setOpenCreateGroupModal(true);
  };
  
  const handleCloseCreateGroupModal = () => {
    setOpenCreateGroupModal(false);
  };
  
  const handleOpenSelectPeopleModal = () => {
    setOpenSelectPeopleModal(true);
  };
  
  const handleCloseSelectPeopleModal = () => {
    setOpenSelectPeopleModal(false);
  };

  

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch('http://localhost:3001/getUsers');
        const data = await response.json();
        setPeople(data);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    };

    fetchPeople();
  }, []);

  
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:3001/getGroups');
        const data = await response.json();
        const groupsObject = {};
        
        data.forEach((group) => {
          groupsObject[group.name] = { id: group._id, members: group.members };
        });
        setGroups(groupsObject);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const postGroupsToBackend = async () => {
    const group ={
      name:selectedGroup,
      members: groups[selectedGroup].members
    }
    console.log(groups);
    try {

      const response = await fetch('http://localhost:3001/createGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(group),
      });
      if (response.ok) {
        console.log('Groups updated successfully on the backend!');
      } else {
        console.error('Failed to update groups on the backend:', response.status);
      }
    } catch (error) {
      console.error('Error posting groups to backend:', error);
    }
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handlePersonChange = (e) => {
    const personId = e.target.value;
    const selectedPerson = people.find(obj => obj._id == personId)
    setSelectedPeople((prevSelectedPeople) => {
      if (prevSelectedPeople.includes(selectedPerson)) {
        return prevSelectedPeople.filter((obj) => obj._id !== personId);
      } else {
        return [...prevSelectedPeople, selectedPerson];
      }
    });
  };

    const handleAddToGroup = () => {
    if (selectedGroup && groups[selectedGroup]) {

      const existingMembers = groups[selectedGroup].members;

      const uniqueMembersSet = new Set(existingMembers.map((obj) => obj._id));

      selectedPeople.forEach((person) => uniqueMembersSet.add(person._id));

      const updatedMembers = Array.from(uniqueMembersSet); 
    
      setGroups((prevGroups) => ({
        ...prevGroups,
        [selectedGroup]: {
          ...prevGroups[selectedGroup],
          members: updatedMembers,
        },
      }));
      
    }
  };
  useEffect(() => {
    if (selectedGroup && groups[selectedGroup]&&groups[selectedGroup].members.length > 0) {
      postGroupsToBackend();
    }
  }, [groups, selectedGroup]);
 
  
  
  
  
  
  useEffect(() => {
    

    if (selectedGroup && groups[selectedGroup] && groups[selectedGroup].length > 0) {
      
    }
  }, [groups]);

  const handleDeleteGroup = (group) => {
    setGroups((prevGroups) => {
      const updatedGroups = { ...prevGroups };
      delete updatedGroups[group];
      return updatedGroups;
    });
  };

  const DeleteGroup = async (groupId) => {
    try {
      const response = await fetch('http://localhost:3001/deleteGroup', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: groupId }),
      });

      if (response.status === 200) {
        console.log("Group with id " + groupId + " has been deleted");
      } else if (response.status === 400) {
    
        const errorData = await response.json();
        console.error(errorData);
      } else {
   
      }
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const handleNewGroupNameChange = (e) => {
    setNewGroupName(e.target.value);
  };
  const handleCreateGroup = () => {

    const newGroup = {
      id: "new_group_id", 
      members: [],
    };
  
    setGroups((prevGroups) => ({
      ...prevGroups,
      [newGroupName]: newGroup,
    }));
  
    setNewGroupName('');
  };
  return (
    <div>
        <Button variant="contained" color="primary" type="button" onClick={handleOpenCreateGroupModal} style={{ textTransform: 'none',marginRight:'20px',marginTop:'20px' }}>
  Create Group
</Button>

<Button variant="contained" color="primary" type="button" onClick={handleOpenSelectPeopleModal} style={{ textTransform: 'none',marginTop:'20px' }}>
  Add to Group
</Button>
    <div style={{ marginTop:'10px',marginBottom:'20px' }}>
   
    <Dialog open={openCreateGroupModal} onClose={handleCloseCreateGroupModal} fullWidth maxWidth="sm">
  <DialogTitle>Create Group</DialogTitle>
  <DialogContent>
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '0 auto' }}>
        <TextField
          type="text"
          value={newGroupName}
          onChange={handleNewGroupNameChange}
          label="Enter a new group name"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button
          style={{ marginLeft: '40px', textTransform: 'none', height: '55px', marginTop: '5px' }}
          variant="contained"
          color="primary"
          onClick={handleCreateGroup}
        >
          Create Group
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

<Dialog open={openSelectPeopleModal} onClose={handleCloseSelectPeopleModal} fullWidth maxWidth="sm">
  <DialogTitle>Select Group and People</DialogTitle>
  <DialogContent>
    <div>
      <label htmlFor="groupSelect">Select a group:</label>
      <Select
        style={{ marginLeft: '15px' }}
        id="groupSelect"
        value={selectedGroup}
        onChange={handleGroupChange}
      >
        <MenuItem value="">-- Select a group --</MenuItem>
        {Object.keys(groups).map((group, index) => (
          <MenuItem key={index} value={group}>
            {group}
          </MenuItem>
        ))}
      </Select>
    </div>

    <div>
      <p>Select people:</p>
      {people.map((person) => (
        <div key={person._id}>
          <FormControlLabel
            control={
              <Checkbox
                value={person._id}
                checked={selectedPeople.includes(person)}
                onChange={handlePersonChange}
              />
            }
            label={person.name}
          />
        </div>
      ))}
    </div>
    <div style={{ width: '300px', margin: '0 auto' }}>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={handleAddToGroup}
        style={{ textTransform: 'none' }}
      >
        Add to Group
      </Button>
    </div>
  </DialogContent>
</Dialog>


    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
    {Object.entries(groups).length === 0 ? (
          <p>No groups available.</p>
        ) : (
          Object.entries(groups).map(([group, { id, members }], index) => (
            <div
              key={index}
              style={{
                width: '250px',
                flexDirection: 'column',
                boxShadow: '0px 1px 6px 2px lightgray',
                padding: '10px',
                margin: '10px',
                maxHeight: '235px', 
                overflowY: 'auto',
                scrollbarWidth: 'thin', 
                scrollbarColor: '#1976d2 #f5f5f5',
              }}
            >
              <strong>{group}</strong>
              <ul>
                {members.map((memberId, index) => {
                 
                  const person = people.find((person) => person._id === memberId);
                  if (!person) return null; 
                  return (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        wordWrap: 'break-word',
                        textAlign: 'left',
                        marginTop: '5px',
                      }}
                    >
                      <div style={{ flex: '0 0 0px', marginRight: '10px' }}>
                        <Avatar alt={person.name} src={person.avatarUrl} sx={{ width: '40px', height: '40px', marginLeft: '-30px' }}>
                          {!person.avatarUrl && <PersonIcon />}
                        </Avatar>
                      </div>
                      <div style={{ flex: '1' }}>{person.name}</div>
                    </li>
                  );
                })}
              </ul>
              
              <div style={{ alignSelf: 'flex-end' }}>
                  <Button
              variant="contained"
              color="primary"
              type="button"
              style={{ textTransform: 'none' }}
              onClick={() => {
                handleDeleteGroup(group);
                DeleteGroup(id);
                console.log(id);
              }}
              
            >
              Delete Group
            </Button>
        </div>
      </div>
    ))
    )}
</div>

    
    </div>
      </div>
  );
};