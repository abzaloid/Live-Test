Template.home.rendered = function () {
	$("html").removeClass("test");
	$("body").removeClass('test-body').removeClass('register-body');
	$("head > title").text("StudySpace");
};

Template.home.helpers({
	user_name: function () {
		if (Meteor.user()) {
			return OUsers.findOne({email: Meteor.user().emails[0].address});
		} else {
			return "";
		}
	}
});