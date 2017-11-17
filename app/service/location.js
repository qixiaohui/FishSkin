export default (ngModule) => {
    ngModule.service("location", ($location) => {
    	let redirect = () => {
    		if (!localStorage.getItem("USER")) {
    			$location.path("/main/login");
    		}
    	};

        let shouldRedirectHome = (products) => {
            if (!products || (products instanceof Array && products.length == 0)) {
                $location.path("/main/home");
            }
        };

    	return {
            shouldRedirectHome,
    		redirect
    	};
    });
};