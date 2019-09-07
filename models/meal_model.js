var mongoose = require('mongoose')

const meal = mongoose.Schema({
    name: String,
    image: String,
    locationID: String,
    categoryID: String,
    description: String,
    items: [String]
})

module.exports = {
    'Meal': mongoose.model('Meal', meal),
    'Schema': meal
}