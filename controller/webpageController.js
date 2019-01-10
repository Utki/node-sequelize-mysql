const fs = require("fs");
const jwt = require("jsonwebtoken");
const Setup = require("../secret/secret");
const db = require("../config/config");
const CommunityInfo = db.community;
const RoleInfo = db.role;
const WebInfo = db.webpage;

//Controller for uploading the data to their corresponding data
exports.uploadData = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let verify = jwt.verify(token, Setup.secret, (err, payload) => {
    CommunityInfo.findOne({ where: { userId: payload.userId } })
      .then(community => {
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
              let dirname = baseDirectory + communityPath;
              //console.log(dirname);
              //console.log("@@@@@@", role.strataId);
              WebInfo.create({
                strataId: role.strataId,
                websiteName: req.body.websiteName,
                welcomeMessage: req.body.welcomeMessage,
                data: req.file.originalname,
                path: fs.readFileSync(
                  dirname + "/websiteImages/" + req.file.filename
                )
              })
                .then(web => {
                  res.status(200).json({
                    msg: "File Uploaded Successfully!",
                    file: req.file
                  });
                })
                .catch(err => res.status(400).send("WebInfo " + err));
            } else {
              res.status(400).send("You don't have Admin Previliages");
            }
          })
          .catch(err => res.status(404).send("Role " + err));
      })
      .catch(err => res.status(404).send("Community " + err));
  });
};

//Controller for updating the webpage Uploads
exports.updateWeb = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let verify = jwt.verify(token, Setup.secret, (err, payload) => {
    CommunityInfo.findOne({ where: { userId: payload.userId } })
      .then(community => {
        RoleInfo.findOne({ where: { userId: community.userId } })
          .then(role => {
            if (
              role.role === "Admin" ||
              role.role === "Super Admin" ||
              role.role === "Assigned Admin"
            ) {
              WebInfo.findOne({ where: { strataId: role.strataId } })
                .then(web => {
                  let webId = web.webId;
                  let data = web.data;

                  //Path for existing Data

                  let communityPath = community.communityName;
                  communityPath = communityPath.split(" ").join("");
                  let baseDirectory = "/ezcondo" + "/strataAssets/";
                  let dirname = baseDirectory + communityPath;

                  //unlink old file
                  fs.unlink(dirname + "/websiteImages/" + data, function(err) {
                    if (err) return console.log(err);
                    console.log("file deleted successfully");
                  });

                  WebInfo.findByPk(webId)
                    .then(webPk => {
                      //upload path
                      let communityPath = community.communityName;
                      communityPath = communityPath.split(" ").join("");
                      let baseDirectory = "/ezcondo" + "/strataAssets/";
                      let dirname = baseDirectory + communityPath;

                      //Update WebInfo Here
                      WebInfo.update(
                        {
                          strataId: webPk.strataId,
                          websiteName: req.body.websiteName,
                          welcomeMessage: req.body.welcomeMessage,
                          data: req.file.originalname,
                          path: fs.readFileSync(
                            dirname + "/websiteImages/" + req.file.filename
                          )
                        },
                        {
                          where: { webId: webPk.webId }
                        }
                      )
                        .then(webUpdate => {
                          res.status(200).json({
                            msg: "File Uploaded Successfully!",
                            file: req.file
                          });
                        })
                        .catch(err =>
                          res.status(400).send("Web Info Update " + err)
                        );
                    })
                    .catch(err => res.status(404).send("Web findByPk " + err));
                })
                .catch(err => res.status(404).send("Web findOne " + err));
            } else {
              res.status(400).send("You don't have Admin Previliages");
            }
          })
          .catch(err => res.status(404).send("Role " + err));
      })
      .catch(err => res.status(404).send("Community " + err));
  });
};

//Controller for retreiving webpage uploads
exports.retrieve = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let verify = jwt.verify(token, Setup.secret, (err, payload) => {});
};
