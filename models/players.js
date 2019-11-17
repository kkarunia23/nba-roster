//Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Set up Schema
const playerSchema = new Schema({
        name: {
                type: String,
                required: [true, 'hall-of-famer needs a name']
        },
        tid: String,
        imgURL: String,
        pos: String,
        college: String
});

//Set up Model
const Player = mongoose.model('Player', playerSchema);

////Module Exports - access Team in controllers/teams.js
module.exports = Player;