$(document).ready(function() {
	// add loaded class to cover photo text so it can fade in
	$('.cover-photo-text').addClass("loaded");

	// set smooth scroll for each item in nav bar
	$('.nav-bar-item').click(function (e) {
		var sectionClass = $(e.target).attr('section') + "-section";
        smoothScrollTo(getYPosition(sectionClass));
	});

	// set icon hover effect for each nav bar item
	$('.nav-bar-item').each(function(index, navBarItem){
		setIconHoverEffect(index, navBarItem);
	});

	// if you click on logo, smooth scroll to top
	$('.logo').click(function (e) {
		smoothScrollTo(0);
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

// gets the y position of a section
function getYPosition(sectionClass) {
    if ($('.' + sectionClass).length == 0) {
    	return 0;
    }
    var yPosition = 0;
    var sections = $('main').children();
    for (var i = 0; i < sections.length; i++) {
    	var currentSection = $(sections.get(i));
    	if (currentSection.hasClass(sectionClass)) {
    		return yPosition;
    	} else {
    		yPosition += currentSection.outerHeight();
    	}
    }
}

// Highlights nav bar item when viewing corresponding section
function scrollSpy(sectionClass, navItem) {
	var section = $('.' + sectionClass);
	var position = section.position();
	console.log(section, position);
	section.scrollspy({
		min: position.top,
    	max: position.top + section.outerHeight(),
	    onEnter: function(element, position) {
	        navItem.addClass('selected');
	    },
	    onLeave: function(element, position) {
	        navItem.removeClass('selected');
	    }
	});
}

// Scrolls to given y-position (scrollTop)
// If in mobile mode, collapse nav
function smoothScrollTo(scrollTop) {
	// if in mobile mode and not clicking on logo
	if (inMobileMode() && scrollTop!=0) {
		$('button.navbar-toggle').click();
	}

	console.log(scrollTop);

	$('html,body').animate({
      scrollTop: scrollTop
    }, 1000);
}