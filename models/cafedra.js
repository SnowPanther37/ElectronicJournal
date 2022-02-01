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
        maxlength: 50,
    },
    dekan: {
        type: String,
        required: true,
        maxlength: 50,
    },
    direction: {
        type: String,
        required: true,
        maxlength: 20,
    }
}, { timestamps: true });

const Cafedra = mongoose.model('Cafedra', cafedraSchema);

module.exports = Cafedra;