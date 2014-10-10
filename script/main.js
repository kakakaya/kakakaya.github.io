$(function() {
    $('.later').hide();
    $('a').hover(
	function() {
	    $(this).append($("<span> </span>"));
	},
	function() {
	    $(this).find("span:last").remove();
	}
    );
    $('h2').hover(
	function() {
	    if ($('*').not(':animated')) {
		$(this).parent(".category").children('.later')
		    .animate({opacity:"toggle", "height":"toggle"}, "fast");
	    }
	},
	function() {
	    if ($('*').not(':animated')) {
	    $(this).parent(".category").children('.later')
		.animate({opacity:"toggle", "height":"toggle"}, "fast");
	    }
	}
    );

});
