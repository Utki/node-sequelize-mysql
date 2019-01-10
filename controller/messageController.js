const jwt = require("jsonwebtoken");
const Setup = require("../secret/secret");
const db = require("../config/config");
const UserInfo = db.users;
const CommunityInfo = db.community;
const RoleInfo = db.role;
const MessageInfo = db.message;

// exports.create = (req, res) => {
//   let token = req.headers.authorization.split(" ")[1];
//   let verify = jwt.verify(token, Setup.secret, (err, payload) => {
//     if (err) {
//       res.status(404).send("Not Found");
//     } else {
//       UserInfo.findOne({ where: { userId: payload.userId } })
//         .then(user => {
//           if (!user) {
//             res.status(404).send("User Info Not Found");
//           } else {
//             CommunityInfo.findOne({ where: { userId: user.userId } })
//               .then(community => {
//                 //console.log("@@@@@Community@@@@@", community.strataId);
//                 if (!community) {
//                   res.status(404).send("Community Not Found");
//                 } else {
//                   RoleInfo.findOne({ where: { strataId: community.strataId } })
//                     .then(role => {
//                       //console.log("@@@@@Role@@@@@", role);
//                       if (
//                         role.role === "Admin" ||
//                         role.role === "Super Admin" ||
//                         role.role === "Assigned Admin"
//                       ) {
//                         MessageInfo.create({
//                           strataId: role.strataId,
//                           isWeb: req.body.isWeb,
//                           isEmail: req.body.isEmail,
//                           isPhoneMessaging: req.body.isPhoneMessaging,
//                           isTenant: req.body.isTenant,
//                           subject: req.body.subject,
//                           message: req.body.message
//                         })
//                           .then(message => {
//                             res.status(200).send(message);
//                           })
//                           .catch(err =>
//                             res.status(400).send("Could Not Create Message")
//                           );
//                       } else {
//                         res.status(404).send("You Don't Have Admin Privilages");
//                       }
//                     })
//                     .catch(err => res.status(404).send("Role Not found" + err));
//                 }
//               })
//               .catch(err => res.status(404).send("Community Not Found" + err));
//           }
//         })
//         .catch(err => res.status(404).send("User Not Found" + err));
//     }
//   });
// };

exports.findMessage = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let verify = jwt.verify(token, Setup.secret, (err, payload) => {
    if (err) {
      res.status(404).send("Not Found");
    }
    RoleInfo.findOne({ where: { userId: payload.userId } })
      .then(role => {
        if (
          role.role === "Admin" ||
          role.role === "Super Admin" ||
          role.role === "Assigned Admin"
        ) {
          MessageInfo.findAll()
            .then(message => {
              res.status(200).send(message);
            })
            .catch(err => res.status(404).send("Could Not Retrieve Messages"));
        } else if (role.role === "Tenant") {
          MessageInfo.findAll({ where: { isTenant: 1 } })
            .then(message => {
              if (message) {
                res.status(200).send(message);
              } else {
                res.status(200).send("No Messages");
              }
            })
            .catch(err => res.status(404).send("Could Not Retrieve Messages"));
        } else {
          res.status(400).send("Bad Request From Role Info");
        }
      })
      .catch(err => res.status(404).send("Role Not Found " + err));
  });
};

exports.create = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let verify = jwt.verify(token, Setup.secret, (err, payload) => {
    if (err) {
      res.status(401).send("Unauthorized");
    }
    RoleInfo.findOne({ where: { userId: payload.userId } })
      .then(role => {
        if (
          role.role === "Admin" ||
          role.role === "Super Admin" ||
          role.role === "Assigned Admin"
        ) {
          MessageInfo.create({
            strataId: role.strataId,
            isWeb: req.body.isWeb,
            isEmail: req.body.isEmail,
            isPhoneMessaging: req.body.isPhoneMessaging,
            isTenant: req.body.isTenant,
            subject: req.body.subject,
            message: req.body.message
          })
            .then(message => {
              res.status(200).send(message);
            })
            .catch(err =>
              res.status(400).send("Could Not Create Message " + err)
            );
        } else {
          res.status(404).send("You Don't Have Admin Privilages");
        }
      })
      .catch(err =>
        res.status(404).send("Role with corresponding UserId Not Found" + err)
      );
  });
};
