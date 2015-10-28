Template.test.rendered = function () {
	$("head > title").val("Тест");
	$("body").removeClass("register-body").addClass("test-body");
	$("html").addClass('test');

	$(".test-questions").children().hide();
	$("div#kazakh").show();

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
});

Template.test.events({
	"click .test-navigation__item": function (e) {
		e.preventDefault();
		var $this = $(e.target);

		console.log($this);

		$(".test-navigation__item").parent().children().removeClass('active');
		$this.addClass('active');

		$(".test-questions").children().hide();
		$("#"+$this.attr('data-for').split('_')[1]).show();

	}
});