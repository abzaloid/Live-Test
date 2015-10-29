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
	name: function () {
		if (getUserInfo())
			return getUserInfo().name;
		else
			return null;
	},
	surname: function () {
		if (getUserInfo())
			return getUserInfo().surname;
		else
			return null;
	},
	language: function () {
		if (getUserInfo())
			return getUserInfo().language;
		else
			return null;
	},
	region: function () {
		if (getUserInfo())
			return getUserInfo().region;
		else
			return null;
	},
	result: function () {
		var res = Results.find({email: getUserInfo().email});

		var sum = 0;
		if (res && res.count() > 0) {
			res = res.fetch();
			for (var i = 0; i < res.length; i++) {
				sum += res[i].results;
			}
			return sum;
		}
		return null;
	}
});

Template.cabinet.events({
	'click .general-button cabinet-logout' : function (e) {
		e.preventDefault();
		Accounts.logout();
		Router.go('home');
	}
});