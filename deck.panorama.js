/*!
Deck JS - deck.navigation
Copyright (c) 2011-2014 Caleb Troughton
Dual licensed under the MIT license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
*/

/*
This module creates a panorama-background, known from the Android System.
*/
(function($, undefined) {
	var $document = $(document);

	var moveBackground = function(forward, tiles) {
		var px = $.deck('getOptions').backgroundMovementWidth * tiles;
		if (forward)
			px *= -1;
		$('.bg').finish();
		$('.bg').each(function(){
		  $(this).animate({
			left: "-="+px
		  }, 500);
		});
	};
	
	var findBackgroundIndex = function(realIdx) {
		var slideCount= $.deck('getSlides').length;
		var slides = $.deck('getSlides');
		var options = $.deck('getOptions');
		var slidecnt = 0;
		for (i = 0; i < realIdx; i++) {
			var slide = slides[i];
			var isSub = slide.closest('.' + options.classes.childCurrent).length;
			if (!isSub)
				slidecnt++;
		}
		return slidecnt;
	};
	
	var prepareBackgroundMove = function() {
		var slideCount= $.deck('getSlides').length;
		var slides = $.deck('getSlides');
		var options = $.deck('getOptions');
		var slidecnt = 0;
		for (i = 0; i < slideCount; i++) {
			var slide = slides[i];
			var isSub = slide.closest('.' + options.classes.childCurrent).length;
			if (!isSub)
				slidecnt++;
		}		
		var slideMoveWidth = $(window).width(); /* for the 200% */
		options.backgroundMovementWidth = slideMoveWidth / slidecnt;
	};

	var moveBackgroundRes = function(currentIndex, idx) {
		var slides = $.deck('getSlides');
		var options = $.deck('getOptions');
		if (idx > currentIndex && currentIndex > 1) {
			var slide = slides[idx];
			var isSub = slide.closest('.' + options.classes.childCurrent).length;
			if (!isSub) {
				moveBackground(false, idx-currentIndex);
			}
		} else if (idx < currentIndex) {
			var slide = slides[idx];
			if (slide != null) {
				var isSub = slide.closest('.' + options.classes.childCurrent).length;
				var slide2 = slides[currentIndex];
				var isSub2 = slide2.closest('.' + options.classes.childCurrent).length;
				if (!isSub && !isSub2) {
					moveBackground(true, currentIndex-idx);
				}
			} else {
				moveBackground(true, currentIndex-idx);
			}
		} else if (currentIndex == 0 && idx != 0) {
			moveBackground(false, idx);
		}
	};
  
	
	$document.bind('deck.init', function(opts) {
		prepareBackgroundMove();
	});
	$document.bind('deck.change', function(event, currentIndex, index) {
		moveBackgroundRes(currentIndex, index);
	});
})(jQuery);

