    module.exports = app => {
  const community = require("../controller/communityInfoController");

  //@type     POST
  //@route    /api/community
  //@desc     route for inserting community data
  //@access   Public
  app.post("/api/community", community.create);

  //@type     GET
  //@route    /api/community
  //@desc     route for retrieving communityInfo
  //@access   Public
  app.get("/api/community", community.findAll);

  //@type     GET
  //@route    /api/community/:strataId
  //@desc     route for retreiving communityInfo by Id
  //@access   Public
  app.get("/api/community/:strataId", community.findByPk);

  //@type     PUT
  //@route    /api/community/:strataId
  //@desc     route for updating the communityInfo
  //@access   Public
  app.put("/api/community/:strataId", community.update);

  //@type     DELETE
  //@route    /api/community/:strataId
  //@desc     route for deleting the community by id
  //@access   Public
  app.delete("/api/community/:strataId", community.delete);
};
