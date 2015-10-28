Template.enter.rendered = function () {
	$("body").removeClass('test-body').addClass('register-body');
	$("html").removeClass("test");
	$("head > title").text("Войти | StudySpace");
}

Template.enter.events({
	'click input[type="submit"]': function (e) {
		e.preventDefault();
		var email = $("input[type='email']").val(),
			passw = $("input[type='password']").val();

		Meteor.loginWithPassword(email, passw, function(err){
	        if (err) {
	        	Notifications.error('Неправильные данныйе', 'Пожалуйста, введите правильные данные!');
	        }
	        else {
	        	// Notifications.success('Успешный вход!', 'Удачи на ЕНТ!');
	        	Router.go('home');
	        }
      	});
	}
});