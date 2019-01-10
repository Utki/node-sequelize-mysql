module.exports = app => {
  const login = require("../controller/loginController");
  const passport = require("passport");

  //@type     POST
  //@route    /api/auth/login
  //@desc     route for inserting community data
  //@access   Public
  app.post("/api/auth/login", login.loginModule);

  //@type     POST
  //@route    /api/login
  //@desc     route for logging in and generating token as well as refreshtoken
  //@access   Public
  app.post("/api/login", login.loginController);

  //@type     POST
  //@route    /api/auth/login/token
  //@desc     route for getting refreshToken
  //@access   PRIVATE
  app.post("/api/auth/login/token", login.refreshToken);

  //@type     POST
  //@route    /api/auth/login/token/delete
  //@desc     route for deleting the refreshToken
  //@access   PRIVATE
  app.post("/api/auth/login/token/delete", login.deleteToken);

  //@type     GET
  //@route    /api/auth/profile
  //@desc     route for user profile
  //@access   PRIVATE
  app.get(
    "/api/auth/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      //console.log(req.user.userId);
      //console.log(req.user.firstName);
      res.status(200).json({
        //userId: req.user.userId,
        firstName: req.user.firstName,
        lastname: req.user.lastName,
        emailId: req.user.emailId
        //password: req.user.password
      });
    }
  );

  //@type     GET
  //@route    /strataInfo
  //@desc     route for User Community Info
  //@access   PRIVATE
  app.get(
    "/api/strataInfo",
    passport.authenticate("jwt", { session: false }),
    login.strataDetails
  );
};

//  passport.authenticate("jwt", { session: false }),
