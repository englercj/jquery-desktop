/* Plugin Name: Desktop
 **********
 * Purpose    : Main jQuery Desktop application, controlls the operation of the entire application
 **********
 * Author     : Chad Engler
 **********
 * Created On : 7/28/2011 11:05am
 **********
 */
 
(function($, window, undefined) {
    //global plugin settings
    var settings = window.appSettings.Desktop,
    ui = {
        $window : $(window),
        $wrapper: {},
        $desktop: {}, 
        $backImg: {},
        $menuBar: {},
        $progBar: {},
        $desktopIcons: []
    },
    //define the plugin methods
    methods = {
        //INIT METHOD
        init: function(options) {
            $.extend(true, settings, options);
            ui.$wrapper = this;
            ui.$desktop = $('div#desktop', ui.$wrapper);
            ui.$backImg = $('img#wallpaper', ui.$wrapper);
            ui.$menuBar = $('div#menu-bar', ui.$wrapper);
            ui.$progBar = $('div#prog-bar', ui.$wrapper);
            
            Util.setTheme(settings.theme);
            
            ui.$backImg.prop('src', settings.wallpaper);
            drawDesktop();
            ProgramBar.init();
            MenuBar.init();
            
            return this;
        },
        resize: function() {
            ui.$desktop.height(
                ui.$window.height() - ui.$menuBar.outerHeight() -
                ui.$progBar.outerHeight() - Util.getVertPadding(ui.$desktop)
            );
            ui.$backImg.height(ui.$window.height());
            
            return this;
        },
        addWindow: function() {
            ui.$desktop.append(this);
            
            return this;
        },
        setWallpaper: function() {
            var src = (typeof(this) == 'object') ? this.attr('src') : this;
            ui.$backImg.attr('src', src);
            
            return this;
        }
    };
    
    function drawDesktop() {
        //set initial size of desktop and setup redraw method
        methods.resize();
        ui.$window.resize(methods.resize);
        
        ui.$desktopIcons =  Util.drawIconSet(settings.icons, ui.$desktop,
                                            settings.iconSize, 10,
                                            ui.$menuBar.outerHeight());
                                            
        $.each(ui.$desktopIcons, function(key, val) {
            val.dblclick(iconDblClick);
        });
    }
    
    function iconDblClick() {
        var imgSrc = $('img', this).attr('src');
        Window.open(this.hash.replace('#', ''), {
            icon: {
                src: imgSrc
            }
        });
    }
    
    //Extend jQuery with this plugin
    $.fn.extend({
        Desktop: function(method) {
            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' +  method + ' does not exist on jQuery.Desktop');
            }
        }
    });
})(jQuery, window);