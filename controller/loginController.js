const bcrypt = require("bcryptjs");
const db = require("../config/config");
const UserInfo = db.users;
const CommunityInfo = db.community;
const jwt = require("jsonwebtoken");
const Setup = require("../secret/secret");
const passport = require("passport");
const randtoken = require("rand-token");
const refreshTokens = {};

//@type     POST
//@route    /api/auth/login
//@desc     route for inserting community data
//@access   Public
exports.loginModule = (req, res) => {
  let emailId = req.body.emailId;
  let password = req.body.password;
  if (emailId === "admin@ezcondotools.com" && password === "admin@123") {
    CommunityInfo.findAll()
      .then(community => {
        //Display All Community To Super Admin
        res.send(community);
      })
      .catch(err => res.status(400).send(err));
  } else {
    UserInfo.findOne({ where: { emailId: emailId } })
      .then(user => {
        if (!user) {
          return res.status(404).send("Email Error => Not Found");
        }
        bcrypt
          .compare(password, user.password)
          .then(isCorrect => {
            if (isCorrect) {
              //res.status(200).send(user.firstName + " " + user.lastName);

              //Use payload and create token for user
              const payload = {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                mobileNumber: user.mobileNumber,
                emailId: user.emailId
              };

              let token = jwt.sign(payload, Setup.secret, { expiresIn: 60 });
              let refreshToken = randtoken.uid(256);
              refreshTokens[refreshToken] = user.userId;

              res.json({
                success: true,
                token: "Bearer " + token,
                refreshToken: refreshToken,
                payload: payload
              });
            } else {
              res.status(400).send("Password Not Correct");
            }
          })
          .catch(err =>
            res.status(400).send("Error from bcrypt compareSync " + err)
          );
      })
      .catch(err => res.status(400).send("Error from Userinfo findOne " + err));
  }
};

//@type     POST
//@route    /api/auth/login/token
//@desc     route for getting refreshToken
//@access   PRIVATE
exports.refreshToken = (req, res) => {
  let userId = req.body.userId;
  let refreshToken = req.body.refreshToken;

  if (refreshToken in refreshTokens && refreshTokens[refreshToken] == userId) {
    let payload = {
      userId: userId,
      role: "admin"
    };

    let token = jwt.sign(payload, Setup.secret, { expiresIn: 3600 });
    res.status(200).json({
      token: "Bearer " + token,
      message: "Pass as Authorization in Header"
    });

    // let verify = jwt.verify(token, Setup.secret, (err, payload) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log(payload);
    // });
  } else {
    res.status(401).send("Unauthorized");
  }
};

//@type     POST
//@route    /api/auth/login/token/delete
//@desc     route for deleting the refreshToken
//@access   PRIVATE
exports.deleteToken = (req, res) => {
  let refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken];
  }
  res.status(204).send("no content");
};

exports.strataDetails = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  //console.log("@@@@@@@@@@@@@@@@@" + token);
  let verify = jwt.verify(token, Setup.secret, (err, payload) => {
    if (err) {
      console.log(err);
      res.send("Not Found");
    } else {
      console.log(payload.userId);
      UserInfo.findOne({ where: { userId: payload.userId } })
        .then(user => {
          //console.log(user);
          if (user) {
            CommunityInfo.findAll({
              where: { userId: user.userId }
            })
              .then(community => {
                //console.log(community);
                if (community) {
                  res.status(200).send(community);
                } else {
                  res.status(404).send("Community not Found");
                }
              })
              .catch(err =>
                res.status(404).send("Community FindOne err" + err)
              );
          } else {
            res.status(400).send("Error From Community Info FindOne" + err);
          }
        })
        .catch(err => res.status(400).send("Err From User Info FindOne" + err));
    }
  });
};

// ***** ***** ****** ******* Merged Token Login Controller ****** ******* ******* ******

//@type     POST
//@route    /api/login
//@desc     route for inserting community data
//@access   Public

exports.loginController = (req, res) => {
  let emailId = req.body.emailId;
  let password = req.body.password;
  if (emailId === "admin@ezcondotools.com" && password === "admin@123") {
    CommunityInfo.findAll()
      .then(community => {
        //Display All Community To Super Admin
        res.send(community);
      })
      .catch(err => res.status(400).send(err));
  } else {
    UserInfo.findOne({ where: { emailId: emailId } })
      .then(user => {
        if (!user) {
          return res.status(404).send("Email Error => Not Found");
        }
        bcrypt
          .compare(password, user.password)
          .then(isCorrect => {
            if (isCorrect) {
              //res.status(200).send(user.firstName + " " + user.lastName);

              //Use payload and create token for user
              const payload = {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                mobileNumber: user.mobileNumber,
                emailId: user.emailId
              };

              let token = jwt.sign(payload, Setup.secret, { expiresIn: 60 });
              let refreshToken = randtoken.uid(256);
              refreshTokens[refreshToken] = user.userId;

              // res.json({
              //   success: true,
              //   token: "Bearer " + token,
              //   refreshToken: refreshToken,
              //   payload: payload
              // });

              //let userId = req.body.userId;
              //let refreshToken = req.body.refreshToken;

              if (
                refreshToken in refreshTokens &&
                refreshTokens[refreshToken] == user.userId
              ) {
                let payload = {
                  userId: user.userId,
                  role: "admin"
                };

                let token = jwt.sign(payload, Setup.secret, {
                  expiresIn: 3600
                });
                res.status(200).json({
                  token: "Bearer " + token,
                  message: "Pass as Authorization in Header"
                });
              } else {
                res.status(401).send("Unauthorized");
              }
            } else {
              res.status(400).send("Password Not Correct");
            }
          })
          .catch(err =>
            res.status(400).send("Error from bcrypt compareSync " + err)
          );
      })
      .catch(err => res.status(400).send("Error from Userinfo findOne " + err));
  }
};
