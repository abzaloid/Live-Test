Template.register.rendered = function () {
	$("body").removeClass('test-body').addClass('register-body');
	$("html").removeClass("test");
	$("head > title").text("Регистрация | StudySpace");
}

Template.register.events({
	'click input[type="submit"]': function (e) {
		e.preventDefault();

		var email = $("input[type='email']").val(),
			pw1 = $("#pw1").val(),
			pw2 = $("#pw2").val(),
			name = $("#_name").val(),
			surname = $("#_surname").val(),
			subject = $("select[name='subject']").val(),
			language = $("input[name='lang']").val(),
			region = $("select[name='region']").val();

		if (!name || !surname || !subject || !language || !region || !email || !pw1) {
			Notifications.error('Не все поля заполнены!', 'Пожалуйста, заполните все поля');
			return;
		}

		if (pw1 !== pw2) {
			Notifications.error('Пароли не совпадают!', 'Проверьте правильность паролей');
			return;
		}

		if (pw1.length < 6) {
			Notifications.error('Пароли слишком короткий!', 'Пожалуйста, используйте пароль минимум длины 6');
			return;
		}

		Accounts.createUser({email: email, 
			password: pw1, 
		}, function(err){
	        if (err) {
	        	Notifications.error('Ошибка', 'Данные уже присутствуют в системе');
	        } else {
	        	console.log('registered and logged in');
	        	Notifications.success('Вы зарегистрированы!', 'Поздравляем и удачи на ЕНТ!');
				OUsers.insert({
					email: email, 
					name: name,
					surname: surname,
					language: language,
					region: region,
					subject: subject,
				});
				Router.go('home');
	        }
    	});

	}
});

Template.register.helpers({
	regions: function () {
		return Regions.find();
	}
});