const bcrypt = require("bcryptjs");
const uuid = require("uuid/v4");
const db = require("../config/config");
//const CommunityInfo = db.community;

module.exports = (connection, Sequelize) => {
  const UserInfo = connection.define(
    "user",
    {
      userId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userRole: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mobileNumber: {
        type: Sequelize.STRING
        //unique: true
      },
      emailId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        afterValidate: user => {
          user.password = bcrypt.hashSync(user.password);
          // user.password = bcrypt.hashSync(
          //   user.password,
          //   bcrypt.genSaltSync(10),
          //   null
          // );
        }
      }
    }
  );
  return UserInfo;
};
