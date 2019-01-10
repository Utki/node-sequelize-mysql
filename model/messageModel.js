const uuid = require("uuid/v4");
module.exports = (connection, Sequelize) => {
  const messageInfo = connection.define("messages", {
    messageId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: uuid
    },
    strataId: {
      type: Sequelize.UUID,
      references: {
        model: "communities",
        key: "strataId",
        allowNull: false
      }
    },
    isWeb: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isEmail: {
      type: Sequelize.BOOLEAN
    },
    isPhoneMessaging: {
      type: Sequelize.BOOLEAN
    },
    isTenant: {
      type: Sequelize.BOOLEAN
    },
    subject: {
      type: Sequelize.STRING(1000)
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)
    },
    message: {
      type: Sequelize.STRING(100)
    }
  });
  return messageInfo;
};
