module.exports = app => {
  const fileworker = require("../controller/webpageController");
  const upload = require("../config/strataAssetsConfig/createWebsiteFileUploadConfig");
  const passport = require("passport");

  //@type     POST
  //@route    /api/upload
  //@desc     route for uploading File (form-data)
  //@access   Public
  app.post(
    "/api/upload",
    passport.authenticate("jwt", { session: false }),
    upload.single("uploadfile"),
    fileworker.uploadData
  );

  //@type     PUT
  //@route    /api/upload
  //@desc     route for uploading File (form-data)
  //@access   Public
  app.put(
    "/api/upload",
    passport.authenticate("jwt", { session: false }),
    upload.single("uploadfile"),
    fileworker.updateWeb
  );
};
