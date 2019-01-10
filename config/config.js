//Dependency of Seuelize
const Sequelize = require("sequelize");
const winston = require("winston");
const connection = new Sequelize("ezcondotool", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: winston.debug,
  useUtc: false
});

//Container for db
const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

//Model/Table/UserInfo
db.users = require("../model/userInfoModel")(connection, Sequelize);

//Model/Table/CommunityInfo
db.community = require("../model/communityInfoModel")(connection, Sequelize);

//Model/Table/RoleInfo
db.role = require("../model/roleInfoModel")(connection, Sequelize);

//Model/Table/Message
db.message = require("../model/messageModel")(connection, Sequelize);

//Model/Table/Webpage
db.webpage = require("../model/webpageModel")(connection, Sequelize);

//Export the module db
module.exports = db;
