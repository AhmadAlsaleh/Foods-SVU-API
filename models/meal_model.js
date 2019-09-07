var mongoose = require('mongoose')

const meal = mongoose.Schema({
    nameAR: String,
    nameEN: String,
    image: String,
    locationID: String,
    descriptionAR: String,
    descriptionEN: String,
    items: [String]
})

module.exports = {
    'Meal': mongoose.model('Meal', meal),
    'Schema': meal
}