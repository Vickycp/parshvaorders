const express = require('express');
const mongoose = require('mongoose');
const Event = require('./src/docketSchema'); 
const cors = require('cors');// Assuming the schema is defined in a separate file
const bodyParser = require('body-parser');

// vickynode
// a6mZLvz3j6uLtLq5
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const app = express();
app.use(express.json());

app.use(cors())

// server css as static
app.use(express.static(__dirname+'/public'));

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
  


// Endpoint to save an event
app.post('/events', async (req, res) => {
  try {
    console.log(req.body)
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch all events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    console.log(events);
    res.status(200).send({events});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
