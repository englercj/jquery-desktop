/* File Name : settings_panel.js
 **********
 * Purpose   : Creates and maintains the settings panel window
 **********
 * Author    : Chad Engler
 **********
 * Created On: 8/2/2011 10:20pm
 **********
 */
 
(function($, window, undefined) {
    var settings = {
       Appearance: {
           tabs: {
               Wallpaper: {
                   build: buildWallpaperTab,
                   id: 'wallpaper_tab',
                   wallpaper_path: 'imgs/bgs/desktop/',
                   wallpapers: ['hollow.jpg', 'retro.jpg', 'abstract-blue.jpg', 
                                'abstract-colorful.jpg', 'abstract-dream.jpg', 'abstract-firefox.jpg',
                                'abstract-green.jpg', 'abstract-metal.jpg', 'abstract-swirl.gif',
                                'abstract-wisp.jpg']
               },
               Themes: {
                   title: 'Control Themes',
                   build: buildThemesTab,
                   id: 'themes_tab',
                   themes: ['black-tie', 'cupertino', 'dark-hive', 'smoothness', 'ui-darkness']
               }
           }
       },
       Interface: {
           tabs: {
               Icons: {
                   build: buildIconsTab,
                   id: 'icons_tab'
               }
           }
       },
       ServerInfo: {
           title: 'Server Info',
           tabs: {
               Version: {
                   build: buildVersionTab,
                   id: 'version_tab'
               }
           }
       }
    },
    $curSelected;
    
    function tabClick(e) {
        var $cont = (e.target.hash) ? $(e.target.hash) : $(e.target.parentNode.hash),
            $nav = (e.target.hash) ? $(e.target) : $(e.target.parentNode);
            
        if($curSelected) {
            $curSelected.content.hide();
            $curSelected.nav.removeClass('ui-state-highlight ui-priority-primary');
        } else $curSelected = {};
        
        $curSelected.content = $cont.show();
        $curSelected.nav = $nav.addClass('ui-state-highlight ui-priority-primary');
    }
    
    function fillContent(win) {
        var $container = win.$content,
            $win = win.$obj,
            $nav = $('<ul/>', { 'class': 'verticalTabs' }),
            $content = $('<div/>', { 'class': 'verticalTabContent' });
        
        $.each(settings, function(key, val) {
            $nav.append($('<li/>').append(
                $('<a/>', { 
                    href: '#' + Util.getId('settings', key, 'tabs'),
                    text: (val.title) ? val.title : key
                }).button().click(tabClick)
            ));
            
            Util.createTabInterface(val.tabs).attr('id', Util.getId('settings', key, 'tabs'))
                .hide().appendTo($content);
        });
        
        $container.append($nav).append($content);
        $($nav.find('a span')[0]).click();
    }
    
    function buildWallpaperTab(key, tab, $container) {
        $container.addClass('wallpaperImgContainer');
        
        for(var i = 0, len = tab.wallpapers.length; i < len; ++i) {
            var $img = $('<img/>', { src: tab.wallpaper_path + tab.wallpapers[i], 'class': 'wallpaperImg' }).UiHover();
            
            $img.click(setWallpaper);
            
            $container.append($img);
        }
    }
    
    function buildThemesTab(key, tab, $container) {
        $container.append('<h2>Please choose a theme:</h2>');
        $container.append('<br /><br />');
        
        for(var i = 0, len = tab.themes.length; i < len; ++i) {
            var $rad = $('<input/>', { 
                    type: 'radio', 
                    name: 'theme_select', 
                    id: Util.getId('settings', tab.themes[i], 'radio'), 
                    value: tab.themes[i] 
                }).click(changeTheme),
                $label = $('<label/>', { 'for': Util.getId('settings', tab.themes[i], 'radio'), text: tab.themes[i] });
                
            if(tab.themes[i] == Util.getCurTheme())
                $rad.attr('checked', 'checked');
            
            $container.append($rad).append($label);
        }
        
        $container.buttonset();
    }
    
    function buildIconsTab(key, tab, $container) {
        $container.text('icons tab');
    }
    
    function buildVersionTab(key, tab, $container) {
        $container.text('version tab');
        
    }
    
    function setWallpaper(e) {
        $(this).Desktop('setWallpaper');
    }
    
    function changeTheme(e) {
        var theme = e.target.value;
        
        Util.setTheme(theme);
    }
    
    window.Window.settings_panel = {
        title: 'Settings Panel',
        resizable: true,
        draggable: true,
        init: fillContent,
        icon: {
            src: 'http://upload.wikimedia.org/wikipedia/commons/b/b3/Advancedsettings.png',
            size: 16
        }
    };
})(jQuery, window);