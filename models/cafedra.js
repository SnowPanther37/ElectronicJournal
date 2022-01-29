const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cafedraSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    dekan: {
        type: String,
        required: true,
    },
    direction: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Cafedra = mongoose.model('Cafedra', cafedraSchema);

module.exports = Cafedra;