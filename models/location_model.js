var mongoose = require('mongoose')

const location = mongoose.Schema({
    name: String,
    lat: Number,
    lng: Number,
    subLocations: [location]
})

module.exports = {
    'Location': mongoose.model('Location', location),
    'Schema': location
}