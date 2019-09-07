var express = require('express');
var router = express.Router();

var Location = require('../models/location_model').Location

router.get('/', function(req, res, next) {
  Location.find({}, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.post('/Location', (req, res) => {
  new Location(req.body)
  .save()
  .then(done => {
    res.send(done)
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/newMainLocation', (req, res) => {
  new Location(req.body)
  .save()
  .then(done => {
    res.send(done)
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/newSubLocation/:id', (req, res) => {
  Location.update({ _id: req.params.id }, { $push: { subLocations: req.body } }, (err, done) => {
    if (err) {
      res.send(err)
    } else {
      res.send(done)
    }
  })
})

router.get('/getLocation/:id', (req, res) => {
  Location.findOne({ 'subLocations._id': req.params.id }, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      var rs = {}
      data.subLocations.forEach(element => {
        if (element._id = req.params.id) {
          rs.nameAR = data.nameAR + ", " + element.nameAR
          rs.nameEN = data.nameEN + ", " + element.nameEN
        }
      });
      res.send(rs)
    }
  })
})

router.delete('/', (req, res) => {
  Location.remove({}, (err) => {
    if (err) {
      res.send(err)
    } else {
      res.send(true)
    }
  })
})

module.exports = router;
