// Logger variable. Set to true to turn on logging.
var LOG = true;
// Initialization status variable. Helps elimiate duplicate buttons.
var pinitInitInitialized = false;

LOG && console.debug(new Date().getTime() + "    " + "Visioplanet PinIt Initialization script file is locked and loaded.");

(function() {
  try {
    // In case of insite navigation, document.ready will work.
    $(document).ready(function(){
      LOG && console.debug(new Date().getTime() + "    " + "DOM is ready. Time to start up Pin It.");
      visioplanetPinItInit();
    });
    //$(window).load(function() {
    //  LOG && console.debug(new Date().getTime() + "    " + "Window load is complete. Time to start up Pin It.");
    //  visioplanetPinItInit();
    //});
  } catch(e) {
    console.error(new Date().getTime() + "    " + 'Visioplanet Pinit Initialization Exception: ' + e);
    windowLoadMethod();
  }
})();

function windowLoadMethod() {
  try {
    // If this is a direct post load, document.ready may not work and we will have to use window.load
    $(window).load(function() {
      console.debug(new Date().getTime() + "    " + "Initializing from failsafe.")
      visioplanetPinItInit();
    });
  } catch(e) {
    console.error(new Date().getTime() + "    " + 'Visioplanet Pinit Initialization Exception: ' + e);
  }
}

function visioplanetPinItInit(){
  setTimeout (
    function() {
      LOG && console.debug(new Date().getTime() + "    " + "document status: " + document.readyState);
      if (document.readyState !== 'complete') {
        LOG && console.debug(new Date().getTime() + "    " + "Document's not ready. Waiting...");
        //setTimeout(visioplanetPinItInit,1000);
      } else {
        // The following line will make sure that PinIt button initialization runs only once.
        // So that multiple PinIt buttons don't show up.
        if(pinitInitInitialized == true) {
          LOG && console.debug(new Date().getTime() + "    " + "PinIt initialization already started. Exiting visioplanetPinItInit() to avoid duplicates.");
          return;
        }
        
        // We're gonna wait for sometime and then do our work (URL remains the old one otherwise).
	    LOG && console.debug(new Date().getTime() + "    " + "Let's begin PinIt Initialization...");
        // We're gonna put the button on top of the image at the top right corner of it.
        // For that, we'd have to check the width of the image.

        pinitInitInitialized = true;
        var imgURL = "";
        var img = new Image();
        
        $("img").each(
          function(){
            var theWidth = 0;
            var theHeight = 0;
            img.src = $(this).attr('src');

            theWidth = img.width;
            theHeight = img.height;

            //LOG && console.debug(new Date().getTime() + "    " + $(this).attr("src") + ": " + theWidth + "x" + theHeight);
            if((theWidth >= 400) || (theHeight >= 400)) {
              imgURL = $(this).attr("src");
              LOG && console.debug(new Date().getTime() + "    " + "Got the image URL: " + imgURL);
              return false;
              LOG && console.debug(new Date().getTime() + "    " + "This line shouldn't come up.");
            }
        });

        var htmlStr = "<span style=\"display: inline-block; margin: 0; width: 100px\"><a data-pin-config='beside' data-pin-do='buttonPin' class='visioplanetPinItButton' count-layout='horizontal' href='http://pinterest.com/pin/create/button/?url=";
        htmlStr += encodeURIComponent(document.location);		// URL was already encoded in IE 8.
        htmlStr += "&amp;media=";
        htmlStr += encodeURIComponent(imgURL);
        htmlStr += "&amp;description=";
        htmlStr += encodeURIComponent(document.title);
        htmlStr += "'><img border='0' src='//assets.pinterest.com/images/pidgets/pin_it_button.png' title='Pin It'/></a></span>";

        LOG && console.debug(new Date().getTime() + "    " + "The tag's as follows:\n\n" + htmlStr);

        if($(".share-pinterest-visioplanet").length == 0) {
          // As in add it to the DOM only if it isn't already there.
          // This should definitively end the duplication issue.

          $(htmlStr).insertAfter("span.share-facebook.delay");
          $(htmlStr).insertAfter("#overview .overview-panel.current .overview-wrap .overview-inner .overview-header .share-controls.delay .delay");

          // We're placing this button right after the +1 button.
          $("a.visioplanetPinItButton").css("z-index", 1000);
          
          // Now loading up the pinit.js script to deal with the a link created above.
          (function(d){
            var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
            p.type = 'text/javascript';
            p.async = true;
            p.src = '//assets.pinterest.com/js/pinit.js';
            f.parentNode.insertBefore(p, f);
          }(document));
        } else {
          LOG && console.debug("Duplication averted. You're welcome!");
        }
      }
      LOG && console.debug(new Date().getTime() + "\n\n\n\n\n");
    }
  , 1000);
}
