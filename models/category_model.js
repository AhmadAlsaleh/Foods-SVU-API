var mongoose = require('mongoose')
var Meal = require('./meal_model').Schema

const category = mongoose.Schema({
    name: String,
    image: String,
    meals: [Meal]
})

module.exports = {
    'Category': mongoose.model('Category', category),
    'Schema': category
}