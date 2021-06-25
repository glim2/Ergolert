const {db, User, Alert} = require("./server/db");

const users = [
  {
    username: "fakeUser",
    password: "fakePassword",
    firstName: "Garrick",
    lastName: "Lim",
    email: "garrick.k.lim@gmail.com",
  },
];

const alerts = [
  {
    alertText: "You may be slouching! Time to sit up straight.",
  },
  {
    alertText: "Is your head tilted to the right? Push it to the ceiling!",
  },
  {
    alertText: "Is your head tilted to the left? Push it to the celing!",
  },
  {
    alertText: "Are you leaning to the right? Straigten your body!",
  },
  {
    alertText: "Are you leaning to the left? Straigten your body!",
  },
];

const seed = async () => {
  try {
    await db.sync({force: true});

    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );

    await Promise.all(
      alerts.map((alert) => {
        return Alert.create(alert);
      })
    )
  } catch (err) {
    console.log(err);
  }
};

seed();
