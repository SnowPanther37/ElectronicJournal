const Cafedra = require('../models/cafedra');

const handleError = (res, error) => {
    res.status(500).send(error.message);
};

const getCafedra = (req, res) => {
    Cafedra
        .findById(req.params.id)
        .then((cafedra) => res.status(200).json(cafedra))
        .catch((error) => handleError(res, error));
}

const deleteCafedra = (req, res) => {
    Cafedra
        .findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json(req.params.id))
        .catch((error) => handleError(res, error));
}

const editCafedra = (req, res) => {
    const { title, dekan, text, redirect } = req.body;
    const { id } = req.params;
    Cafedra
        .findByIdAndUpdate(id, { title, dekan, text, redirect }, { new: true })
        .then((cafedra) => res.status(200).json(cafedra))
        .catch((error) => handleError(res, error));
}

const getCafedras = (req, res) => {
    Cafedra
        .find()
        .sort({ createdAt: -1 })
        .then((cafedras) => res.status(200).json(cafedras))
        .catch((error) => handleError(res, error));
}

const getAddCafedra = (req, res) => {
    const { title, dekan, text, direction } = req.body;
    const cafedra = new Cafedra({ title, dekan, text, direction });
    cafedra
        .save()
        .then((cafedra) => res.status(200).json(cafedra))
        .catch((error) => handleError(res, error));
}

module.exports = {
    getCafedra,
    deleteCafedra,
    editCafedra,
    getCafedras,
    getAddCafedra,
}