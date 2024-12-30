const eventModel = require("../../models/eventModel");

async function eventAddController(req, res) {
  try {
    console.log("body", req.body);
    const {
      title,
      description,
      date,
      time,
      location,
      category,
      image,
      price,
      slots,
      attendees,
    } = req.body;
    console.log(req.body);

    if (!title) {
      return res.json({ msg: "Please provide title", error: true });
    }
    if (!date) {
      return res.json({ msg: "Please provide date", error: true });
    }
    if (!time) {
      return res.json({ msg: "Please provide date", error: true });
    }
    if (!location) {
      return res.json({ msg: "Please provide location", error: true });
    }
    if (!category) {
      return res.json({ msg: "Please provide category", error: true });
    }
    if (!image) {
      return res.json({ msg: "Please provide image", error: true });
    }
    if (!price) {
      return res.json({ msg: "Please provide price", error: true });
    }
    if (!slots) {
      return res.json({ msg: "Please provide slots", error: true });
    }

    if (price.length <= 0) {
      return res.json({
        msg: "Price must be valid number greater than zero",
        error: true,
      });
    }

    if (slots.length <= 0) {
      return res.json({
        msg: "Slots must be greater than zero",
        error: true,
      });
    }

    await eventModel.create({
      title,
      description,
      date,
      time,
      location,
      category,
      image,
      price,
      slots,
      attendees,
    });

    res.json({
      error: false,
      msg: "Event created successfully!",
    });
  } catch (err) {
    res.json({
      msg: err.message || err,
      error: true,
    });
  }
}

module.exports = eventAddController;
