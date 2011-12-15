/* File Name : icon.js
 **********
 * Purpose   : Handles creating and maintaining a desktop icon
 **********
 * Author    : Chad Engler
 **********
 * Created On: 7/28/2011 11:05am
 **********
 */
 
(function($, win, undefined) {
    var settings = { bufferSpace: 10, distanceBuffer: 5 };
    
    var createIcon = function(options) {
        var $cont = $('<a/>', { 'class': options.clss, href: options.href }),
            $img = Util.createIcon(options.icon, options.size);
            
        $cont.mousedown(Util.mouseDown).mouseup(Util.mouseUp)
            .hover(iconMouseIn, iconMouseOut);
        
        if(options.draggable)
            $cont.draggable({ 
                start: Util.dragStart, 
                stop: Util.dragStop, 
                containment: 'parent',
                distance: settings.distanceBuffer
            });
            
        return $cont.append($img).append(options.text);
    };
    
    function iconMouseIn() { }
    function iconMouseOut() { }
    
    win.Icon = {
        Icon: createIcon
    };
})(jQuery, window);