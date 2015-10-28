Template.register.rendered = function () {
	$("body").removeClass('test-body').addClass('register-body');
	$("html").removeClass("test");
	$("head > title").val("Регистрация");
}