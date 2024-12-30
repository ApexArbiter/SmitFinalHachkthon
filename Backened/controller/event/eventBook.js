const eventModel = require("../../models/eventModel");

async function eventBookController(req, res) {
  try {
    console.log("body", req.body);

    const { eventId, userId } = req.body;

    if (!eventId || !userId) {
      return res.json({ msg: "One or more missing parameters", error: true });
    }

    const event = await eventModel.findById(eventId);

    if (!event) {
      console.log("Document not found");
      return;
    }

    if (event.attendees.includes(userId)) {
      await eventModel.findByIdAndUpdate(eventId, {
        $pull: { attendees: userId },
      });

      res.json({
        error: false,
        msg: "You have unbooked the slot",
      });
    } else {
      await eventModel.findByIdAndUpdate(eventId, {
        $push: { attendees: userId },
      });
      res.json({
        error: false,
        msg: "Slot has been booked successfully",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message || err,
      error: true,
    });
  }
}

module.exports = eventBookController;
