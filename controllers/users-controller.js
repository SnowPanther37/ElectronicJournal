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


const getUsers = (req, res) => {
    const title = 'Пользователи';
    User
        .find()
        .sort({ createdAt: -1 })
        .then((users) => res.render(createPath('users'), {users, title}))
        .catch((error) => handleError(res, error));
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

module.exports = {
    getUser,
    getUsers,
    getEditUser,
    editUser,
    deleteUser
}