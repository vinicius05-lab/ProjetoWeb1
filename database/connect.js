const Sequelize = require("sequelize");

const connection = new Sequelize("railway", "root", "GNDFi7QvoojXWW9NV6ly", {
    host: "containers-us-west-150.railway.app",
    dialect: "mysql",
    port: "6938"
});

module.exports = connection