/*!
 * iglaze
 * 
 * 
 * @author Greg Clinton
 * @version 1.0.0
 * Copyright 2017. MIT licensed.
 */
/* global jQuery, PhotoSwipe, PhotoSwipeUI_Default, console */
(function($){
  // Init empty gallery array
  var container = [];
  // Loop over gallery items and push it to the array
  $('#gallery').find('figure').each(function(){
    var $link = $(this).find('a'),
        item = {
          src: $link.attr('href'),
          w: $link.data('width'),
          h: $link.data('height'),
          title: $link.data('caption')
        };
    container.push(item);
  });
  // Define click event on gallery item
  $('figure').click(function(event){
    // Prevent location change
    event.preventDefault();
    // Define object and gallery options
    var $pswp = $('.pswp')[0],
        options = {
          index: $(this).parent('figure').index(),
          bgOpacity: 0.85,
          showHideOpacity: true
        };
    // Initialize PhotoSwipe
    var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container, options);
    gallery.init();
  });
}(jQuery));

// contact form
$(document).ready(function() {
		$('form#contact-us').submit(function() {
			$('form#contact-us .error').remove();
			var hasError = false;
			$('.requiredField').each(function() {
				if($.trim($(this).val()) == '') {
					var labelText = $(this).prev('label').text();
					$(this).parent().append('<span class="error">Your forgot to enter your '+labelText+'.</span>');
					$(this).addClass('inputError');
					hasError = true;
				} else if($(this).hasClass('email')) {
					var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					if(!emailReg.test($.trim($(this).val()))) {
						var labelText = $(this).prev('label').text();
						$(this).parent().append('<span class="error">Sorry! You\'ve entered an invalid '+labelText+'.</span>');
						$(this).addClass('inputError');
						hasError = true;
					}
				}
			});
			if(!hasError) {
				var formInput = $(this).serialize();
				$.post($(this).attr('action'),formInput, function(data){
					$('form#contact-us').slideUp("fast", function() {
						$(this).before('<p class="tick">Thanks! Your email has been delivered. <br> We will get back to you as soon as possible </p>');
					});
				});
			}

			return false;
		});
	});
