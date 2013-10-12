// Logger variable. Set to true to turn on logging.
var LOG = true;
// Initialization status variable. Helps elimiate duplicate buttons.
var pinitInitInitialized = false;

(function() {
  try {
    // In case of insite navigation, document.ready will work.
    $(document).ready(function(){
      LOG && console.debug("DOM is ready. Time to start up Pin It.");
      visioplanetPinItInit();
    });
    $(window).load(function() {
      LOG && console.debug("Window load is complete. Time to start up Pin It.");
      visioplanetPinItInit();
    });
  } catch(e) {
    console.error('Visioplanet Pinit Initialization Exception: ' + e);
    windowLoadMethod();
  }
})();

function windowLoadMethod() {
  try {
    // If this is a direct post load, document.ready may not work and we will have to use window.load
    $(window).load(function() {
      visioplanetPinItInit();
    });
  } catch(e) {
    console.error('Visioplanet Pinit Initialization Exception: ' + e);
  }
}

function visioplanetPinItInit(){
  setTimeout (
    function() {
      LOG && console.debug("document status: " + document.readyState);
      if (document.readyState !== 'complete') {
        LOG && console.debug("Document's not ready. Waiting...");
        //setTimeout(visioplanetPinItInit,1000);
      } else {
        // The following line will make sure that PinIt button initialization runs only once.
        // So that multiple PinIt buttons don't show up.
        if(pinitInitInitialized == true) {
          LOG && console.debug("PinIt initialization already started. Exiting visioplanetPinItInit() to avoid duplicates.");
          return;
        }
        
        // We're gonna wait for sometime and then do our work (URL remains the old one otherwise).
	    LOG && console.debug("Let's begin PinIt Initialization...");
        // We're gonna put the button on top of the image at the top right corner of it.
        // For that, we'd have to check the width of the image.

        pinitInitInitialized = true;
        var imgURL = "";
        var img = new Image();
        
        $("img").each(
          function(){
            var theWidth = 0;
            var theHeight = 0;
            $(img).attr("src", $(this).attr('src')).load(
              function() {
                theWidth = this.width;
                theHeight = this.height;
                LOG && console.debug(this.width + "x" + this.height);
            });
            
            theWidth = $(img).width();
            theHeight = $(img).height();

            LOG && console.debug($(this).attr("src") + ": " + theWidth + "x" + theHeight);
            if((theWidth >= 400) || (theHeight >= 400)) {
              imgURL = $(this).attr("src");
              LOG && console.debug("Got the image URL: " + imgURL);
              return false;
              LOG && console.debug("This line shouldn't come up.");
            }
        });

        var htmlStr = "<a data-pin-config='beside' data-pin-do='buttonPin' class='visioplanetPinItButton' count-layout='horizontal' href='http://pinterest.com/pin/create/button/?url=";
        htmlStr += document.location;		// URL was already encoded in IE 8.
        htmlStr += "&amp;media=";
        htmlStr += imgURL;
        htmlStr += "'><img border='0' src='http://assets.pinterest.com/images/PinExt.png' title='Pin It'/></a>";

        LOG && console.debug("The tag's as follows:\n\n" + htmlStr);

        $(htmlStr).insertAfter("span.share-facebook.delay");
        // We're placing this button right after the +1 button.
        $("a.visioplanetPinItButton").css("z-index", 1000);
      }
    }
  , 1000);
}
