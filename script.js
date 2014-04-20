$(document).ready(function() {
	$('.cover-photo-text').addClass('show-cover-photo-text');

	$('.nav-bar-item').click(function (e) {
		var sectionClass = $(e.target).attr('section') + "-section";
		window.scrollTo(0,getYPosition(sectionClass));
	});

	$('.logo').click(function (e) {
		window.scrollTo(0,0);
	});

	$('.art-thumbnail-overlay').click(function (e) {
		var target = $(e.target);
		var thumbnail = target.parent().find('img.art-thumbnail');
		var vexImage = '<img src="' + thumbnail.attr('pic-src') + '"/>';
		var overlayText = '<div>' + target.text() + '</div>';
		vex.open({
			showCloseButton: true,
			content: overlayText + '<div class="vex-content-image-container">' + vexImage + '</div>',
			buttons: []
		});
	});

	$('.file-download *').click(function (e) {
		$('#resume-download-form').submit()
	});

	$('.file-download *').mouseover(function (e) {
		$('.file-download img').attr('src', 'link-icons/download_hover.png');
		$('.file-download *').css('color', 'white');
	});

	$('.file-download *').mouseout(function (e) {
		$('.file-download img').attr('src', 'link-icons/download.png')
		$('.file-download *').css('color', 'cyan');
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