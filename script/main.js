$(document).ready(function() {
    $('.later').hide();
    $('a').hover(
	function() {
	    $(this).append($("<span></span>"));
	},
	function() {
	    $(this).find("span:last").remove();
	}
    );
    $('h2').hover(
	// h2のonMouseで
	function() {
	    // 動いてなければ
	    if ($('*').not(':animated')) {
		$(this).parent(".category").children('.later')
		    .animate({opacity:"toggle", "height":"toggle"}, "fast");
	    }
	},
	function() {
	    // 動いてれば
	    if ($('*').not(':animated')) {
		$(this).parent(".category").children('.later')
		    .animate({opacity:"toggle", "height":"toggle"}, "fast");
	    }
	}
    );

});
