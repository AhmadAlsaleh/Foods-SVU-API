var express = require('express');
var router = express.Router();

var Category = require('../models/category_model').Category

router.get('/', function(req, res, next) {
  Category.find({}, ['nameAR', 'nameEN', 'image'], (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.get('/allMeals', (req, res) => {
  Category.find({}, ['meals'], (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.get('/:id', (req, res) => {
  Category.findOne({ _id: req.params.id }, ['meals'], (err, data) => {
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

router.post('/addMeal/:id', (req, res) => {
  Category.update({ _id: req.params.id }, { $push: { meals: req.body } }, (err, done) => {
    if (err) {
      res.send(err)
    } else {
      res.send(done)
    }
  })
})

router.post('/findMeal', (req, res) => {
  // Category.find({ _id: req.body.categoryID }, ['meals'], (err, data) => {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     var rs = {}
  //     data.meals.forEach(element => {
  //       if (req.body.locationID != "" && element.locationID == req.body.locationID) {
  //         rs = element
  //       }
  //     });
  //     res.send(rs)
    // }
  // })
})

module.exports = router;
