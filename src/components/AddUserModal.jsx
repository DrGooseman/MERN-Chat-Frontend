import React, { useState, useEffect, useContext } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../auth-context";
import AddUserBubble from "./AddUserBubble";

function AddUserModal(props) {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [isValid, setIsValid] = useState(false);

  function addUser(user) {
    if (selectedUsers.includes(user)) return;
    setSelectedUsers(prev => [...prev, user]);
    setSearch("");
  }
  function changeText(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    if (props.show) getUsers();
  }, [props.show]);

  // useEffect(() => {
  //   const user = users.find(
  //     user => user.username === search && user.username !== auth.username
  //   );
  //   setSelectedUser(user);
  // }, [search]);

  useEffect(() => {
    if (selectedUsers.length === 0) setIsValid(false);
    else setIsValid(true);
  }, [selectedUsers]);

  async function getUsers() {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/",
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Authorization: auth.token
        }
      );

      setUsers(responseData.users);
      console.log(responseData.users);
    } catch (err) {}
  }

  async function addNewUser() {
    const chat = {
      chatId: props.currentChat._id,
      users: []
    };
    selectedUsers.forEach(user =>
      chat.users.push({ username: user.username, picture: user.picture })
    );

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/chats/users",
        "PATCH",
        JSON.stringify(chat),
        {
          "Content-Type": "application/json",
          Authorization: auth.token
        }
      );
      setSelectedUsers([]);
      // props.handleCreateChat(responseData.chat);
      props.onHide();
    } catch (err) {}
  }

  function handleSend() {
    addNewUser();
  }

  function handleRemoveUser(username) {
    setSelectedUsers(prev => prev.filter(user => user.username !== username));
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="new-chat-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title
        // id="contained-modal-title-vcenter"
        >
          Add a user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          className="form-control"
          type="text"
          value={search}
          onChange={changeText}
          placeholder="Search"
          aria-label="Search"
        />

        <div className="new-chat-modal-added-users">
          {selectedUsers.map(user => {
            return (
              <AddUserBubble
                key={user.username}
                user={user}
                handleRemoveUser={handleRemoveUser}
              />
            );
          })}
        </div>

        <div className="new-chat-modal-body">
          {error && (
            <Alert variant="danger" onClose={clearError} dismissible>
              <Alert.Heading>An error has occured :(</Alert.Heading>
              <p>{error}</p>
            </Alert>
          )}
          {isLoading && (
            <div className="center-items-flex">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
          {users && (
            <ul>
              {users
                .filter(user =>
                  user.username.toLowerCase().includes(search.toLowerCase())
                )
                .map(
                  user =>
                    user.username !== auth.username && (
                      <li
                        key={user.username}
                        onClick={() => addUser(user)}
                        className={
                          selectedUsers.includes(user)
                            ? "new-chat-modal-item-found"
                            : ""
                        }
                      >
                        <img
                          src={process.env.REACT_APP_ASSET_URL + user.picture}
                          alt={"pic"}
                        />
                        {user.username}
                      </li>
                    )
                )}
            </ul>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSend} disabled={!isValid}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUserModal;
