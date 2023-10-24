const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  hoursWorked: {
    type: Number,
    required: true
  },
  ratePerHour: {
    type: Number,
    required: true
  },
  supplier: {
    type: String,
    required: true
  },
  purchaseOrder: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
