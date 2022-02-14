const Prepod = require('../models/Prepod');
const Day = require('../models/Day');
const createPath = require('../helpers/create-path');

const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('error'), { title: 'Error' })
};

const getPrepod = (req, res) => {
    const title = 'Преподаватель';
    Prepod
        .findById(req.params.id)
        .then((prepod) => res.render(createPath('prepod'), {prepod, title}))
        .catch((error) => handleError(res, error));
}

/* const deleteCafedra = (req, res) => {
    const title = 'Кафедра';
    Cafedra
        .findByIdAndDelete(req.params.id)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => handleError(res, error));
}

const getEditCafedra = (req, res) => {
    const title = 'Редактирование Кафедры';
    Cafedra
        .findById(req.params.id)
        .then((cafedra) => res.render(createPath('edit-cafedra'), {cafedra, title}))
        .catch((error) => handleError(res, error));
}

const editCafedra = (req, res) => {
    const { title, dekan, text, direction, redirect } = req.body;
    const { id } = req.params;
    Cafedra
        .findByIdAndUpdate(id, { title, dekan, text, direction, redirect })
        .then((result) => res.redirect(`/cafedras/${id}`))
        .catch((error) => handleError(res, error));
}
 */
const getPrepods = (req, res) => {
    const title = 'Преподаватели';
    Prepod
        .find()
        .sort({ createdAt: -1 })
        .then((prepods) => res.render(createPath('prepods'), {prepods, title}))
        .catch((error) => handleError(res, error));
}

/* const getAddCafedra = (req, res) => {
    const { title, dekan, text, direction } = req.body;
    const cafedra = new Cafedra({ title, dekan, text, direction });
    cafedra
        .save()
        .then((result) => res.redirect('/cafedras'))
        .catch((error) => handleError(res, error));
}

const AddCefedra = (req, res) => {
    const title = 'Добавление кафедры';
    res.render(createPath('add-cafedra'), {title});
} */

module.exports = {
    getPrepod,
    /* deleteCafedra,
    getEditCafedra,
    editCafedra, */
    getPrepods,
    /* getAddCafedra,
    AddCefedra */
}