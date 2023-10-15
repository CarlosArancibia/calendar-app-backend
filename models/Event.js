const { Schema, model } = require('mongoose');

const EventSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

EventSchema.method('toJSON', function () {
  const { __v, _id, ...obj } = this.toObject();
  obj.id = _id;
  return obj;
});

module.exports = model('Event', EventSchema);
