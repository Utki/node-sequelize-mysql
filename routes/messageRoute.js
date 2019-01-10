module.exports = app => {
  let msgController = require("../controller/messageController");
  const passport = require("passport");

  //@type     POST
  //@route    /api/message
  //@desc     route for inserting message data
  //@access   PRIVATE
  app.post("/api/message", msgController.create);

  //@type     GET
  //@route    /api/message
  //@desc     route for retreiving message data
  //@access   PRIVATE
  app.get("/api/message", msgController.findMessage);
};
