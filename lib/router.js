var _ = require('underscore')

function Router(){
	// Javascript Object we'll use as a Hash-Table
	this.routes = {};
}
exports.Router = Router;

Router.prototype.route = function(method, url, callback) {
	// body...
	var routes = this.routes[method] = this.routes[method] || []

	routes.push({
		regexp: new RegExp ("^" + url + "$", "i"),	//case-insensetive
		callback: callback
	})
}

Router.prototype.handle = function(req, res) {
	var routes = this.routes[req.method];

	// we use the 'underscore' library and find function which returns the first cell that meets the predicate given
	var route = _.find(routes, function(route){
		return route.regexp.test(req.url);
	})

	if (route){
		route.callback(req, res);
	} else{
		var err = new Error("handle not found!");
		err.status = 404;
		throw err;
	}
}