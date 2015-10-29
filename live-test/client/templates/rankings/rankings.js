Template.rankings.rendered = function () {
	$("head > title").text("Результаты ЕНТ | StudySpace");
	$("body").removeClass("register-body").addClass("test-body");
	$("html").addClass('test');
}

Template.rankings.helpers({
	user_name: function () {
		if (Meteor.user()) {
			return OUsers.findOne({email: Meteor.user().emails[0].address});
		} else {
			return "";
		}
	}
});