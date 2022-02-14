const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prepodSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    Day: {
        Weekday: String,
     },
    Para: {
       NameObject: String,
       Cabinet: String,
    },
    Group: {
        GroupNum: String,
    },
    Students: {
        Name: String
    }
            
        
    
  /*   MondayFirst: {
        type: String,
        required: true,
    },
    TuesdayFirst: {
        type: String,
        required: true,
    },
    WednesdayFirst: {
        type: String,
        required: true,
    },
    ThursdayFirst: {
        type: String,
        required: true,
    },
    FridayFirst: {
        type: String,
        required: true,
    },
    SaturdayFirst: {
        type: String,
        required: true,
    },
    SundayFirst: {
        type: String,
        required: true,
    },
    MondaySecond: {
        type: String,
        required: true,
    },
    TuesdaySecond: {
        type: String,
        required: true,
    },
    WednesdaySecond: {
        type: String,
        required: true,
    },
    ThursdaySecond: {
        type: String,
        required: true,
    },
    FridaySecond: {
        type: String,
        required: true,
    },
    SaturdaySecond: {
        type: String,
        required: true,
    },
    SundaySecond: {
        type: String,
        required: true,
    }, */
});

const Prepod = mongoose.model('Prepod', prepodSchema);

module.exports = Prepod;