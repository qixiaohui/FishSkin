const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	stock: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: Array,
		required: true
	},
	productImage: {
		type: Array,
		required: true
	},
	discountPrice: {
		type: String,
		required: false
	},
	timestamp: {
		type: Date,
		required: false
	},
	lastupdate: {
		type: Date,
		required: false
	}

});

ProductSchema.pre('save', function (next) {
	var date = new Date();
	this.lastupdate = date;
	if (!this.timestamp) {
		this.timestamp = date;
	}

	next();
});

const init = (autoIncrement) => {
	ProductSchema.plugin(autoIncrement.plugin, 'Product');
}

module.exports = {
	init: init,
	data: mongoose.model("Product", ProductSchema)
};
