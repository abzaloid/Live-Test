Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading',
 	// waitOn: function() { 
 	// 	return [Meteor.subscribe('links')]; 
 	// }
});

Router.route('/', {
	name: 'home'
});

Router.route('/register', {
	name: 'register'
});

Router.route('/login', {
	name: 'enter'
});

Router.route('/ent', {
	name: 'test'
});
