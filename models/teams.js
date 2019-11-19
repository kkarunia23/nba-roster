//Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Set up Schema
const teamSchema = new Schema({
        name: {
                type: String,
                required: [true, 'dynasty needs a name']
        },
        tid: String,
        imgURL: String,
        player: [{ type: Schema.Types.ObjectId, ref: "Player" }]
});

//Set up Model
const Team = mongoose.model('Team', teamSchema);

////Module Exports - access Team in controllers/teams.js
module.exports = Team;