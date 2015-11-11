Template.cabinet.rendered = function () {
	$("head > title").text("Ваш профайл | StudySpace");
	$("body").removeClass("register-body").addClass("test-body");
	$("html").addClass('test');
}

function getUserInfo () {
	var m_user;
	if (Meteor.user()) {
		m_user = OUsers.findOne({email: Meteor.user().emails[0].address});
	} else {
		Router.go('home');
		return null;
	}
	return m_user;
}


Template.cabinet.helpers({
	user: function () {
		return getUserInfo();
	},
});

Template.cabinet.events({
	'click .cabinet-logout' : function (e) {
		e.preventDefault();
		Accounts.logout();
		Router.go('home');
	}
});