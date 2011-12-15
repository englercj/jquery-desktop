/* File Name : browser.js
 **********
 * Purpose   : Creates and maintains the browser window
 **********
 * Author    : Chad Engler
 **********
 * Created On: 8/2/2011 10:20pm
 **********
 */
 
(function($, window, undefined) {
    function fillContent(win) {
        var $content = win.$content,
            $win = win.$obj,
            $input = $('<input/>', { 'class': 'browserAddrBar' }).text('http://'),
            $iframe = $('<iframe/>', { 'class': 'browserFrame' });
        
        $content.append($input).append($iframe);
        
        $win.bind('resize', function(e) { $iframe.height($content.innerHeight() - $input.outerHeight() - 2); });
        
        $input.keypress(function(e) {
            if(e.which == 13) {
                var txt = $input.val();
                if(txt.indexOf('http://') === -1) txt = 'http://' + txt;
                
                $iframe.attr('src', txt); 
            }
        });
    }
    
    
    window.Window.browser = {
        title: 'Browser',
        resizable: true,
        draggable: true,
        init: fillContent,
        icon: {
            src: 'http://upload.wikimedia.org/wikipedia/commons/6/69/Crystal_Project_browser.png',
            size: 16
        }
    };
})(jQuery, window);