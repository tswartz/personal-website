// Opens vex popup with full image displayed and
// sets up zoom for zoomable images
function openVexPopup(attrs, vexImage, overlayText) {
	vex.open({
		showCloseButton: true,
		content: overlayText + '<div class="vex-content-image-container">' + vexImage + '</div>',
		buttons: [],
		afterOpen: function () {
			if (!attrs['zoomable']) {
				return;
			}
			var myImage = new Image();
			myImage.src = 'art/' + attrs['pic-src'];

			myImage.onload = function getWidthAndHeight() {
			   	setArtZoom(attrs, this.width, this.height);
			    return true;
			};
			myImage.onerror = function loadFailure() {
			    console.log("Image failed to load.");
			    return true;
			};
		}
	});
}

// Sets up zooming when hovering over full art image
function setArtZoom(attrs, width, height) {
	var img = $(".vex-content-image-container img");
	var imgWidth = img.width();
	var imgHeight = img.height();
	var widthRatio = width/imgWidth;
	var heightRatio = height/imgHeight;
	img.mouseenter(function (e) {
		var x = (e.offsetX * widthRatio) - imgWidth;
		var y = (e.offsetY * heightRatio) - imgHeight;
		var background = 'url("art/' + attrs['pic-src'] + '")';
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