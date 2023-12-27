// EditStudent.js
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const EditStudent = ({ show, handleClose, fetchData, student }) => {
  const [editedStudent, setEditedStudent] = useState({
    studentID: student.studentID,
    studentCode: student.studentCode,
    fullName: student.fullName,
    age: student.age,
    address: student.address,
    email: student.email,
  });

  const handleInputChange = (e) => {
    setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5235/api/student/${editedStudent.studentID}`, editedStudent);
      handleClose(); // Close the modal after editing the student
      fetchData(); // Refresh the student list after editing
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEdit}>
          <Form.Group className="mb-3">
            <Form.Label>Student Code:</Form.Label>
            <Form.Control type="text" name="studentCode" value={editedStudent.studentCode} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control type="text" name="fullName" value={editedStudent.fullName} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Age:</Form.Label>
            <Form.Control type="text" name="age" value={editedStudent.age} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" name="address" value={editedStudent.address} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text" name="email" value={editedStudent.email} onChange={handleInputChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStudent;
