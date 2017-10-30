export default (ngModule) => {
    ngModule.service("dataprovider", () => {
    	var data = {};
    	var cart = [];

    	var setData = (input) => {
    		data = input;
    	}

    	var getData = () => {
    		return data;
    	}

    	var addProduct = (product) => {
    		cart.push(product);
    	}

    	var removeProduct = (product) => {
    		let index = cart.indexof(product);
    		if (index > -1) {
    			cart.splice(index, 1);
    		}
    		return cart;
    	}

    	var getProduct = () => {
    		return cart;
    	}

    	return {
    		setData,
    		getData,
    		addProduct,
    		removeProduct,
    		getProduct 
    	}
    })
}