var express = require('express');
var router = express.Router();

var Category = require('../models/category_model').Category

router.get('/', function(req, res, next) {
  Category.find({},(err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.post('/addCategory', (req, res) => {
  new Category(req.body)
  .save()
  .then(done => {
    res.send(done)
  })
  .catch(err => {
    res.send(err)
  })
})

router.delete('/', (req, res) => {
  Category.remove({}, (err) => {
    if (err) {
      res.send(err)
    } else {
      res.send(true)
    }
  })
})

module.exports = router;
