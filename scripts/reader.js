// Test if extension works on chrome webpage
console.log("Accessibility Rocks!");

// Ensure that the web page has fully loaded and is ready for scripts
$(document).ready( function () {
    // Once web page is loaded: indicate when the mouse hovers over the elements on the page:
    // Attach this hover event for all the DOM elements on the page, except the body */
    $("*:not(body)").hover(
        /* Call this function on element when mouse hovers over */
        function (ev) {
            $(".highlight").removeClass("highlight");
            // add red border to the element from css highlight
            $(this).addClass("highlight");
            // only want the first element to trigger the outline
            ev.stopPropagation();
          
              // read element content only when a key is pressed
            $(".highlight").keydown(function (e) {

                // Prevent page from moving when spacebar is pressed
                e.preventDefault(); // using prevent default to take over spacebar

                // if spacebar is pressed, produce speech
                if (e.keyCode == 0 || e.keyCode == 32) {
                    // if image, read alt text if available
                    if ( $(".highlight").attr('alt') ) { 
                        var alttext = $(".highlight").attr("alt");
                        speechSynthesis.speak(new SpeechSynthesisUtterance(alttext));
                    }
                    // if image, read source if alt text is NOT available
                    else if ( $(".highlight").attr('src') ) { 
                        var srcofimg = $(".highlight").attr("src");
                        speechSynthesis.speak(new SpeechSynthesisUtterance(srcofimg));
                    }
                    // if not image, read text
                    else {
                        var elementToText = $(".highlight").text();
                        speechSynthesis.speak(new SpeechSynthesisUtterance(elementToText));
                    }
                }
            });
        },

        /* Call this function on element when mouse STOP hovering over */
        function (ev) {
            // remove red-border highlight from the element
            $(this).removeClass("highlight");
            // stop producing speech
            speechSynthesis.cancel();
        }
    )

});