const db = require("../config/config");
const User = db.users;
const CommunityInfo = db.community;
const RoleInfo = db.role;
const fs = require("fs");

//Post a User Info
exports.create = (req, res) => {
  //Save to MySql Database
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userRole: req.body.userRole,
    mobileNumber: req.body.mobileNumber,
    emailId: req.body.emailId,
    password: req.body.password
  })
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => res.status(404).send(err));
};

// //Post a User Info
// exports.create = (req, res) => {
//   //Save to MySql Database
//   User.create({
//     firstName: "Utkarsh",
//     lastName: "Shekhar",
//     userRole: "Buiding Manager",
//     mobileNumber: 9431353148,
//     emailId: "utkarsh.shekhar@sysfore.in",
//     password: "password",
//   }).then(user => {
//     res.send(user);
//   });
// };

//Fetch all users

exports.findAll = (req, res) => {
  User.findAll()
    .then(users => {
      //Send all Users to Client as an Array
      res.send(users);
    })
    .catch(err => res.status(400).send(err));
};

//Find a user by id
exports.findByPk = (req, res) => {
  User.findByPk(req.params.userId)
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.send("Cannot Find the User With the given userId");
      }
    })
    .catch(err => res.status(400).send(err));
};

//Update a user by id
exports.update = (req, res) => {
  let userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      if (user) {
        User.update(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userRole: req.body.userRole,
            mobileNumber: req.body.mobileNumber,
            emailId: req.body.emailId,
            password: req.body.password
          },
          { where: { userId: userId } }
        )
          .then(user => {
            res
              .status(200)
              .send("updated successfully a user with id =" + userId);
          })
          .catch(err => res.status(404).send("Update error" + err));
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch(err => res.status(404).send("Find By Primary Key" + err));
};

//Trial 1
//Delete a user By Id
// exports.delete = (req, res) => {
//   const userId = req.params.userId;
//   User.destroy({
//     where: { userId: userId }
//   })
//     .then(rowDeleted => {
//       if (rowDeleted === 1) {
//         res.status(200).send("Deleted Successfully");
//       } else {
//         res.status(400).send("Could Not Delete the User");
//       }
//     })
//     .catch(err => res.status(400).send(err));
// };

//Delete a user By Id
//Working But not deleting Automatically
exports.delete = (req, res) => {
  let userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      if (user) {
        User.destroy({
          where: { userId: userId }
        })
          .then(rowDeleted => {
            if (rowDeleted === 1) {
              res.status(200).send("Deleted Successfully");
            } else {
              res.status(400).send("Could Not Delete the User");
            }
          })
          .catch(err => res.status(400).send(err));
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch(err => res.status(404).send("Find By Primary Key" + err));
};

//Trial 2
//Delete a user By Id
// exports.delete = (req, res) => {
//   let userId = req.params.userId;
//   User.findAll({
//     include: [
//       {
//         model: Community,
//         required: true,
//         where: { userId: Community.userId }
//       }
//     ]
//   })
//     .then(users => {
//       if (users) {
//         User.destroy({
//           where: { userId: userId }
//         })
//           .then(rowDeleted => {
//             if (rowDeleted === 1) {
//               res.status(200).send("Deleted Successfully");
//             } else {
//               res.status(400).send("Could Not Delete the User");
//             }
//           })
//           .catch(err => res.status(400).send(err));
//       } else {
//         res.status(400).send("Cannot Delete");
//       }
//     })
//     .catch(err => res.status(400).send("find all error" + err));
// };

//Trial 3
// exports.delete = (req, res) => {
//   let userId = req.params.userId;
//   //User.hasMany(Community, { foreignKey: userId });
//   //Community.belongsTo(User, { foreignKey: userId });
//   User.hasMany(Community, {
//     targetKey: "userId",
//     foreignKey: "userId"
//   });
//   User.findAll({
//     include: [
//       {
//         model: Community,
//         required: true,
//         where: { userId: userId }
//       }
//     ]
//   })
//     .then(users => {
//       if (users) {
//         User.destroy({
//           where: { userId: userId }
//         })
//           .then(rowDeleted => {
//             if (rowDeleted == 1) {
//               res.status(200).send("Deleted Successfully");
//             } else {
//               res.status(404).send("User not found");
//             }
//           })
//           .catch();
//       } else {
//         res.status(400).send("Could Not Find The User");
//       }
//     })
//     .catch(err => res.status(404).send("User not found"));
// };

//Trial 4
// exports.delete = (req, res) => {
//   let userId = req.params.userId;
//   User.findByPk(userId)
//     .then(user => {
//       if (user) {
//         //Delete the community with the corresponding userId From Community Table
//         Community.findAll()
//           .then(community => {
//             if (community) {
//               Community.destroy({ where: { userId: user.userId } })
//                 .then(rowDeleted => {
//                   if (rowDeleted === 1) {
//                     //Delete the User from the user table with corresponding UserId
//                     User.destroy({ where: { userId: user.userId } })
//                       .then(rowDeleted => {
//                         if (rowDeleted === 1) {
//                           res
//                             .status(200)
//                             .send("User Data Deleted Successfully");
//                         } else {
//                           res
//                             .status(400)
//                             .send("Could not delete the User Data");
//                         }
//                       })
//                       .catch(err =>
//                         res.status(400).send("User Destroy Error" + err)
//                       );
//                     //res.status(200).send("Community Data Deleted Successfully");
//                   } else {
//                     res.status(400).send("Could not delete Community Data");
//                   }
//                 })
//                 .catch(err => res.status(400).send("Community Destroy " + err));
//             } else {
//             }
//           })
//           .catch(err => res.status(400).send("Community Find All" + err));
//       } else {
//         res.status(404).send("User not found with given userId");
//       }
//     })
//     .catch(err => res.status(400).send("User Find By Primary Key " + err));
// };

// ******* ******* ******* One Shot Data Entry Controller For The Route localhost:3000/api/register ******* ******* ******* //

exports.register = (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userRole: req.body.userRole,
    mobileNumber: req.body.mobileNumber,
    emailId: req.body.emailId,
    password: req.body.password
  })
    .then(user => {
      if (!user) {
        res.status(400).send("Could Not Create The New User");
      } else {
        CommunityInfo.create({
          userId: user.userId,
          communityName: req.body.communityName,
          streetName: req.body.streetName,
          numberOfUnits: req.body.numberOfUnits,
          city: req.body.city,
          country: req.body.country,
          state: req.body.state
        })
          .then(community => {
            if (!community) {
              res.status(400).send("CommunityInfo Error" + err);
            } else
              RoleInfo.create({
                userId: user.userId,
                strataId: community.strataId,
                designation: user.userRole,
                emailId: user.emailId,
                role: req.body.role
              })
                .then(role => {
                  if (!role) {
                    res.status(400).send("RoleInfo Error" + err);
                  }
                  let communityPath = community.communityName;
                  communityPath = communityPath.split(" ").join("");
                  fs.mkdir(
                    "/ezcondo" + "/strataAssets/" + communityPath,
                    err => {
                      if (err) throw err;
                    }
                  );
                  res.status(200).send(role);
                })
                .catch(err => res.status(404).send(err));
          })
          .catch(err => res.status(404).send(err));
      }
    })
    .catch(err => res.status(400).send("UserInfo Error" + err));
};
