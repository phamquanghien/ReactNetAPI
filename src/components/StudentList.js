// StudentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Modal } from 'react-bootstrap';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import DeleteStudent from './DeleteStudent';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5235/api/student');
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleShowEditModal = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedStudent(null);
    setShowEditModal(false);
  };

  const handleShowDeleteModal = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedStudent(null);
    setShowDeleteModal(false);
  };

  const handleDelete = async (studentID) => {
    try {
      await axios.delete(`http://localhost:5235/api/student/${studentID}`);
      fetchData(); // Refresh the student list after deleting a student
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-2">
        <Button variant="primary" onClick={handleShowAddModal}>
          Add Student
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Code</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentID}>
              <td>{student.studentCode}</td>
              <td>{student.fullName}</td>
              <td>{student.age}</td>
              <td>{student.address}</td>
              <td>{student.email}</td>
              <td>
                <Button variant="info" onClick={() => handleShowEditModal(student)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleShowDeleteModal(student)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddStudent show={showAddModal} handleClose={handleCloseAddModal} fetchData={fetchData} />
      {selectedStudent && (
        <EditStudent show={showEditModal} handleClose={handleCloseEditModal} fetchData={fetchData} student={selectedStudent} />
      )}
      {selectedStudent && (
        <DeleteStudent
          show={showDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleDelete={handleDelete}
          studentID={selectedStudent.studentID}
        />
      )}
    </div>
  );
};

export default StudentList;
