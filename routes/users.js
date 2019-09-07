var express = require('express');
var router = express.Router();

var User = require('../models/user_model').User
var base64ToImage = require('base64-to-image')
var usersProjection = { 
  __v: false,
  reports: false,
  password: false
};

router.get('/', function(req, res, next) {
  User.find({}, usersProjection,(err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, usersProjection, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.post('/signup', (req, res) => {
  User.findOne({ 'username': req.body.username }, (err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      if (data == null) {
        new User(req.body)
        .save()
        .then(done => {
          res.send(done)
        })
        .catch(err => {
          res.send(err)
        })
      } else {
        res.status(201).send({
          'message': 'Already Signed up'
        })
      }
    }
  })
})

router.post('/signin', (req, res) => {
  User.findOne({ 'username': req.body.username, 'password': req.body.password }, usersProjection,
  (err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(data)
    }
  })
})

router.post('/facebook', (req, res) => {
  User.findOne({ username: req.body.username }, ['_id', 'name', 'isPro'], (err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      if (data == null) {
        new User(req.body)
        .save()
        .then(done => {
          res.send(done)
        })
        .catch(err => {
          res.status(400).send(err)
        })
      } else {
        res.send(data)
      }
    }
  })
})

router.get('/upgrade/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, { isPro: true },(err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send({
        '_id': data._id,
        'isPro': true
      })
    }
  })
})

router.post('/edit', (req, res) => {
  User.findByIdAndUpdate(req.body.id, req.body, (err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send({
        '_id': data._id,
        'name': data.name
      })
    }
  })
})

router.post('/editImage', (req, res) => {
  base64ToImage(req.body.image, './public/images/users/', {
    'fileName': req.body.id, 'type': 'jpg'
  })
  User.findByIdAndUpdate(req.body.id, { imagePath: req.body.id + '.jpg' }, (err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send({
        'imagePath': req.body.id + '.jpg'
      })
    }
  })
})

router.delete('/', (req, res) => {
  User.remove({}, (err) => {
    if (err) {
      res.send(err)
    } else {
      res.send(true)
    }
  })
})

module.exports = router;
