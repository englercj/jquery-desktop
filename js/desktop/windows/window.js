/* File Name : window.js
 **********
 * Purpose   : Handles creating new windows for content
 **********
 * Author    : Chad Engler
 **********
 * Created On: 7/28/2011 8:30pm
 **********
 */
 
(function($, window, undefined) {
    var STATES = { 
        NORMAL: 'normal', 
        HIDDEN: 'hidden', 
        MAX: 'maximized', 
        MIN: 'minimized' 
    },
    serial = 0,
    openWindows = {},
    Window = function(options) {
        //PRIVATE VARS
        var defaults = {
            title: 'New Window',
            icon: {
                src: '',
                size: 16
            },
            buttons: ['mini', 'max', 'close'],
            openAnim: function(win) { win.$obj.show(); }, //default open
            miniAnim: function(win) { win.$obj.hide(); }, //default minimize
            maxAnim : function(win) { 
                var $o = win.$obj,
                    $p = $o.parent();
                $o.css({ top: $p.position().top + 'px', left: '0' })
                    .height($p.height() - Util.getVertPadding($o))
                    .width($(window).width() - Util.getHorzPadding($o) - 7);
            },
            unMaxAnim: function(win) { 
                var $o = win.$obj;
                $o.css({ height: $o.css('min-height'), width: $o.css('min-width') });
            },
            closeAnim: function(win) { win.$obj.hide(); }
        },
        settings = $.extend(true, {}, defaults, options),
        $win, $handle, $content, 
        me = this; //this is because we use click callbacks which need an instance reference (and so does init())
        
        if(!settings.id) return;
        
        //PUBLIC FUNCTIONS
        this.open = function(e) {
            settings.openAnim(me);
            
            if(me.lastState === STATES.MAX) changeState(STATES.MAX);
            else {
                changeState(STATES.NORMAL);
                makeDraggable(settings.draggable);
            }
            
            me.focus();
            
            me.resize();
            ProgramBar.removePanel(me);
        };
        
        this.minimize = function(e) {
            settings.miniAnim(me);
            
            changeState(STATES.MIN);
            ProgramBar.addPanel(me);
        };
        
        this.maximize = function(e) {
            var $icon;
            if(me.state === STATES.MAX) {
                settings.unMaxAnim(me);
                changeState(STATES.NORMAL);
                makeDraggable(settings.draggable);
                
                $icon = $('span.ui-icon-newwin', this);
                $icon.removeClass('ui-icon-newwin').addClass('ui-icon-plusthick');
            } else {
                settings.maxAnim(me);
                changeState(STATES.MAX);
                makeDraggable(false);
                
                $icon = $('span.ui-icon-plusthick', this);
                $icon.removeClass('ui-icon-plusthick').addClass('ui-icon-newwin');
            }
            
            me.resize();
            me.focus();
            ProgramBar.removePanel(me);
        };
        
        this.close = function(e) {
            settings.closeAnim(me);
            $win.remove(); 
            ProgramBar.removePanel(me);
            
            delete openWindows[settings.id];
        };
        
        this.resize = function() { $win.trigger('resize'); };
        
        this.focus = function(f) {
            //TODO More efficient way of doing this besides iterating through all windows and backgrounding
            $.each(openWindows, function(key, val) {
                val.$obj.css('z-index', 5);
            });
            
            if(f !== false) $win.css('z-index', 10);
        };
        
        //PRIVATE FUNCTIONS
        function changeState(newState) { me.lastState = me.state; me.state = newState; }
        function makeDraggable(draggable) { 
            if(draggable) $win.draggable({ handle: $handle, containment: 'parent' });
            else $win.draggable('destroy');
        }
        function makeResizable(resizable) {
            if(resizable) $win.resizable({ resize: function(event, ui) { resizeContent(event); } });
            else $win.resizable('destroy');
        }
        
        function resizeContent(e) { $content.height($win.height() - 37); }
        
        function init() {
            //create elements
            $win = $('<div/>', { 'class': 'window' }).hide();
            $handle = $('<div/>', { 'class': 'windowHandle' }).appendTo($win);
            $content = $('<div/>', { 'class': 'windowContent' }).appendTo($win);
            
            changeState(STATES.HIDDEN);
            
            //add icon and text
            $handle.append(Util.createIcon(settings.icon.src, settings.icon.size, 'windowIcon'));
            $handle.append(settings.title);
            
            //add buttons
            for(len = settings.buttons.length, i = len - 1; i >= 0; --i) {
                var $btn;
                
                switch(settings.buttons[i]) {
                    case 'mini':
                        $btn = Util.createUiImg('ui-icon-minusthick', 'windowControlBtn');
                        $btn.click({ $win: $win }, me.minimize);
                        break;
                    case 'max':
                        $btn = Util.createUiImg('ui-icon-plusthick', 'windowControlBtn');
                        $btn.click({ $win: $win }, me.maximize);
                        break;
                    case 'close':
                        $btn = Util.createUiImg('ui-icon-closethick', 'windowControlBtn');
                        $btn.click({ $win: $win }, me.close);
                        break;
                }
                $handle.append($btn);
            }
            
            makeDraggable(settings.draggable);
            makeResizable(settings.resizable);
            
            //this is so we can explicitly trigger('resize');
            $win.bind('resize', function(e) { resizeContent(e); });
            //allows us to manipulate the top most window
            $win.bind('mousedown', function(e) { me.focus(); });
            
            openWindows[settings.id] = me;
            $win.Desktop('addWindow');
            
            return $win;
        }
        
        //PUBLIC VARS
        this.$obj = init(); //initializes and returns the main window object
        this.$content = $content;
        this.$handle = $handle;
        this.state = STATES.NORMAL; //hidden, minimized, maximized, normal
        this.lastState = STATES.HIDDEN;
        this.info = settings;
        
        //call custom init function
        if(settings.init) settings.init(me);
        
        this.open();
    };
    
    function minimizeAllWindows() {
        $.each(openWindows, function(key, val) {
            if(val.state != STATES.MIN) val.minimize();
        });
    }
    
    function openWindow(name, settings) {
        var id = 'window__' + name,
            theWin = openWindows[id];
        
        if(!theWin) theWin = openWindows[name]; //try using name
        if(!theWin) {
            if(window.Window[name]) settings = $.extend(true, {}, window.Window[name], settings);
            
            settings.id = id;
            theWin = new Window(settings);
        } else theWin.open();
        
        return theWin;
    }
    
    window.Window = {
        Window: Window,
        minimizeAll: minimizeAllWindows,
        open: openWindow
    };
})(jQuery, window);