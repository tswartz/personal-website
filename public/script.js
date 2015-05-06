$(document).ready(function() {

	// set icon hover effect for each nav bar item
	$('.nav-bar-item').each(function(index, navBarItem){
		setIconHoverEffect(index, navBarItem);
	});

	$(window).scroll( function () {
        toggleScrollToTopIcon();
	});

});

// Determines if in mobile mode
function inMobileMode() {
	return $('#desktopTest').is(':hidden');
}

// When nav bar item is in hover state, it turns into
// a certain icon (designated by "icon" attribute)
function setIconHoverEffect(index, navBarItem) {
	var navBarItem = $(navBarItem);
	var itemText = navBarItem.text();
	navBarItem.hover(function(){navBarItemMouseIn(this)}, 
		function(){navBarItemMouseOut(this, itemText)});
	var sectionClass = navBarItem.attr('section') + "-section";
	// scroll spy not working consistently
	//scrollSpy(sectionClass, $(navBarItem));
}

// Sets nav bar item text to designated font-awesome icon
function navBarItemMouseIn(navBarItem) {
	if (inMobileMode()) {
		return;
	}
	var navBarItem = $(navBarItem);
	var link = navBarItem.find("a");
	var icon = link.attr("icon");
	navBarItem.css({
		"width" : navBarItem.outerWidth(),
		"text-align" : "center"
	});
	link.addClass("fa");
	link.html(icon);
}

// Sets nav bar item back to original text
function navBarItemMouseOut(navBarItem, navBarItemText) {
	var navBarItem = $(navBarItem);
	var link = $(navBarItem).find("a");
	navBarItem.css({
		"width" : "",
		"text-align": ""
	});
	link.removeClass("fa");
	link.html(navBarItemText);
}

function toggleScrollToTopIcon () {
	var currentScrollHeight = $('body').scrollTop();
	if (currentScrollHeight >= 50) {
        $('.scroll-to-top').addClass('show-scroll-to-top');
    } else {
        $('.scroll-to-top').removeClass('show-scroll-to-top');
    }
}
