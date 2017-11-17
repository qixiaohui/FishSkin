export default (ngModule) => {
    ngModule.service("dataprovider", () => {
    	var data = {};
    	var cart = [];
        var user = null;

        var getEmail = () => {
            if (!user) {
                user = JSON.parse(localStorage.getItem('USER'));
            }
            return user.email;
        }

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

        var clearCart = () => {
            cart = [];
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
            getEmail,
    		setData,
    		getData,
    		addProduct,
    		removeProduct,
            clearCart,
    		getProduct,
            isProductInCart
    	}
    })
}