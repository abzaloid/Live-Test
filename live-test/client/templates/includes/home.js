Template.home.rendered = function () {
	$("html").addClass("test");
	$("body").removeClass('test-body').removeClass('register-body');
	$("head > title").text("StudySpace");
};

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


Template.home.helpers({
	user: function () {
		return getUserInfo();
	},
	user_name: function () {
		if (Meteor.user()) {
			return OUsers.findOne({email: Meteor.user().emails[0].address});
		} else {
			return "";
		}
	},
	result: function () {
		if (Meteor.user() && Results.findOne({email: Meteor.user().emails[0].address})) {
			return true;
		}
		return null;
	}
});

Template.home.events({
	'click .menu-btn': function(e) {
		$(e.target).toggleClass('pressed');
		$('.mobile-navigation').slideToggle(300);
	}
});