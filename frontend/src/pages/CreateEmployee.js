import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateEmployee.css';

const CreateEmployee = () => {
  const navigate = useNavigate(); 
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
    notes: ''
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
    
      setEmployeeData((prevData) => {
        const course = [...prevData.course];
        if (checked) {
          course.push(value);
        } else {
          const index = course.indexOf(value);
          if (index > -1) course.splice(index, 1);
        }
        return { ...prevData, course };
      });
    } else {
     
      setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEmployeeData((prevData) => ({ ...prevData, image: file }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(employeeData).forEach((key) => {
      if (key !== 'course') {
        formData.append(key, employeeData[key]);
      }
    });
    
    employeeData.course.forEach((course) => {
      formData.append('course[]', course);
    });

    if (employeeData.image) {
      formData.append('image', employeeData.image);
    }

    try {
      
      await axios.post('http://localhost:5000/api/employees/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

    
      navigate('/');
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <div className="create-employee-container">
      <h2>Create Employee</h2>
      <form  onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Employee Name"
            value={employeeData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Employee Email"
            value={employeeData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            placeholder="Enter Mobile Number"
            value={employeeData.mobile}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="designation">Designation</label>
          <select
            id="designation"
            name="designation"
            value={employeeData.designation}
            onChange={handleChange}
            required
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="form-group">
  <label>Gender</label>
  <div>
    <label>
      <input
        type="radio"
        id="male"
        name="gender"
        value="male"
        checked={employeeData.gender === 'male'}
        onChange={handleChange}
      />
      Male
    </label>
    <label>
      <input
        type="radio"
        id="female"
        name="gender"
        value="female"
        checked={employeeData.gender === 'female'}
        onChange={handleChange}
      />
      Female
    </label>
    <label>
      <input
        type="radio"
        id="other"
        name="gender"
        value="other"
        checked={employeeData.gender === 'other'}
        onChange={handleChange}
      />
      Other
    </label>
  </div>
</div>

<div className="form-group">
  <label>Course</label>
  <div className="checkbox-group">
    <label>
      <input
        type="checkbox"
        id="mca"
        name="course"
        value="MCA"
        checked={employeeData.course.includes('MCA')}
        onChange={handleChange}
      />
      MCA
    </label>
    <label>
      <input
        type="checkbox"
        id="bsc"
        name="course"
        value="BSC"
        checked={employeeData.course.includes('BSC')}
        onChange={handleChange}
      />
      BSC
    </label>
    <label>
      <input
        type="checkbox"
        id="bca"
        name="course"
        value="BCA"
        checked={employeeData.course.includes('BCA')}
        onChange={handleChange}
      />
      BCA
    </label>
    <label>
      <input
        type="checkbox"
        id="btech"
        name="course"
        value="B.Tech"
        checked={employeeData.course.includes('B.Tech')}
        onChange={handleChange}
      />
      B.Tech
    </label>
  </div>
</div>
<div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows="4"
            placeholder="Enter additional notes"
            value={employeeData.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" >Submit</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
