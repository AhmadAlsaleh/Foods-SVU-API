var mongoose = require('mongoose')

const user = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    facebookID: String,
    imagePath: String,
    isPro: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    starredMeals: [String]
})

module.exports = {
    'User': mongoose.model('User', user),
    'Schema': user
}