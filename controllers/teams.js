//require express so we can use router
const express = require('express');
const teams = express.Router();

//Models
//get access to the Team model
const Team = require('../models/Teams');

//Seed json Route
teams.get('/json', (req, res) => {
  Team.find((err, teams) => {
    res.send(teams);
  });
});

//7 Restful Routes
// Index  : GET    '/teams'          1/7
// Show   : GET    '/teams/:id'      2/7
// New    : GET    '/teams/new'   3/7
// Create : POST   '/teams'          4/7
// Edit   : GET    '/teams/:id/edit' 5/7
// Update : PUT    '/teams/:id'      6/7
// Delete : DELETE '/teams/:id'      7/7

// Index  : GET    '/teams'          1/7
teams.get('/', (req, res) => {
  Team.find({}, (err, teams) => {
    if (err) { console.log(err); }
    res.render('./teams/index.ejs', { teams });
  });
});

// New    : GET    '/teams/new'      3/7
// Order matters! must be above /products/:id or else this route will never get hit
teams.get('/new', (req, res) => {
  res.render('./teams/new.ejs');
});

// Show   : GET    '/teams/:id'      2/7
teams.get('/:id', (req, res) => {
  Team.findById(req.params.id, (err, Team) => {
    if (err) { console.log(err); }
    res.render('./teams/show.ejs', { Team: Team });
  });
});

// Create : POST   '/teams'          4/7
teams.post('/', (req, res) => {
  Team.create(req.body, (err, Team) => {
    if (err) { res.send(err); } else {
      res.redirect('/teams/' + Team.id);
    }
  });
});

// Edit   : GET    '/teams/:id/edit' 5/7
teams.get('/:id/edit', (req, res) => {
  Team.findById(req.params.id, (err, Team) => {
    if (err) { console.log(err); }
    res.render('./teams/edit.ejs', { Team: Team }
    );
  });
});

// Update : PUT    '/teams/:id'      6/7
teams.put('/:id', (req, res) => {
  Team.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, Team) => {
    if (err) { console.log(err); }
    res.redirect('/teams/' + Team.id);
  });
});

// Delete : DELETE '/teams/:id'      7/7
teams.delete('/:id', (req, res) => {
  Team.findByIdAndRemove(req.params.id, (err, Team) => {
    if (err) { console.log(err); }
    res.redirect('/teams');
  });
});


//Seed Route - Vist ONCE to populate database
teams.get('/seed/newteams', (req, res) => {

  const newteams = [
    {
      _id: "58e913abb7304c0e0f20d0d8",
      name: "Beans",
      description: "A small pile of beans. Buy more beans for a big pile of beans.",
      img: "http://www.rodalesorganiclife.com/sites/rodalesorganiclife.com/files/styles/slideshow-desktop/public/navybeans_peangdao_1100.jpg?itok=QB7fl971",
      price: 5,
      qty: 99,
      __v: 0
    }
  ];

  Team.create(newteams, (err, Team) => {
    if (err) { console.log(err); }
    console.log("SEED: NEW teams CREATED!");
    res.redirect('/teams');
  });
});

//ALTERNATE Seed Route - Vist ONCE to populate database
const teamseeds = require('../models/seed.js');
teams.get('/seed/newteams/viaseedfile', (req, res) => {
  Team.insertMany(teamseeds, (err, teams) => {
    if (err) { console.log(err); } else {
      res.send(teams);
    }
  });
});

//Mistakes happen! Drop Database - Vist ONCE to drop your database. WARNING! YOU CANNOT UNDO THIS!
teams.get('/dropdatabase/cannotundo/areyoursure/reallysure/okthen', (req, res) => {
  Team.collection.drop();
  res.send('You did it! You dropped the database!');
});

//Module Exports - access this file in server.js
//Export router AND require it in server.js Step 3/3
//Note all three need to be working in order to get server runnning
module.exports = teams;