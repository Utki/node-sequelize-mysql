const db = require("../config/config");
const UserInfo = db.users;
const RoleInfo = db.role;
const CommunityInfo = db.community;
const jwt = require("jsonwebtoken");
const Setup = require("../secret/secret");

exports.addUser = (req, res) => {
  let emailId = req.body.emailId;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;

  let userRole = req.body.userRole;
  if (userRole === "") {
    userRole = "Other";
  } else {
    userRole = userRole;
  }

  let mobileNumber = req.body.mobileNumber;

  let randomstring = Math.random()
    .toString(36)
    .slice(-8);
  let password = randomstring;

  let token = req.headers.authorization.split(" ")[1];
  let verify = jwt.verify(token, Setup.secret, (err, payload) => {
    RoleInfo.findOne({ where: { userId: payload.userId } })
      .then(role => {
        if (
          role.role === "Admin" ||
          role.role === "Super Admin" ||
          role.role === "Assigned Admin"
        ) {
          UserInfo.findOne()
            .then(users => {
              if (emailId === users.emailId) {
                UserInfo.update(
                  {
                    firstName: firstName,
                    lastName: lastName,
                    userRole: userRole,
                    mobileNumber: mobileNumber,
                    emailId: emailId,
                    password: password
                  },
                  { where: { emailId: emailId } }
                )
                  .then(user => res.status(200).send(user))
                  .catch(err =>
                    res
                      .status(400)
                      .send("Could Not Update the User Info " + err)
                  );
              } else {
                UserInfo.create({
                  firstName: firstName,
                  lastName: lastName,
                  userRole: userRole,
                  mobileNumber: mobileNumber,
                  emailId: emailId,
                  password: password
                })
                  .then(user => {
                    // res.status(200).json({
                    //   message: "Created Successfully",
                    //   emailId: emailId,
                    //   password: password
                    // });

                    if (!user) {
                      res.status(400).send("User Created Does Not Exists");
                    } else {
                      CommunityInfo.findOne({
                        where: { userId: payload.userId }
                      })
                        .then(communityFindOne => {
                          CommunityInfo.create({
                            userId: user.userId,
                            // strataId: role.strataId,
                            streetName: communityFindOne.streetName,
                            city: communityFindOne.city,
                            state: communityFindOne.state,
                            country: communityFindOne.country
                          })
                            .then(community => {
                              if (!community) {
                                res
                                  .status(400)
                                  .send("Community Info error " + err);
                              } else {
                                RoleInfo.create({
                                  userId: user.userId,
                                  strataId: community.strataId,
                                  designation: user.userRole,
                                  emailId: user.emailId,
                                  role: req.body.role
                                })
                                  .then(role => {
                                    if (!role) {
                                      res.status(400).send("Role Error " + err);
                                    } else {
                                      res.status(200).json({
                                        message: "Created Successfully",
                                        emailId: emailId,
                                        password: password,
                                        role: role.roleInfo,
                                        designation: role.designation
                                      });
                                    }
                                  })
                                  .catch(err =>
                                    res
                                      .status(400)
                                      .send("Could not create Role " + err)
                                  );
                              }
                            })
                            .catch(err =>
                              res
                                .status(400)
                                .send("Could Not Create Community " + err)
                            );
                        })
                        .catch(err =>
                          res.status(404).send("Community Not found")
                        );
                    }
                  })
                  .catch(err => res.status(400).send("Cannot Create User"));
              }
            })
            .catch(err => res.status(400).send("Bad Request UserInfo " + err));
        } else {
          res.status(400).send("You Don't Have Admin Privilages");
        }
      })
      .catch(err =>
        res.status(404).send("User with corresponding role not found " + err)
      );
  });
};
