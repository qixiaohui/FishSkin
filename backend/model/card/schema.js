const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CardSchema = new Schema({
	token: {
		type: String,
		required: true,
		unique: true
	},
	cardId: {
		type: String,
		required: true,
		unique: true
	},
	address: {
		type: String,
		required: true,
		unique: false
	},
	city: {
		type: String,
		required: true,
		unique: false
	},
	zip: {
		type: Number,
		required: true,
		unique: false
	},
	state: {
		type: String,
		required: true,
		unique: false
	},
	brand: {
		type: String,
		required: true,
		unique: false
	},
	expiry: {
		type: String,
		required: true,
		unique: false
	},
	lastFour: {
		type: Number,
		required: true,
		unique: false
	},
	holderEmail: {
		type: String,
		required: true,
		unique: false
	}
});

const init = (autoIncrement) => {
	ProductSchema.plugin(autoIncrement.plugin, 'Card');
}

module.exports = {
	init: init,
	data: mongoose.model("Card", CardSchema)
};