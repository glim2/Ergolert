const db = require('./db');
const User = require('./user');
const Session = require('./session');
const Alert = require('./alert')

User.hasMany(Session);
Session.belongsTo(User);

// Session.hasMany(Alert);
// Alert.hasMany(Session)

module.exports = {db, User, Session, Alert}