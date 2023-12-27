// DeleteStudent.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteStudent = ({ show, handleClose, handleDelete, studentID }) => {
  const confirmDelete = () => {
    handleDelete(studentID);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this student?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={confirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteStudent;