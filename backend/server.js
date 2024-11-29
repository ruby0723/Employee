const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const User = require('./models/User'); 
const bcrypt = require('bcryptjs'); 

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Function to create default user if it doesn't exist
async function createDefaultUser() {
  try {
    const existingUser = await User.findOne({ username: 'ruby' });
    if (!existingUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('000000', salt); // Hash password '000000'
      const newUser = new User({ username: 'ruby', password: hashedPassword });
      await newUser.save();
      console.log('Default user created');
    } else {
      console.log('Default user already exists');
    }
  } catch (error) {
    console.error('Error creating default user:', error.message);
  }
}

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/employeelist', {
 
})
.then(() => {
  console.log('MongoDB connected!');
  createDefaultUser(); 
})
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


