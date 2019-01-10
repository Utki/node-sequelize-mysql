module.exports = app => {
  let addUserController = require("../controller/addUserController");
  const passport = require("passport");
  //@type     POST
  //@route    /api/addUser
  //@desc     route for adding new user
  //@access   PRIVATE
  app.post(
    "/api/addUser",
    passport.authenticate("jwt", { session: false }),
    addUserController.addUser
  );
};
