const { db, User } = require("./server/db");

const users =  [{
    username: 'fakeUser',
    password: 'fakePassword',
    firstName: "Garrick",
    lastName: "Lim",
    email: "garrick.k.lim@gmail.com"
}]

const seed = async () => {
    try {
      await db.sync({ force: true });
  
      await Promise.all(users.map(user => {
        return User.create(user);
      }))
      // seed your database here!
    } catch (err) {
      console.log((err));
    }
  };

  seed();