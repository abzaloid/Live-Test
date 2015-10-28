Template.test.rendered = function () {
	$("head > title").text("Онлайн ЕНТ | StudySpace");
	$("body").removeClass("register-body").addClass("test-body");
	$("html").addClass('test');

	$(".test-questions > div").hide();
	$("div#kazakh").show();

	var $form = $("form");
	var f_len = $form.length;

	for (var i = 0; i < f_len; i++) {
		var c_id = $form.eq(i).attr('id');
		var possible_ans = SessionAmplify.get(Meteor.userId() + c_id);
		if (possible_ans) {
			console.log(possible_ans);
			$("form#"+c_id+" > label > input:radio[name='radgroup'][value='"+possible_ans+"']").attr('checked', true);
		}
	}

}

Template.test.helpers({
	kazakh_questions: function () {
		return Questions.find({course_en: 'kazakh'});
	},
	russian_questions: function () {
		return Questions.find({course_en: 'russian'});
	},
	math_questions: function () {
		return Questions.find({course_en: 'math'});
	},
	history_questions: function () {
		return Questions.find({course_en: 'history'});
	},
	fifth_questions: function () {
		return Questions.find({is_fifth: true, course_en: 'physics'});
	},
	user_name: function () {
		if (Meteor.user()) {
			return OUsers.findOne({email: Meteor.user().emails[0].address});
		} else {
			return "";
		}
	}

});

Template.test.events({
	"click .test-navigation__item": function (e) {
		e.preventDefault();
		var $this = $(e.target);

		console.log($this);

		$(".test-navigation__item").parent().children().removeClass('active');
		$this.addClass('active');

		$(".test-questions > div").hide();
		$("#"+$this.attr('data-for').split('_')[1]).show();

	},
	'click input:radio[name="radgroup"]': function (e) {
		var $this = $(e.target);
		console.log($this.filter(":checked").val());
		console.log(Meteor.userId() + $this.parent().parent().attr('id'));
		SessionAmplify.set(Meteor.userId() + $this.parent().parent().attr('id'), $this.filter(":checked").val());
	}
});