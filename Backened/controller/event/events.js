const eventModel = require("../../models/eventModel");

async function eventsController(req, res) {
  try {
    const events = await eventModel.find();

    const { id } = req.params;
    if (id) {
      const event = events.find((p) => p.id === id);

      if (!event) {
        return res
          .status(404)
          .json({ message: "Event not found", error: true });
      }

      return res.json(event);
    }

    res.json(events);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
    });
  }
}

module.exports = eventsController;
