import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { useToast } from "@chakra-ui/react";
import Toast from "react-bootstrap/Toast";

const Popup = ({
  show,
  setShow,
  userData,
  setUserData,
  id,
  name,
  age,
  setId,
  setName,
  setAge,
  isEdit,
  handleEditFormSubmit,
  setIsEdit,
}) => {
  const handleClose = () => {
    console.log("hello");
    setIsEdit(false);
    setShow(false);
    setId("");
    setAge("");
    setName("");
  };
  const [showA, setShowA] = useState(false);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    return () => {
      setId("");
      setAge("");
      setName("");
    };
  }, []);

  const handleFormSubmit = (e) => {
    setShowA(true);
    setIsEdit(false);
    console.log("hello");
    e.preventDefault();
    let user = {
      id: id,
      name: name,
      age: age,
    };

    if (
      userData.find((prevUser) => {
        return prevUser.id === user.id;
      })
    ) {
      // toast({
      //   title: "Account created.",
      //   description: "We've created your account for you.",
      //   status: "success",
      //   duration: 2000,
      //   isClosable: true,
      // });
    } else {
      setUserData([...userData, user]);
      setId("");
      setName("");
      setAge("");
      setShow(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        {isEdit ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Edit Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleEditFormSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    value={age}
                    type="number"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Add Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Id</Form.Label>
                  <Form.Control
                    value={id}
                    type="text"
                    onChange={(e) => setId(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </>
        )}

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Toast show={showA}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
      </Toast>
    </>
  );
};

export default Popup;
