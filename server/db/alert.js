const Sequelize = require('sequelize')
const db = require('./db');

const Alert = db.define("alert", {
    alertText: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });


  module.exports = Alert;