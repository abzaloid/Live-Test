Template.confirm.rendered = function () {
	$("head > title").text("Онлайн ЕНТ | StudySpace");
	$("body").removeClass("register-body").addClass("test-body");
	$("html").addClass('test');
}

Template.confirm.helpers({
	name: function () {
		if (Meteor.user())
			return OUsers.findOne({email: Meteor.user().emails[0].address}).name;
		else
			return null;
	},

});
