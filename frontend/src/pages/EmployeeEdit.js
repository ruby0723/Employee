import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
import './EmployeeEdit.css';

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null
  });

  useEffect(() => {
    
    axios
      .get(`http://localhost:5000/api/employees/${id}`)
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setEmployeeData((prevData) => {
        const course = [...prevData.course];
        if (checked) {
          course.push(value);
        } else {
          const index = course.indexOf(value);
          if (index > -1) {
            course.splice(index, 1);
          }
        }
        return { ...prevData, course };
      });
    } else {
      setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setEmployeeData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(employeeData).forEach((key) => {
      if (key === 'course') {
        employeeData.course.forEach(course => formData.append('course[]', course));
      } else {
        formData.append(key, employeeData[key]);
      }
    });
  
    try {
      await axios.post('http://localhost:5000/employees/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/employees');
    } catch (error) {
      console.error(error.response?.data?.message || 'Error creating employee');
    }
  };
  

  return (
    <div className="edit-employee-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile No</label>
          <input
            type="text"
            name="mobile"
            value={employeeData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Designation</label>
          <select
            name="designation"
            value={employeeData.designation}
            onChange={handleChange}
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={employeeData.gender === 'Male'}
              onChange={handleChange}
            />
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={employeeData.gender === 'Female'}
              onChange={handleChange}
            />
            Female
          </div>
        </div>

        <div className="form-group">
          <label>Course</label>
          <div>
            <input
              type="checkbox"
              name="course"
              value="MCA"
              checked={employeeData.course.includes('MCA')}
              onChange={handleChange}
            />
            MCA
            <input
              type="checkbox"
              name="course"
              value="BCA"
              checked={employeeData.course.includes('BCA')}
              onChange={handleChange}
            />
            BCA
            <input
              type="checkbox"
              name="course"
              value="BSC"
              checked={employeeData.course.includes('BSC')}
              onChange={handleChange}
            />
            BSC
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

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
