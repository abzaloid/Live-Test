Template.no_access.rendered = function () {
	Notifications.error('Ошибка', 'Пожалуйста, ввойдите в систему');
	Router.go('home');
}