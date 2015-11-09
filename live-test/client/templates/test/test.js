var clock = 210 * 60 * 60;
var m_user;
var MAX_VARIANT = parseInt(Questions.findOne({}, {sort: {variant: -1}}).variant);
var choices = {},
	len = {},
	results = {};

data = {};

function getUser () {
	return OUsers.findOne({email: Meteor.user().emails[0].address});
}

var timeLeft = function() {
	Meteor.call("getServerTime", Meteor.userId(), Session.get('test_id'), function (error, result) {
        Session.set(Meteor.userId() + Session.get('test_id') + "time", result);            
    });
    if (Session.get(Meteor.userId() + Session.get('test_id') + 'time') <= 0) {
    	submit_ent();
    	Meteor.clearInterval(interval);
    }
};

var interval;

function getAnswer (s) {
	answer = "ABCDE";
	for (var i = 0; i < answer.length; i++) {
		if (s.indexOf(answer[i]) > -1) {
			return answer[i];
		}
	}
	return -1;
}

function getVariant() {
	return (new Date()) % MAX_VARIANT + 1;
}

function isLoggedIn (m_user) {
	if (!m_user) {
		Notifications.error('Пожалуйста, войдите в систему', 'Зарегистрируйтесь или залогиньтесь');
		Router.go('home');
	}
}

function randomQuestionsGenerator (course) {
	m_user = getUser();	
		
	isLoggedIn(m_user);

	if (course === 'fifth') {
		course = m_user.subject;
	}
	var language = "kazakh";
	if ("kaz".indexOf(m_user.language) == -1)
		language = "russian";
	var variant = getVariant();
	var tests = Tests.findOne({email: m_user.email, course_en: course, test_id: Session.get('test_id')});
	if (tests) {
		return data[course] = Questions.find({course_en: course, variant: tests.variant, language: language});
	}
	data[course] = Questions.find({course_en: course, language: language, variant: variant}, {sort: {number: 1}});
	Tests.insert({email: m_user.email, course_en: course, language: language, variant: variant});
	return data[course];
} 

Template.test.rendered = function () {
	$("head > title").text("Онлайн ЕНТ # " + Session.get('test_id') + "| StudySpace");
	$("body").removeClass("register-body").addClass("test-body");
	$("html").addClass('test');

	$(".test-questions > div").hide();
	$("div#kazakh").show();

	var $form = $("form");
	var f_len = $form.length;

	for (var i = 0; i < f_len; i++) {
		var c_id = $form.eq(i).attr('id');
		var possible_ans = SessionAmplify.get(Meteor.userId() + Session.get('test_id') + c_id);
		if (possible_ans) {
			console.log(possible_ans);
			$("form#"+c_id+" > label > input:radio[name='radgroup'][value='"+possible_ans+"']").attr('checked', true);
		}
	}

	interval = Meteor.setInterval(timeLeft, 1000);

}



Template.test.helpers({
	time: function () {
		return Session.get(Meteor.userId() + Session.get('test_id') + 'time');
	},
	kazakh_questions: function () {
		return randomQuestionsGenerator('kazakh');
	},
	russian_questions: function () {
		return randomQuestionsGenerator('russian');
	},
	math_questions: function () {
		return randomQuestionsGenerator('math');
	},
	history_questions: function () {
		return randomQuestionsGenerator('history');
	},
	fifth_questions: function () {
		return randomQuestionsGenerator('fifth');
	},
	user_name: function () {
		isLoggedIn();
		if (Meteor.user()) {
			return getUser();
		} else {
			return null;
		}
	},
	fifth: function () {
		return getUser().subject;
	},
	result: function () {
		if (Results.findOne({email: Meteor.user().emails[0].address})) {
			return true;
		}
		return null;
	}
});

Template.test.events({
	"click .test-navigation__item": function (e) {
		e.preventDefault();
		var $this = $(e.target);
		$(".test-navigation__item").parent().children().removeClass('active');
		$this.addClass('active');
		$(".test-questions > div").hide();
		$("#"+$this.attr('data-for').split('-')[1]).show();
	},
	'click input:radio[name="radgroup"]': function (e) {
		var $this = $(e.target);
		SessionAmplify.set(Meteor.userId() + Session.get('test_id') + $this.parent().parent().attr('id'), $this.filter(":checked").val());
	},
	'click .submit-test-btn': function (e) {
		e.preventDefault();
		submit_ent();
	}
});



function submit_ent () {
	$("#m_spinner").show();

		m_user = getUser();

		var user_subject = m_user.subject;

		if (Results.findOne({email: m_user.email})) {
			// already submitted
			Notifications.error('Вы уже закончили этот вариант ЕНТ!', 'Просим дождаться следующего ЕНТ и вы можете прослеживать результаты других и сравнивать себя');
			$("#m_spinner").hide();
//			Router.go('cabinet');
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

		var total = 0;

		for (var i = 0; i < subjects.length; i++) {
			var cur_subject = subjects[i];
			var m_data = data[cur_subject].fetch();
			for (var j = 0; j < len[cur_subject]; j++) {
				var res = choices[cur_subject].eq(j).find("label > input:radio[name='radgroup']").filter(":checked").val();
				var correct_ans = getAnswer(m_data[j].answer);
				if (res === correct_ans) {
					results[cur_subject]++;
				}
			}
			total += results[cur_subject];
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
			variant: Session.get('test_id'),					
		});


		$("#m_spinner").hide();

		Router.go('cabinet');

}

