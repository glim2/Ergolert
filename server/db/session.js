const Sequelize = require('sequelize')
const db = require('./db');

const Session = db.define("session", {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    startTime: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    endTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    alerts: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    poses: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  });


  module.exports = Session;