const uuid = require("uuid/v4");

module.exports = (connection, Sequelize) => {
  const webpageInfo = connection.define("webpages", {
    webId: {
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
    websiteName: {
      type: Sequelize.STRING(500)
    },
    welcomeMessage: {
      type: Sequelize.STRING
    },
    data: {
      type: Sequelize.STRING
    },
    path: {
      type: Sequelize.BLOB("long")
    }
  });
  return webpageInfo;
};
