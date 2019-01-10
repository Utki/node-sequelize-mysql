const db = require("../config/config");
const RoleInfo = db.role;

//Post the role info into database
exports.create = (req, res) => {
  RoleInfo.create({
    userId: req.body.userId,
    strataId: req.body.strataId,
    designation: req.body.designation,
    emailId: req.body.emailId,
    role: req.body.role
  })
    .then(role => {
      res.status(200).send(role);
    })
    .catch(err => res.status(404).send("Create Error" + err));
};

//Fetch all RoleInfo
exports.findAll = (req, res) => {
  RoleInfo.findAll()
    .then(roleArray => {
      //Send all Users to Client
      res.send(roleArray);
    })
    .catch(err => res.status(400).send(err));
};

//Find Role Info by id
exports.findByPk = (req, res) => {
  RoleInfo.findByPk(req.params.roleId)
    .then(roleObject => {
      res.send(roleObject);
    })
    .catch(err => res.status(400).send(err));
};

// //Update a RoleInfo by id
exports.update = (req, res) => {
  let roleId = req.params.roleId;
  RoleInfo.findByPk(roleId)
    .then(roleObject => {
      if (roleObject) {
        RoleInfo.update(
          {
            userId: req.body.userId,
            strataId: req.body.strataId,
            designation: req.body.designation,
            emailId: req.body.emailId,
            role: req.body.role
          },
          { where: { roleId: roleId } }
        )
          .then(community => {
            res
              .status(200)
              .send("updated successfully community with id =" + roleId);
          })
          .catch(err => res.status(404).send("Update error" + err));
      } else {
        res.status(404).send("Community not found");
      }
    })
    .catch(err => res.status(404).send("Find By Primary Key" + err));
};

//   //Delete RoleInfo By Id
exports.delete = (req, res) => {
  let roleId = req.params.roleId;
  RoleInfo.findByPk(roleId)
    .then(roleObject => {
      if (roleObject) {
        RoleInfo.destroy({ where: { roleId: roleId } })
          .then(rowDeleted => {
            if (rowDeleted === 1) {
              res.status(200).send("Deleted Successfully");
            } else {
              res.status(400).send("Could Not Delete the Role Info");
            }
          })
          .catch(err => res.status(400).send(err));
      } else {
        res.status(404).send("Corresponding Role not found");
      }
    })
    .catch(err => res.status(404).send("Find By Primary Key" + err));
};
