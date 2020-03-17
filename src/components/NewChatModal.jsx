import React, { useState, useEffect, useContext } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../auth-context";

function NewChatModal(props) {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [selectedUser, setSelectedUser] = useState();
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState();
  const [users, setUsers] = useState([]);
  const [isValid, setIsValid] = useState(false);

  function selectUser(username) {
    setSearch(username);
  }
  function changeText(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    if (props.show) getUsers();
  }, [props.show]);

  useEffect(() => {
    const user = users.find(
      user => user.username === search && user.username !== auth.username
    );
    setSelectedUser(user);
  }, [search]);

  useEffect(() => {
    if (!selectedUser || !message) setIsValid(false);
    else setIsValid(true);
  }, [message, selectedUser]);

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
    } catch (err) {}
  }

  async function createChat() {
    const chat = {
      users: [
        {
          username: auth.username,
          picture: auth.picture
        },
        {
          username: selectedUser.username,
          picture: selectedUser.picture
        }
      ],
      message: { message: message, user: auth.username, date: new Date() }
    };
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/chats",
        "POST",
        JSON.stringify(chat),
        {
          "Content-Type": "application/json",
          Authorization: auth.token
        }
      );

      console.log(responseData.chat);
      props.handleCreateChat(responseData.chat);
      props.onHide();
    } catch (err) {}
  }

  function handleSend() {
    createChat();
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
          Start a new chat
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
                .filter(user => user.username.includes(search))
                .map(
                  user =>
                    user.username !== auth.username && (
                      <li
                        key={user.username}
                        onClick={() => selectUser(user.username)}
                        className={
                          user.username === search
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
        <textarea
          className="form-control"
          value={message}
          onChange={event => setMessage(event.target.value)}
          rows="3"
        ></textarea>
        <Button onClick={handleSend} disabled={!isValid}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewChatModal;
