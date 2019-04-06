const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "users"},
    avatar: {type: String},
    zipCode: { type: String },
    facebook: { type: String},
    twitter: { type: String},
    city: { type: String},
    country: { type: String},
    publicPlace: { type: String},
    number: { type: String},
    neighborhood: { type: String},
    state: { type: String}
})

module.exports = mongoose.model('profiles', profileSchema)