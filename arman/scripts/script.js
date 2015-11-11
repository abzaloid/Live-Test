(function($){

	$('.menu-btn').on('click', function() {
		$(this).toggleClass('pressed');
		$('.mobile-navigation').slideToggle(300);
	});

})(jQuery);

(function($) {
	$('.tab-item').on('click', function(e) {
		e.preventDefault();
		var sectionToShow = $(this).data('target');
		$(this).addClass('active').siblings().removeClass('active');
		$('.tab-content').eq(parseInt(sectionToShow)).show().siblings('.tab-content').hide();
	})
})(jQuery);

(function($) {
	var $selectedTest = $(".selected-test");
	$selectedTest.on('click', function() {
		$(this).toggleClass('clicked');
		$(".dropdown-list").fadeToggle(300);
	});

	$selectedTest.siblings('ul').find('li').on('click', function() {
		$('.dropdown-list').fadeToggle(300);
		$selectedTest.html($(this).html());
		$selectedTest.removeClass('clicked');
	});
})(jQuery);