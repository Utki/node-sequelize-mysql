const jwt = require("jsonwebtoken");
const multer = require("multer");
const Setup = require("../../secret/secret");
const db = require("../config");
const CommunityInfo = db.community;
const RoleInfo = db.role;
const fs = require("fs");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let token = req.headers.authorization.split(" ")[1];
    let verify = jwt.verify(token, Setup.secret, (err, payload) => {
      CommunityInfo.findOne({ where: { userId: payload.userId } })
        .then(community => {
          let communityPath = community.communityName;
          communityPath = communityPath.split(" ").join("");
          let baseDirectory = "/ezcondo" + "/strataAssets/";
          let directory = baseDirectory + communityPath;
          let dirname = directory + "/websiteImages";

          fs.exists(dirname, exists => {
            if (!exists) {
              fs.mkdir(dirname, err => {
                if (err) throw err;
                console.log(dirname);
              });
            } else {
              console.log(dirname);
            }
          });

          RoleInfo.findOne({ where: { userId: community.userId } })
            .then(role => {
              if (
                role.role === "Admin" ||
                role.role === "Super Admin" ||
                role.role === "Assigned Admin"
              ) {
                let communityPath = community.communityName;
                communityPath = communityPath.split(" ").join("");
                let baseDirectory = "/ezcondo" + "/strataAssets/";
                let directory = baseDirectory + communityPath;
                let dirname = directory + "/websiteImages";

                cb(null, dirname);
              } else {
                console.log("You Don't Have Admin Previllages");
                cb(null, "");
              }
            })
            .catch(err => console.log("Role " + err));
        })
        .catch(err => console.log("Community " + err));
    });
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    //cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  }
});

let upload = multer({ storage: storage });

module.exports = upload;
