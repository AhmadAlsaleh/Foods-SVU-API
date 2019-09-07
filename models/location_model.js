var mongoose = require('mongoose')

const location = mongoose.Schema({
    nameAR: String,
    nameEN: String,
    subLocations: [{
        nameAR: String,
        nameEN: String
    }]
})

module.exports = {
    'Location': mongoose.model('Location', location),
    'Schema': location
}