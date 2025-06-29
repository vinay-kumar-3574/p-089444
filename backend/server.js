const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// require('dotenv').config(); // Not needed since we are not using .env

const app = express();
app.use(cors());
app.use(express.json());

// Use the MongoDB URI directly as a string
mongoose.connect('mongodb+srv://vinaykumar357407:vinay251204@campusconnect-cluster.se4ygye.mongodb.net/?retryWrites=true&w=majority&appName=campusconnect-cluster', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Event schema
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  location: String,
  maxSeats: Number,
  tags: [String],
  image: String,
  status: { type: String, default: 'upcoming' },
  registeredSeats: { type: Number, default: 0 }
});
const Event = mongoose.model('Event', eventSchema);

// Get all events
app.get('/api/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Add new event
app.post('/api/events', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).json(event);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));