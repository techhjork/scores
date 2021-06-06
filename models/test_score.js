const mongoose = require("mongoose")

const Schema = mongoose.Schema

const scoreSchema = Schema({
	candidate:{
		type: Schema.Types.ObjectId,
		ref:"candidate"
	},
	first_round:Number,
	second_round:Number,
	third_round:Number
})

module.exports = mongoose.model("test_score",scoreSchema)