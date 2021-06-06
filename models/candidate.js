const mongoose = require("mongoose")

const Schema = mongoose.Schema

const candidateSchema = Schema({
	name:String,
	email:String
})

module.exports = mongoose.model("candidate",candidateSchema)