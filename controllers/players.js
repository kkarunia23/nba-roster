//___________________
//Dependencies
//___________________
//require express so we can use router
const express = require('express');
const players = express.Router();

//___________________
//Models
//___________________
//get access to the Player model
const Player = require('../models/players');

//___________________
//See json Route
//___________________
players.get('/json', (req, res) => {
  Player.find((err, players) => {
    res.send(players);
  });
});

//___________________
//7 Restful Routes
//___________________
// Index  : GET    '/players'          1/7
// Show   : GET    '/players/:id'      2/7
// New    : GET    '/players/new'   3/7
// Create : POST   '/players'          4/7
// Edit   : GET    '/players/:id/edit' 5/7
// Update : PUT    '/players/:id'      6/7
// Delete : DELETE '/players/:id'      7/7


// Index  : GET    '/players'          1/7
players.get('/', (req, res) => {
  Player.find({}, (err, players) => {
    if (err) { console.log(err); }
    res.render('./players/index.ejs', { players });
  });
});

// New    : GET    '/players/new'      3/7
// Order matters! must be above /prodcuts/:id or else this route will never get hit
players.get('/new', (req, res) => {
  res.render('./players/new.ejs');
});

// Show   : GET    '/players/:id'      2/7
players.get('/:id', (req, res) => {
  Player.findById(req.params.id, (err, Player) => {
    if (err) { console.log(err); }
    res.render('./players/show.ejs', { Player: Player });
  });
});

// Create : POST   '/players'          4/7
players.post('/', (req, res) => {
  Player.create(req.body, (err, Player) => {
    if (err) { res.send(err); } else {
      res.redirect('/players/' + Player.id);
    }
  });
});

// Edit   : GET    '/players/:id/edit' 5/7
players.get('/:id/edit', (req, res) => {
  Player.findById(req.params.id, (err, Player) => {
    if (err) { console.log(err); }
    res.render('./players/edit.ejs', { Player: Player }
    );
  });
});

// Update : PUT    '/players/:id'      6/7
players.put('/:id', (req, res) => {
  Player.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, Player) => {
    if (err) { console.log(err); }
    res.redirect('/players/' + Player.id);
  });
});

// Delete : DELETE '/players/:id'      7/7
players.delete('/:id', (req, res) => {
  Player.findByIdAndRemove(req.params.id, (err, Player) => {
    if (err) { console.log(err); }
    res.redirect('/players');
  });
});


//___________________
//Seed Route - Vist ONCE to populate database
//___________________
players.get('/seed/newplayers', (req, res) => {

  const newplayers = [
    {

    }
  ];


  Player.create(newplayers, (err, Player) => {
    if (err) { console.log(err); }
    console.log("SEED: NEW players CREATED!");
    res.redirect('/players');
  });
});

//___________________
//ALTERNATE Seed Route - Vist ONCE to populate database
//___________________
const playerseeds = require('../models/seed.js');
players.get('/seed/newplayers/viaseedfile', (req, res) => {
  Player.insertMany(playerseeds, (err, players) => {
    if (err) { console.log(err); } else {
      res.send(players);
    }
  });
});

//___________________
//Mistakes happen! Drop Database - Vist ONCE to drop your database. WARNING! YOU CANNOT UNDO THIS!
//___________________
players.get('/dropdatabase/cannotundo/areyoursure/reallysure/okthen', (req, res) => {
  Player.collection.drop();
  res.send('You did it! You dropped the database!');
});

//___________________
//Module Exports - access this file in server.js
//___________________
//Export router AND require it in server.js Step 3/3
//Note all three need to be working in order to get server runnning
module.exports = players;