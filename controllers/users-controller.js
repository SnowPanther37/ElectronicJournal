const User = require('../models/user');
const createPath = require('../helpers/create-path');

const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('error'), { title: 'Error' })
};

const getUser = (req, res) => {
    const title = 'Пользовватель';
    User
        .findById(req.params.id)
        .then((user) => res.render(createPath('user'), {user, title}))
        .catch((error) => handleError(res, error));
}


const getUsers = (req, res, next) => {
    const title = 'Пользователи';
    var perPage = 7
    var page = req.params.page || 1
    User
        .find()
        .sort({ firstName: 1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, users) {
            User.count().exec(function(err, count) {
                if (err) return next(err)
                res.render(createPath('users'), {
                    users: users,
                    current: page,
                    pages: Math.ceil(count/perPage)
                })
            })
        })
       /*  .then((users) => res.render(createPath('users'), {
            users: users,
            current: page,
            pages: Math.ceil(count/perPage),
            title
        }))
        .catch((error) => handleError(res, error)); */
}

const getEditUser = (req, res) => {
    const title = 'Редактирование пользователя';
    User
        .findById(req.params.id)
        .then((user) => res.render(createPath('edit-user'), {user, title}))
        .catch((error) => handleError(res, error));
}

const editUser = (req, res) => {
    const { firstName, middleName, lastName, email, address, city, phoneNumber, group, course, isStudent, isPrepod } = req.body;
    const { id } = req.params;
    User
        .findByIdAndUpdate(id, { firstName, middleName, lastName, email, address, city, phoneNumber, group, course, isStudent, isPrepod })
        .then((result) => res.redirect(`/users/${id}`))
        .catch((error) => handleError(res, error));
}

const deleteUser = (req, res) => {
    const title = 'Кафедра';
    User
        .findByIdAndDelete(req.params.id)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => handleError(res, error));
}

/* const getAddUser = (req, res) => {
    const { firstName, middleName, lastName, email, address, city, phoneNumber, group, course, isStudent, isPrepod } = req.body;
    const cafedra = new Cafedra({ firstName, middleName, lastName, email, address, city, phoneNumber, group, course, isStudent, isPrepod });
    cafedra
        .save()
        .then((result) => res.redirect('/users'))
        .catch((error) => handleError(res, error));
} */
const postUser = async (req, res) => {
    const { firstName, middleName, lastName, email, address, city, phoneNumber, group, course, isStudent, isPrepod} =
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
  user.isPrepod = isPrepod;
  user.isStudent = isStudent;
  await user.save();
  res.render(createPath('user'), { user });
}

module.exports = {
    getUser,
    getUsers,
    getEditUser,
    editUser,
    deleteUser,
    // getAddUser,
    postUser,
}