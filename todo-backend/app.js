const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/todos', require('./routes/todo.routes'));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server on 5000")))
  .catch(err => console.error(err));
