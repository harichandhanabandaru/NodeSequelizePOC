const Sequelize = require("sequelize");

const sequelize = new Sequelize("userpost", "root", "Chandhana@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
