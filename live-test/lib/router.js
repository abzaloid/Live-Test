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

Router.route('/profile', {
	name: 'cabinet'
});

Router.route('/standings', {
	name: 'rankings'
});

var requireLogin = function () {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction(requireLogin, {
	only: ['test', 'cabinet']
});