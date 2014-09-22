$(document).ready(function() {
	$('.nav-bar-item').click(function (e) {
		var sectionClass = $(e.target).attr('section') + "-section";
        smoothScrollTo(getYPosition(sectionClass));
	});

	$('.nav-bar-item').each(function(index, element){
		var sectionClass = $(element).attr('section') + "-section";
		//scrollSpy(sectionClass, $(element));
	});

	$('.logo').click(function (e) {
		smoothScrollTo(0);
	});

	$('.art-thumbnail-overlay').click(function (e) {
		var target = $(e.target);
		if (target.prop("tagName").toLowerCase() == 'p') {
			target = target.parent();
		}
		var thumbnail = target.parent().find('img.art-thumbnail');
		var vexImage = '<img src="' + thumbnail.attr('pic-src') + '"/>';
		var overlayText = '<div>' + target.text() + ' - ' + thumbnail.attr('art-media') + '</div>';
		vex.open({
			showCloseButton: true,
			content: overlayText + '<div class="vex-content-image-container">' + vexImage + '</div>',
			buttons: []
		});
	});

	$('.file-download a').click(function (e) {
		$('#resume-download-form').submit()
	});

});

// gets the y position of a section
function getYPosition(sectionClass) {
    if ($('.' + sectionClass).length == 0) {
    	return 0;
    }
    var yPosition = 0;
    var sections = $('.content').children();
    for (var i = 0; i < sections.length; i++) {
    	var currentSection = $(sections.get(i));
    	if (currentSection.hasClass(sectionClass)) {
    		return yPosition;
    	} else {
    		yPosition += currentSection.height()
    	}
    }
}

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

function smoothScrollTo(scrollTop) {
	$('html,body').animate({
      scrollTop: scrollTop
    }, 1000);
}