/* File Name : menuBar.js
 **********
 * Purpose   : Handles the maintenance for the menu bar
 **********
 * Author    : Chad Engler
 **********
 * Created On: 7/29/2011 1:30pm
 **********
 */

(function($, win, undefined) {
    var $bar,
        settings = window.appSettings.MenuBar;
    
    function initBar() {
        $bar = $('div#menu-bar');
        var $clock = $('<a/>', { 
            href: settings.clock.href,
            text: Util.getCurTimeString(),
            'class': 'menubarClock' 
        });
        
        $bar.append($clock);
        $bar.append(Util.createIcon(settings.clock.icon.src, settings.clock.icon.size, 'menubarClock'));
        
        setInterval(function() { $clock.text(Util.getCurTimeString()); }, 1000);
        
        drawItems(settings.items, $bar);
    }
    
    //recurrsively draws item menus
    function drawItems(items, $container) {
        //draw items
        $.each(items, function(key, val) {
            var $item = $('<a/>', { href: val.href, text: val.title, 'class': 'menubarItem' });
            
            if(val.icon) {
                var $icon;
                
                if(typeof(val.icon) == 'object')
                    $icon = Util.createIcon(val.icon.src, val.icon.size);
                else 
                    $icon = Util.createIcon(val.icon, 16);
                    
                $item.append($icon);
            }
            
            if(val.action) {
                if(typeof(val.action) == 'function') {
                    $item.click(val.action);
                } else if(typeof(val.action) == 'string') {
                    switch(val.action) {
                        case 'open_window':
                            $item.click(function() { Window.open(val.href.replace('#', '')); });
                            break;
                        default: break;
                    }
                }
            }
            
            $container.append($item);
            
            if(val.items) {
                var $cont = $('<div/>', { id: Util.getId('menubar', key, 'items'), 'class': 'menubarSubMenu' });
                $cont.hide().appendTo($item);
                
                $item.hover(function() { $cont.show(); }, function() { $cont.hide(); });
                
                drawItems(val.items, $cont);
            }
        });
    }
    
    win.MenuBar = {
        init: initBar
    };
})(jQuery, window);