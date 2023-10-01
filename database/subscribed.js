const Sequelize = require("sequelize");
const connection = require("./connect");

const Subscribed = connection.define("Subscribed", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Subscribed.sync({force: false}).then(() => {
    console.log("Tabela Criada");
});

module.exports = Subscribed;