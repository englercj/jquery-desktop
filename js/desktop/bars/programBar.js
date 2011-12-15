/* File Name : programBar.js
 **********
 * Purpose   : Handles the maintenance for the program bar
 **********
 * Author    : Chad Engler
 **********
 * Created On: 7/29/2011 1:30pm
 **********
 */

(function($, window, undefined) {
    var $bar, $panelContainer,
        settings = window.appSettings.ProgramBar;
        
    function initBar() {
        $bar = $('div#prog-bar');
        $panelContainer = $('<div/>', { 'class': 'programbarPanelContainer' }).appendTo($bar);
        $panelContainer.sortable({ 
            revert: true, 
            items: 'a.programbarPanel', 
            containment: $bar,
            tolerance: 'pointer',
            helper: 'clone',
            distance: 10,
            start: function(e, ui) { ui.item.data('sorting', true); },
            stop: function(e, ui) { ui.item.data('sorting', false); }
        });
        
        var $icons = Util.drawIconSet(settings.icons, $bar, settings.iconSize);
        
        $.each($icons, function(key, val) {
            val.click(function() { Window.minimizeAll(); });
        });
    }
    
    function addPanel(win) {
        var $panel = $('<a/>', { id: Util.getId('programbar', win.info.id, 'panel'), 'class': 'programbarPanel' }),
            $img = Util.createIcon(win.info.icon.src, win.info.icon.size, 'windowIcon');

        $panel.append($img).append(win.info.title)
            .click(function() { Window.open(win.info.id); })
            .mousedown(Util.mouseDown).mouseup(Util.mouseUp);
        
        $panelContainer.append($panel);
        
        return $panel;
    }
    
    function removePanel(win) {
        var id = Util.getId('programbar', win.info.id, 'panel'),
            $panel = $('#' + id, $bar);
            
        $panel.remove();
    }
    
    window.ProgramBar = {
        init: initBar,
        addPanel: addPanel,
        removePanel: removePanel
    };
})(jQuery, window);