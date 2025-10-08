// index.js
const express = require('express');
const connectDB = require('./db'); 
const Employee = require('./Employee');

// Connect to Database
connectDB();

const app = express();
app.use(express.json()); // Middleware to parse JSON

const PORT = process.env.PORT || 3000;

// --- API Endpoints ---

// POST /employees - Creates a new employee
app.post('/employees', async (req, res) => {
  try {
    const { name, position, monthlySalary } = req.body;

    // Simple validation
    if (!name || !position || !monthlySalary) {
      return res.status(400).json({ msg: 'Please provide name, position, and monthlySalary' });
    }

    const newEmployee = new Employee({ name, position, monthlySalary });
    const employee = await newEmployee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET /employees/:id - Gets a single employee
app.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));