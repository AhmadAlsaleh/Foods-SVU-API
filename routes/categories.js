var express = require('express');
var router = express.Router();
var unique = require("array-unique").immutable;

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

function catID(id, res) {
  Category.findById(id, ['meals'], (err, data) => {
    if (err) {

    } else {
      res(data.meals)
    }
  })
}
function allMeals(res) {
  Category.find({}, ['meals'], (err, data) => {
    if (err) {

    } else {
      var t = []
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        t = t.concat(element.meals)
      }
      res(t)
    }
  })
}
function locID(rs, id, res) {
  var t = []
  for (let index = 0; index < rs.length; index++) {
    const element = rs[index];
    if (element.locationID == id) {
      t.push(element)
    }    
  }
  res(t)
}
function textKey(rs, key, res) {
  var r = []
  for (let index = 0; index < rs.length; index++) {
    const element = rs[index];
    if (element.nameAR.includes(key) || element.nameEN.includes(key)) {
      r.push(element)
    }
  }
  res(unique(r))
}
router.post('/findMeal', (req, res) => {
  var rs = []
  if (req.body.categoryID != "") {
    catID(req.body.categoryID, (rs1) => {
      rs = rs.concat(rs1)
      if (req.body.locationID != "") {
        locID(rs, req.body.locationID, (rs2) => {
          rs = rs2
          textKey(rs, req.body.key, (rs3) => {
            res.send(unique(rs3))
          })
        })
      } else {
        textKey(rs, req.body.key, (rs3) => {
          res.send(unique(rs3))
        })
      }
    })
  } else {
    allMeals(rs1 => {
      rs = rs1
      if (req.body.locationID != "") {
        locID(rs, req.body.locationID, (rs2) => {
          rs = rs2
          textKey(rs, req.body.key, (rs3) => {
            res.send(unique(rs3))
          })
        })
      } else {
        textKey(rs, req.body.key, (rs3) => {
          res.send(unique(rs3))
        })
      }
    })
  }
})

module.exports = router;
