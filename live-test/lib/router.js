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

Router.route('/profile/:_id', {
	name: 'cabinet',
	data: function () {
		return OUsers.findOne(this.params._id);
	}
});

Router.route('/standings', {
	name: 'rankings'
});

Router.route('/confirm', {
	name: 'confirm'
});

var requireLogin = function () {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('no_access');
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction(requireLogin, {
	only: ['test', 'cabinet', 'confirm']
});
