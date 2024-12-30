const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const eventAddController = require("../controller/event/eventAdd");
const eventsController = require("../controller/event/events");
const eventBookController = require("../controller/event/eventBook");
const authToken = require("../middleware/authToken");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", userDetailsController);
router.post("/addevent", authToken, eventAddController);
router.get("/events/:id?", eventsController);
router.post("/bookevent", eventBookController);

module.exports = router;
