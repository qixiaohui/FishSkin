const Product = require("../model/product/schema");
const User = require("../model/user/schema");
const Card = require("../model/card/schema");

module.exports = (autoIncrement) => {
	Product(autoIncrement);
	User(autoIncrement);
	Card(autoIncrement);
}