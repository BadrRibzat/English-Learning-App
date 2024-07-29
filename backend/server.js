require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authRoutes = require('./routes/auth');
const lessonRoutes = require('./routes/lessons');

app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
