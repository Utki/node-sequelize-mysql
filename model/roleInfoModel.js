const uuid = require("uuid/v4");
const db = require("../config/config");

module.exports = (connection, Sequelize) => {
  const roleInfo = connection.define("role", {
    roleId: {
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
      }
    },
    strataId: {
      type: Sequelize.UUID,
      references: {
        model: "communities",
        key: "strataId",
        allowNull: false
      }
    },
    designation: {
      type: Sequelize.STRING,
      allowNull: false
    },
    emailId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  return roleInfo;
};
