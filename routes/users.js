var express = require('express');
var router = express.Router();

var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /users

// POST /users
router.post('/', function(req, res, next){
  // Lisää tämä käyttäjä (Vinkki: create), muista kuitenkin sitä ennen varmistaa, että käyttäjänimi ei ole jo käytössä! (Vinkki: findOne)
  var userToAdd = req.body;
  // Palauta vastauksena lisätty käyttäjä
  //
  if(userToAdd == null || userToAdd.username == null || userToAdd.password == null){
      res.status(400).json({ error: 'Epäkelpo käyttäjä!' });
  }
  Models.User.findOne({
    where: {username: userToAdd.username}
  }).then(function (user){
      if (user) {
        console.log('virhulainen käyttäjä on jo');
        res.status(400).json({ error: 'Käyttäjätunnus on jo käytössä!' });
      } else {
        // lisää käyttäjä
        Models.User.create(userToAdd).then( function (user) {
          res.json(user);
        });
      }
    });
});

// POST /users/authenticate
router.post('/authenticate', function(req, res, next){
  // Tarkista käyttäjän kirjautuminen tässä. Tee se katsomalla, löytyykö käyttäjää annetulla käyttäjätunnuksella ja salasanalla (Vinkki: findOne ja sopiva where)
  var userToCheck = req.body;
  console.log('auth', userToCheck);
  if(userToCheck == null || userToCheck.username == null || userToCheck.password == null){
    res.send(403);
  }

  Models.User.findOne({
    where: {
      username: userToCheck.username,
      password: userToCheck.password
    }
  }).then(function(user){
    if(user){
      console.log('got here');
      req.session.userId = user.id;
      res.json(user);
    } else {
      res.send(403);
    }
  });
});

// GET /users/logged-in
router.get('/logged-in', function(req, res, next){
  var loggedInId = req.session.userId ? req.session.userId : null;

  if(loggedInId == null){
    res.json({});
  }else{
    // Hae käyttäjä loggedInId-muuttujan arvon perusteella (Vinkki: findOne)
    Models.User.findOne({
      where: {id: loggedInId}
    }).then(function (user){
      res.json(user);
    });
  }

  res.send(200);
});

// GET /users/logout
router.get('/logout', function(req, res, next){
  req.session.userId = null;

  res.send(200);
});

module.exports = router;
