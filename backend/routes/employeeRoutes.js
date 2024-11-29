const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Employee = require('../models/Employee');
const router = express.Router();

// Define the upload directory
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'), false);
    }
  },
});

// Single file upload for field named "image"
router.post('/create', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'profilePic', maxCount: 1 },
]), async (req, res) => {
  try {
    console.log(req.files); 
      console.log(req.body);  
    const { name, email, mobile, designation, gender, course, imageUrl } = req.body;

    // Use the file path or the image URL
    const imagePath = req.file ? req.file.path : imageUrl;

    const employee = await Employee.create({
      name,
      email,
      mobile,
      designation,
      gender,
      course: Array.isArray(course) ? course : course.split(','),
      image: imagePath,
    });

    res.status(201).json({ message: 'Employee created successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
  }
});


// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    if (employees.length === 0) {
      return res.status(404).json({ message: 'No employees found' });
    }
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update employee
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course, imageUrl } = req.body;
    const employee = await Employee.findById(req.params.id);

    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobile = mobile || employee.mobile;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.course = Array.isArray(course) ? course : course.split(',');
    employee.image = getImagePath(req.file, imageUrl) || employee.image;

    await employee.save();
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
