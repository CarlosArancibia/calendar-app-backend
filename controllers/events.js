const { request } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('user', 'name');

    res.json({
      ok: true,
      events,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Oops, something went wrong, talk to your administrator',
    });
  }
};

const createEvent = async (req, res) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const savedEvent = await event.save();

    res.status(201).json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Oops, something went wrong, talk to your administrator',
    });
  }
};

const updateEvent = async (req = request, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    // validate if exist event
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event does not exist',
      });
    }

    // validate user privilegies
    if (req.uid !== event.user.toString()) {
      return res.status(401).json({
        ok: false,
        msg: 'Insufficient privilegies to edit this event',
      });
    }

    const newEvent = {
      ...req.body,
      user: req.uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, { new: true });

    res.json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Oops, something went wrong, talk to your administrator',
    });
  }
};

const deleteEvent = async (req = request, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event does not exist',
      });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Insufficient privilegies to delete this event',
      });
    }

    await Event.findByIdAndDelete(id);

    res.json({
      ok: true,
      id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Oops, something went wrong, talk to your administrator',
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
