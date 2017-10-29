const Product = require("../model/product/schema");
const User = require("../model/user/schema");

module.exports = (autoIncrement) => {
	Product(autoIncrement);
	User(autoIncrement);
}