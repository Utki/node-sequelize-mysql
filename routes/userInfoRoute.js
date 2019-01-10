module.exports = app => {
  const users = require("../controller/userInfoController");

  //@type     POST
  //@route    /api/users
  //@desc     route for inserting user's data
  //@access   Public
  app.post("/api/users", users.create);

  //@type     GET
  //@route    /api/users
  //@desc     route for users for retrieving data
  //@access   Public
  app.get("/api/users", users.findAll);

  //@type     GET
  //@route    /api/users/:userId
  //@desc     route for users page to find by id
  //@access   Public
  app.get("/api/users/:userId", users.findByPk);

  //@type     PUT
  //@route    /api/users/:userId
  //@desc     route for updating the userInfo
  //@access   Public
  app.put("/api/users/:userId", users.update);

  //@type     DELETE
  //@route    /api/users/:id
  //@desc     route for deleting the user by id
  //@access   Public
  app.delete("/api/users/:userId", users.delete);

  //@type     POST
  //@route    /api/register
  //@desc     route for inserting user's, communitie's, role's data
  //@access   Public
  app.post("/api/register", users.register);
};
