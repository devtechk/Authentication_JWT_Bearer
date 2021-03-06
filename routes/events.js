const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const isAuth = require("../middleware/is-auth")

// Get events
router.get("/", isAuth, async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events })
  } catch (error) {
    res.status(500).json({error: "Server error"}); 
    
  }
});
// Create an event
router.post("/", isAuth, async (req, res) => {

  const { title, description, date } = req.body;

  try {
    const event = new Event({ title, description, date })
    const newEvent = await event.save();
    res.status(201).json({event: newEvent})
  } catch (error) {
      res.status(500).json({error: "Server error"});
  }

});

// Update an event
router.put("/:id", isAuth, async (req, res) => {
  const eventID = req.params.id;
  const { title, description, date } = req.body;
  const updatedEvent = {};

if ( title ) updatedEvent.title = title;
if ( description ) updatedEvent.description = description;
if ( date ) updatedEvent.date = date;

const event = await Event.findByIdAndUpdate(eventID, {$set: updatedEvent}, {new: true});
res.status(201).json({ event });
  try {
    
  } catch (error) {
    
  }
});

// Delete an event
router.delete("/:id", isAuth, async (req, res) => {
  try {
    await Event.findByIdAndRemove(eventID);
    res.status(200).json({error: "Msg removed"});

  } catch (error) {
    res.status(500).json({error: "Server Error"});
    
  }
});

module.exports = router;
