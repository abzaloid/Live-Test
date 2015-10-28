Template.test.rendered = function () {
	$("head > title").val("Тест");
	$("body").removeClass("register-body").addClass("test-body");
	$("html").addClass('test');

	$(".test-questions").children().hide();
	$("div#kazakh").show();

}

function katexify(s) {
	var p = "";
	var cnt = 0;
	for (var i = 0; i < s.length; i++) {
		if (s[i] == '$') {
			if (cnt % 2 == 0)
				p += "{{#katex}}$";
			else
				p += "${{/katex}}";
			cnt++;
		} else
			p += s[i];
	}
	return p;
}

Template.test.helpers({
	kazakh_questions: function () {
		return Questions.find({course_en: 'kazakh'});
	},
	russian_questions: function () {
		return Questions.find({course_en: 'russian'});
	},
	math_questions: function () {
		var my_questions = Questions.find({course_en: 'math'});
		for (var i = 0; i < my_questions.length; i++) {
			my_questions[i].question = katexify(my_questions[i].question);
			my_questions[i].choice_A = katexify(my_questions[i].choice_A);
			my_questions[i].choice_B = katexify(my_questions[i].choice_B);
			my_questions[i].choice_C = katexify(my_questions[i].choice_C);
			my_questions[i].choice_D = katexify(my_questions[i].choice_D);
			my_questions[i].choice_E = katexify(my_questions[i].choice_E);
		}
		return my_questions;

	},
	history_questions: function () {
		return Questions.find({course_en: 'history'});
	},
	fifth_questions: function () {
		return Questions.find({is_fifth: true, course_en: 'physics'});
	},
	katexify: function (s) {
		return katexify(s);
	}
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