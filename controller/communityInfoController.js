const db = require("../config/config");
const Community = db.community;

//Post the community data to the database
exports.create = (req, res) => {
  Community.create({
    userId: req.body.userId,
    communityName: req.body.communityName,
    streetName: req.body.streetName,
    numberOfUnits: req.body.numberOfUnits,
    city: req.body.city,
    country: req.body.country,
    state: req.body.state
  })
    .then(community => res.status(200).send(community))
    .catch(err => res.status(404).send(err));
};

//Fetch all user's CommunityInfo
exports.findAll = (req, res) => {
  Community.findAll()
    .then(community => {
      //Send all Users to Client
      res.send(community);
    })
    .catch(err => res.status(400).send(err));
};

//Find a user's Community Info by id
exports.findByPk = (req, res) => {
  Community.findByPk(req.params.strataId)
    .then(community => {
      res.send(community);
    })
    .catch(err => res.status(400).send(err));
};

//Update a user Community Info by id
exports.update = (req, res) => {
  let strataId = req.params.strataId;
  Community.findByPk(strataId)
    .then(community => {
      if (community) {
        Community.update(
          {
            userId: req.body.userId,
            communityName: req.body.communityName,
            streetName: req.body.streetName,
            numberOfUnits: req.body.numberOfUnits,
            city: req.body.city,
            country: req.body.country,
            state: req.body.state
          },
          { where: { strataId: strataId } }
        )
          .then(community => {
            res
              .status(200)
              .send("updated successfully community with id =" + strataId);
          })
          .catch(err => res.status(404).send("Update error" + err));
      } else {
        res.status(404).send("Community not found");
      }
    })
    .catch(err => res.status(404).send("Find By Primary Key" + err));
};

//Delete user's Community Data By Id
exports.delete = (req, res) => {
  let strataId = req.params.strataId;
  Community.findByPk(strataId)
    .then(community => {
      if (community) {
        Community.destroy({ where: { strataId: strataId } })
          .then(rowDeleted => {
            if (rowDeleted === 1) {
              res.status(200).send("Deleted Successfully");
            } else {
              res.status(400).send("Could Not Delete the Community Info");
            }
          })
          .catch(err => res.status(400).send(err));
      } else {
        res.status(404).send("Community not found");
      }
    })
    .catch(err => res.status(404).send("Find By Primary Key" + err));
};
