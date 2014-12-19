$(document).ready(function() {
	// add loaded class to cover photo text so it can fade in
	$('.cover-photo-text').addClass("loaded");

	// set smooth scroll for each item in nav bar
	$('.nav-bar-item').click(function (e) {
		var sectionClass = $(e.target).attr('section') + "-section";
        smoothScrollTo(getYPosition(sectionClass));
	});

	// set icon hover effect for each nav bar item
	$('.nav-bar-item').each(function(index, element){
		setIconHoverEffect(index, element);
	});

	// if you click on logo, smooth scroll to top
	$('.logo-container').click(function (e) {
		smoothScrollTo(0);
	});

	// set art thumbnail overlay click event- vex popup
	$('.art-thumbnail-overlay').click(function (e) {
		setArtVexPopup(e);
	});

});

function setIconHoverEffect(index, element) {
	var element = $(element);
	var itemText = element.text();
	element.css("width", element.outerWidth());
	element.hover(function(){navBarItemMouseIn(this)}, 
		function(){navBarItemMouseOut(this, itemText)});
	var sectionClass = element.attr('section') + "-section";
	// scroll spy not working consistently
	//scrollSpy(sectionClass, $(element));
}

function navBarItemMouseIn(element) {
	var element = $(element);
	var icon = element.attr("icon");
	element.addClass("fa");
	element.html(icon);
}

function navBarItemMouseOut(element, navBarItemText) {
	var element = $(element);
	element.removeClass("fa");
	element.html(navBarItemText);
}

function setArtVexPopup(e) {
	var target = $(e.target);
	if (target.prop("tagName").toLowerCase() == 'p') {
		target = target.parent();
	}
	var thumbnail = target.parent().find('img.art-thumbnail');
	var vexImage = '<img src="' + thumbnail.attr('pic-src') + '"/>';
	var overlayText = '<div>' + target.text() + ' - ' + thumbnail.attr('art-media') + '</div>';
	if (thumbnail.hasClass('zoomable')) {
		overlayText +=  '<div class="zoomable-text">Hover over image to zoom</div>';
	}
	vex.open({
		showCloseButton: true,
		content: overlayText + '<div class="vex-content-image-container">' + vexImage + '</div>',
		buttons: [],
		afterOpen: function () {
			if (!thumbnail.hasClass('zoomable')) {
				return;
			}

			var myImage = new Image();
			myImage.src = thumbnail.attr('pic-src');

			myImage.onload = function getWidthAndHeight() {
			   	setArtZoom(thumbnail, this.width, this.height);
			    return true;
			};
			myImage.onerror = function loadFailure() {
			    console.log("Image failed to load.");
			    return true;
			};
		}
	});
}

function setArtZoom(thumbnail, width, height) {
	var img = $(".vex-content-image-container img");
	var imgWidth = img.width();
	var imgHeight = img.height();
	var widthRatio = width/imgWidth;
	var heightRatio = height/imgHeight;
	img.mouseenter(function (e) {
		var x = (e.offsetX * widthRatio) - imgWidth;
		var y = (e.offsetY * heightRatio) - imgHeight;
		var background = 'url("' + thumbnail.attr('pic-src') + '")';
		var zoomedImg = $('<img class="zoomed-img"/>');					
		zoomedImg.css({
			'position': 'absolute',
			'max-width': '100%',
			'background': "" + background,
			'background-position-x': '-' + x +'px',
			'background-position-y': '-' + y +'px',
			'width': imgWidth + '',
			'height': imgHeight + '',
			'cursor': 'all-scroll'
		});
		$('.vex-content-image-container').prepend(zoomedImg);
		zoomedImg.mousemove(function (e) {
			var x = (e.offsetX * widthRatio) - imgWidth;
			var y = (e.offsetY * heightRatio) - imgHeight;
			zoomedImg.css('background-position-x', "-" + x + "px");
			zoomedImg.css('background-position-y', "-" + y + "px");
		});
		zoomedImg.mouseleave(function (e) {
			zoomedImg.remove();
		});
	});

	
}

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
    		yPosition += currentSection.outerHeight();
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