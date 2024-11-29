import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

 
  const defaultEmployees = [
    { _id: '1', name: 'Jonny', email: 'jonny@gmail.com', mobile: '1234567890', designation: 'Developer' },
    { _id: '2', name: 'Sonny', email: 'sonny@gmail.com', mobile: '0987654321', designation: 'Manager' },
    { _id: '3', name: 'Monny', email: 'monny@gmail.com', mobile: '1122334455', designation: 'HR' }
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then((response) => {
        console.log(response.data); 
        setEmployees(response.data);
      })
      .catch((error) => console.error(error.response?.data?.message || 'Error fetching employees'));
  }, []);  

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/employees/delete/${id}`);
      setEmployees((prev) => prev.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error(error.response?.data?.message || 'Error deleting employee');
    }
  };

  
  const employeesToDisplay = employees.length > 0 ? shuffleArray(employees).slice(0, 3) : defaultEmployees;

  return (
    <div>
      <h2>Employee List</h2>
      <Link to="/create-employee">Create Employee</Link>
   
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeesToDisplay.length > 0 ? (
            employeesToDisplay.map(employee => (
              <tr key={employee._id}>
                <td>{employee.name || 'N/A'}</td>
                <td>{employee.email || 'N/A'}</td>
                <td>{employee.mobile || 'N/A'}</td>
                <td>{employee.designation || 'N/A'}</td>
                <td>
                  
                  <Link to={`/edit-employee/${employee._id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(employee._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
