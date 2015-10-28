function getAnswer (s) {

	answer = "ABCDE";

	for (var i = 0; i < answer.length; i++) {
		if (s.indexOf(answer[i]) > -1) {
			return answer[i];
		}
	}

	return -1;

}

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
		return Questions.find({course_en: 'kazakh'}, {sort: {number: 1}});
	},
	russian_questions: function () {
		return Questions.find({course_en: 'russian'}, {sort: {number: 1}});
	},
	math_questions: function () {
		return Questions.find({course_en: 'math'}, {sort: {number: 1}});
	},
	history_questions: function () {
		return Questions.find({course_en: 'history'}, {sort: {number: 1}});
	},
	fifth_questions: function () {
		return Questions.find({is_fifth: true, course_en: 'physics'}, {sort: {number: 1}});
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
	},
	'click .submit-test-btn': function (e) {
		e.preventDefault();

		var subjects = [
			'kazakh',
			'russian',
			'math',
			'history',
			'physics',]

		var data = {},
			choices = {},
			len = {},
			results = {};

		for (var i = 0; i < subjects.length; i++) {
			var cur_subject = subjects[i];
			data[cur_subject] = Questions.find({course_en: cur_subject}, {sort: {number: 1}}).fetch(),
			results[cur_subject] = 0;
			choices[cur_subject] = $("div#" + cur_subject + " > form");
			len[cur_subject] = choices[cur_subject].length;
		}

		for (var i = 0; i < subjects.length; i++) {
			var cur_subject = subjects[i];
			console.log(cur_subject);
			for (var j = 0; j < len[cur_subject]; j++) {
				var res = choices[cur_subject].eq(j).find("label > input:radio[name='radgroup']").filter(":checked").val();
				var correct_ans = getAnswer(data[cur_subject][j].answer);
				console.log(res + " BUT " + correct_ans);
				if (res === correct_ans) {
					results[cur_subject]++;
				}
			}
			console.log(cur_subject + " = ", results[cur_subject]);
		}
	}
});