function getAnswer (s) {

	answer = "ABCDE";

	for (var i = 0; i < answer.length; i++) {
		if (s.indexOf(answer[i]) > -1) {
			return answer[i];
		}
	}

	return -1;

}

var m_user;
data = {};

var choices = {},
	len = {},
	results = {};

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
		m_user = OUsers.findOne({email: Meteor.user().emails[0].address})
		console.log(m_user)
		var language = "kazakh";
		if ("kaz".indexOf(m_user.language) == -1)
			language = "russian";
		var variant = (new Date()) % 2 + 1;
		var course = 'kazakh';
		var tests = Tests.findOne({email: m_user.email, course_en: course});
		if (tests) {
			console.log('WORKS');
			return data[course] = Questions.find({course_en: course, variant: tests.variant, language: language});
		}
		data[course] = Questions.find({course_en: course, language: language, variant: variant}, {sort: {number: 1}});
		Tests.insert({email: m_user.email, course_en: course, language: language, variant: variant});
		return data[course];
	},
	russian_questions: function () {
		m_user = OUsers.findOne({email: Meteor.user().emails[0].address})
		console.log(m_user)
		var language = "kazakh";
		if ("kaz".indexOf(m_user.language) == -1)
			language = "russian";
		var variant = (new Date()) % 2 + 1;
		var course = 'russian';
		var tests = Tests.findOne({email: m_user.email, course_en: course});
		if (tests) {
			return data[course] = Questions.find({course_en: course, variant: tests.variant, language: language});
		}
		data[course] = Questions.find({course_en: course, language: language, variant: variant}, {sort: {number: 1}});
		Tests.insert({email: m_user.email, course_en: course, language: language, variant: variant});
		return data[course];
	},
	math_questions: function () {
		m_user = OUsers.findOne({email: Meteor.user().emails[0].address})
		console.log(m_user)
		var language = "kazakh";
		if ("kaz".indexOf(m_user.language) == -1)
			language = "russian";
		var variant = (new Date()) % 2 + 1;
		var course = 'math';
		var tests = Tests.findOne({email: m_user.email, course_en: course});
		if (tests) {
			return data[course] = Questions.find({course_en: course, variant: tests.variant, language: language});
		}
		data[course] = Questions.find({course_en: course, language: language, variant: variant}, {sort: {number: 1}});
		Tests.insert({email: m_user.email, course_en: course, language: language, variant: variant});
		return data[course];
	},
	history_questions: function () {
		m_user = OUsers.findOne({email: Meteor.user().emails[0].address})
		console.log(m_user)
		var language = "kazakh";
		if ("kaz".indexOf(m_user.language) == -1)
			language = "russian";
		var variant = (new Date()) % 2 + 1;
		var course = 'history';
		var tests = Tests.findOne({email: m_user.email, course_en: course});
		if (tests) {
			return data[course] = Questions.find({course_en: course, variant: tests.variant, language: language});
		}
		data[course] = Questions.find({course_en: course, language: language, variant: variant}, {sort: {number: 1}});
		Tests.insert({email: m_user.email, course_en: course, language: language, variant: variant});
		return data[course];
	},
	fifth_questions: function () {
		m_user = OUsers.findOne({email: Meteor.user().emails[0].address})
		console.log(m_user)
		var language = "kazakh";
		if ("kaz".indexOf(m_user.language) == -1)
			language = "russian";
		var variant = (new Date()) % 2 + 1;
		var user_subject = OUsers.findOne({email: Meteor.user().emails[0].address}).subject;
		var course = user_subject;
		var tests = Tests.findOne({email: m_user.email, course_en: course});
		if (tests) {
			return data[course] = Questions.find({course_en: course, variant: tests.variant, language: language});
		}
		data[course] = Questions.find({course_en: course, language: language, variant: variant}, {sort: {number: 1}});
		Tests.insert({email: m_user.email, course_en: course, language: language, variant: variant});
		return data[course];

	},
	user_name: function () {
		m_user = OUsers.findOne({email: Meteor.user().emails[0].address})
		console.log(m_user)
		if (Meteor.user()) {
			return OUsers.findOne({email: Meteor.user().emails[0].address});
		} else {
			return "";
		}
	},
	fifth: function () {
		m_user = OUsers.findOne({email: Meteor.user().emails[0].address})
		console.log(m_user)
		return m_user.subject;
	},
	result: function () {
		if (Results.findOne({email: Meteor.user().emails[0].address})) {
			return true;
		}
		return false;
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
		$("#"+$this.attr('data-for').split('-')[1]).show();

	},
	'click input:radio[name="radgroup"]': function (e) {
		var $this = $(e.target);
		console.log($this.filter(":checked").val());
		console.log(Meteor.userId() + $this.parent().parent().attr('id'));
		SessionAmplify.set(Meteor.userId() + $this.parent().parent().attr('id'), $this.filter(":checked").val());
	},
	'click .submit-test-btn': function (e) {
		e.preventDefault();

		$("#m_spinner").show();

		m_user = OUsers.findOne({email: Meteor.user().emails[0].address})

		var user_subject = OUsers.findOne({email: Meteor.user().emails[0].address}).subject;

		if (Results.findOne({email: m_user.email})) {
			// already submitted
			Notifications.error('Вы уже закончили этот вариант ЕНТ!', 'Просим дождаться следующего ЕНТ и вы можете прослеживать результаты других и сравнивать себя');
			$("#m_spinner").hide();
			Router.go('cabinet');
			return;
		}

		var subjects = [
			'kazakh',
			'russian',
			'math',
			'history',
			user_subject,]

		for (var i = 0; i < subjects.length; i++) {
			var cur_subject = subjects[i];
			results[cur_subject] = 0;
			choices[cur_subject] = $("div#" + cur_subject + " > form");
			len[cur_subject] = choices[cur_subject].length;
		}

		console.log("DATA = " + data);

		var total = 0;

		for (var i = 0; i < subjects.length; i++) {
			var cur_subject = subjects[i];
			console.log(cur_subject);
			var m_data = data[cur_subject].fetch();
			for (var j = 0; j < len[cur_subject]; j++) {
				var res = choices[cur_subject].eq(j).find("label > input:radio[name='radgroup']").filter(":checked").val();
				var correct_ans = getAnswer(m_data[j].answer);
				console.log(res + " BUT " + correct_ans);
				if (res === correct_ans) {
					results[cur_subject]++;
				}
			}
			total += results[cur_subject];
			console.log(cur_subject + " = ", results[cur_subject]);
		}

		var ru = {
			'biology' : 'Биология',
			'chemistry': 'Химия',
			'english': 'Английский',
			'geography': 'География', 
			'history': 'История Казахстана',
			'kazakh': 'Қазақ тілі',
			'literature': 'Литература',
			'math': 'Математика',
			'physics': 'Физика',
			'russian': 'Русский язык',
			'world_history': 'Всемирная история',
			};


		Results.insert({
			email: m_user.email,
			name: m_user.name,
			surname: m_user.surname,
			added: new Date(),
			fifth: ru[user_subject],
			kazakh: results['kazakh'],
			russian: results['russian'],
			math: results['math'],
			history: results['history'],
			subject: results[user_subject],
			total: total,
			language: m_user.language,
			region: m_user.region,					
		});


		$("#m_spinner").hide();

		Router.go('cabinet');

	}
});