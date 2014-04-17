/**
 * jQuery photoframe plugin
 * Download by http://sc.xueit.com
 * Copyright (c) 201006 surfsky
 * Free to use but don't modify this notation
 * @author surfsky.cnblogs.com
 * @version 0.1
 */
(function($) {
  defaults  = {
    direction : 'all',            // photo frame direction: all, top, bottom, left, right, topLeft, topRight, bottomLeft, bottomRight
    wrapperClass : 'photoframe'   // wrapper class name
  };
  
  // wrapper target with table
  $.fn.photoFrame = function(settings){
    var options = $.extend({}, defaults, settings);
    this.each(function(){
      // create wrapper tag
      var wrapper;
      switch (options.direction)
      {
        case 'all':
          wrapper =  "<div><table class='{className}' border='0' cellpadding='0' cellspacing='0'>";
          wrapper += "<tr><td class='tl'></td><td class='t'></td><td class='tr'></td></tr>";
          wrapper += "<tr><td class='l'></td><td class='m'></td><td class='r'></td></tr>";
          wrapper += "<tr><td class='bl'></td><td class='b'></td><td class='br'></td></tr>";
          wrapper += "</table></div>";
          break;
        case 'top':
          wrapper =  "<div><table class='{className}' border='0' cellpadding='0' cellspacing='0'>";
          wrapper += "<tr><td class='tl'></td><td class='t'></td><td class='tr'></td></tr>";
          wrapper += "<tr><td class='l'></td><td class='m'></td><td class='r'></td></tr>";
          wrapper += "</table></div>";
          break;
        case 'bottom':
          wrapper =  "<div><table class='{className}' border='0' cellpadding='0' cellspacing='0'>";
          wrapper += "<tr><td class='l'></td><td class='m'></td><td class='r'></td></tr>";
          wrapper += "<tr><td class='bl'></td><td class='b'></td><td class='br'></td></tr>";
          wrapper += "</table></div>";
          break;
        case 'left':
          wrapper =  "<div><table class='{className}' border='0' cellpadding='0' cellspacing='0'>";
          wrapper += "<tr><td class='tl'></td><td class='t'></td></tr>";
          wrapper += "<tr><td class='l'></td><td class='m'></td></tr>";
          wrapper += "<tr><td class='bl'></td><td class='b'></td></tr>";
          wrapper += "</table></div>";
          break;
        case 'right':
          wrapper =  "<div><table class='{className}' border='0' cellpadding='0' cellspacing='0'>";
          wrapper += "<td class='t'></td><td class='tr'></td></tr>";
          wrapper += "</td><td class='m'></td><td class='r'></td></tr>";
          wrapper += "</td><td class='b'></td><td class='br'></td></tr>";
          wrapper += "</table></div>";
          break;
        case 'topLeft':
          wrapper  = "<div><table class='{className}' border='0' cellpadding='0' cellspacing='0'>";
          wrapper += "<tr><td class='tl'></td><td class='t'></td></tr>";
          wrapper += "<tr><td class='l'></td><td class='m'></td></tr>";
          wrapper += "</table></div>";
          break;
        case 'topRight':
          wrapper =  "<div><table class='{className}' border='0' cellpadding='0' cellspacing='0'>";
          wrapper += "<tr><td class='t'></td><td class='tr'></td></tr>";
          wrapper += "<tr><td class='m'></td><td class='r'></td></tr>";
          wrapper += "</table></div>";
          break;
        case 'bottomLeft':
          wrapper =  "<div><table class='{className}' border='0' cellpadding='0' cellspacing='0'>";
          wrapper += "<tr><td class='l'></td><td class='m'></td></tr>";
          wrapper += "<tr><td class='bl'></td><td class='b'></td></tr>";
          wrapper += "</table></div>";
          break;
        case 'bottomRight':
          wrapper =  "<div><table class='{className}' border='0' cellpadding='0' cellspacing='0'>";
          wrapper += "<tr><td class='m'></td><td class='r'></td></tr>";
          wrapper += "<tr><td class='b'></td><td class='br'></td></tr>";
          wrapper += "</table></div>";
          break;
      }
      wrapper = wrapper.replace('{className}', options.wrapperClass);

      // wrap raw html
      var text = $(this).html();
      var newText = $(wrapper).find(".m").html(text).end().html();
      $(this).replaceWith(newText);
      return $(this);
    });
  }
})(jQuery);
