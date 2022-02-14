const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daySchema = new Schema({
    Weekday: {
        type: String,
        required: true,
    },
    Para1: {
        type: String,
    },
    Para2: {
        type: String,
    },
    Para3: {
        type: String,
    },
    Para4: {
        type: String,
    },
    Para5: {
        type: String,
    },
    Para6: {
        type: String,
    },
    Para7: {
        type: String,
    },
});

const Day = mongoose.model('Day', daySchema);

module.exports = Day;