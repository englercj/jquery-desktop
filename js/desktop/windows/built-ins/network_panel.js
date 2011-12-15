/* File Name : network_panel.js
 **********
 * Purpose   : Creates and maintains the network panel window
 **********
 * Author    : Chad Engler
 **********
 * Created On: 8/2/2011 10:20pm
 **********
 */
 
(function($, window, undefined) {
    function fillContent(win) {
    }
    
    
    window.Window.network_panel = {
        title: 'Network Panel',
        resizable: true,
        draggable: true,
        init: fillContent,
        icon: {
            src: 'http://upload.wikimedia.org/wikipedia/commons/7/7a/Crystal_Project_server.png',
            size: 16
        }
    };
})(jQuery, window);