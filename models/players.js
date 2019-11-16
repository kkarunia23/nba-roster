//___________________
//Dependencies
//___________________
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//___________________
//Set up Schema
//___________________
const playerSchema = new Schema({
        name: {
                type: String,
                required: [true, 'No one will buy it if it does not have a name']
        },
        tid: String,
        imgURL: String
});

//___________________
//Set up Model
//___________________
const Player = mongoose.model('Player', playerSchema);

//___________________
////Module Exports - access Team in controllers/teams.js
//___________________
module.exports = Player;