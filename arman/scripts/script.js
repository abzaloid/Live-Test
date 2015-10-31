(function($){

	$('.menu-btn').on('click', function() {
		$(this).toggleClass('pressed');
		$('.mobile-navigation').slideToggle(300);
	});

})(jQuery)