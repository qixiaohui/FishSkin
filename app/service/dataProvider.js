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
    		let index = -1;
            for (var item in cart) {
                index++;
                if (cart[item]._id === product._id) {
                    break;
                }
            }
    		if (index > -1) {
    			cart.splice(index, 1);
    		}
    		return cart;
    	}

    	var getProduct = () => {
    		return cart;
    	}

        var isProductInCart = (product) => {
            debugger;
            for (var item in cart) {
                if (cart[item]._id === product._id) {
                    return true;
                }
            }
            return false;
        }

    	return {
    		setData,
    		getData,
    		addProduct,
    		removeProduct,
    		getProduct,
            isProductInCart
    	}
    })
}