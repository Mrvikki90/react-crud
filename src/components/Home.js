import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Popup from "./Popup";

const Home = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    console.log(isEdit);
  }, [isEdit]);

  const getData = () => {
    const data = localStorage.getItem("users");
    if (data) {
      return JSON.parse(data);
    }
    return [];
  };

  const [userData, setUserData] = useState(getData());

  // useEffect(() => {
  //   setUserData(JSON.parse(localStorage.getItem("users")));
  // }, [userData]);

  const deleteData = (itemId) => {
    const fiterUsers = userData.filter((item) => {
      return item.id !== itemId;
    });
    setUserData(fiterUsers);
  };

  const editUser = (user, userId) => {
    setShow(true);
    setIsEdit(true);
    setId(userId);
    setName(user.name);
    setAge(user.age);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const hello = userData.map((value) => {
      if (value.id === id) {
        return {
          ...value,
          name: name,
          age: age,
        };
      }
      return value;
    });

    setUserData(hello);
    localStorage.setItem("users", JSON.stringify(hello));

    // let item = userData.find((item) => item.id == id);
    // item.name = name;
    // item.age = age;
    // // let data = JSON.stringify(item);
    // userData[id] = item;

    // console.log(JSON.stringify(userData));

    // localStorage.setItem("users", JSON.stringify(userData));
    setId("");
    setName("");
    setAge("");
    setShow(false);
  };

  return (
    <Flex justifyContent="center" m="96">
      <Table striped bordered hover size="sm" width="sm">
        <thead>
          <Button variant="primary" size="sm" onClick={handleShow}>
            Add
          </Button>
          <tr>
            <th>Id</th>
            <th> Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData &&
            userData.map((item, index) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>
                  <Flex gridGap="12">
                    <Button
                      variant="success"
                      onClick={() => editUser(item, item.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteData(item.id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Popup
        setShow={setShow}
        show={show}
        userData={userData}
        setUserData={setUserData}
        id={id}
        setId={setId}
        name={name}
        setName={setName}
        age={age}
        setAge={setAge}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        handleEditFormSubmit={handleEditFormSubmit}
      />
    </Flex>
  );
};

export default Home;
