let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    title: {type: String, required: true},
    is_complete: {type: Boolean, default: false},
    created_at: {type: Date, required: true, default: Date.now},
    completed_at: {type: Date}
});

module.exports = mongoose.model('ToDo', schema);