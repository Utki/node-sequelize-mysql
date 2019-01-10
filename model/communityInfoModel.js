const uuid = require("uuid/v4");
const db = require("../config/config");
const UserInfo = db.users;

module.exports = (connection, Sequelize) => {
  const communityInfo = connection.define("community", {
    strataId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: uuid
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: "users",
        key: "userId",
        allowNull: false
        // onDelete: "cascade",
        // hooks: true
      }
    },
    communityName: {
      type: Sequelize.STRING,
      // primaryKey: true
      unique: "uniqueTag"
    },
    streetName: {
      type: Sequelize.STRING,
      unique: "uniqueTag"
      // primaryKey: true
    },
    numberOfUnits: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    expiresIn: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
    }
  });
  return communityInfo;
};
