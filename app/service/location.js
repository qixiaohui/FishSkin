export default (ngModule) => {
    ngModule.service("location", ($location) => {
    	let redirect = () => {
    		if (!localStorage.getItem("USER")) {
    			$location.path("/main/login");
    		}
    	}

    	return {
    		redirect
    	};
    });
};