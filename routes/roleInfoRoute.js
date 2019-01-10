module.exports = app => {
  const role = require("../controller/roleInfoController");

  //@type     POST
  //@route    /api/role
  //@desc     route for inserting role data
  //@access   Public
  app.post("/api/role", role.create);

  //@type     GET
  //@route    /api/role
  //@desc     route for retrieving roleInfo
  //@access   Public
  app.get("/api/role", role.findAll);

  //@type     GET
  //@route    /api/role/:roleId
  //@desc     route for retrieving roleInfo by roleId
  //@access   Public
  app.get("/api/role/:roleId", role.findByPk);

  //@type     PUT
  //@route    /api/role/:roleId
  //@desc     route for updating the roleInfo
  //@access   Public
  app.put("/api/role/:roleId", role.update);

  //@type     DELETE
  // @route    /api/role/:roleId
  // @desc     route for deleting the RoleInfo by id
  // @access   Public
  app.delete("/api/role/:roleId", role.delete);
};
