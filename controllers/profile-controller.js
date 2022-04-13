const User = require("../models/user");
const createPath = require('../helpers/create-path');
const states = require("../public/data/states");

const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('error'), { title: 'Error' })
};

const getProfile = (req, res) => {
    const title = 'Профиль';
    res.render(createPath('profile'), { states, title });
}

const postProfile = async (req, res) => {
    const { firstName, middleName, lastName, email, address, city, phoneNumber, group, course } =
    req.body;
  const user = await User.findOne({ email });
  user.firstName = firstName;
  user.middleName = middleName;
  user.lastName = lastName;
  user.city = city;
  user.address = address;
  user.phoneNumber = phoneNumber;
  user.group = group;
  user.course = course;
  await user.save();
  res.render(createPath('profile'), { user, states });
}

/* app.get("/profile", requireAuth, (req, res) => {
    res.render("./partials/profile", { states });
  });

  app.post("/profile", requireAuth, async (req, res) => {
    const { firstName, lastName, email, address, city, state, phoneNumber } =
      req.body;
    const user = await User.findOne({ email });
    user.firstName = firstName;
    user.lastName = lastName;
    user.city = city;
    user.address = address;
    user.state = state;
    user.phoneNumber = phoneNumber;
    await user.save();
    res.render("./partials/profile", { user, states });
  }); */

  module.exports = {
    getProfile,
    postProfile
}