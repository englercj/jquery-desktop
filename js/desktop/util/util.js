/* File Name : util.js
 **********
 * Purpose   : General Utility functions used throughout the program
 **********
 * Author    : Chad Engler
 **********
 * Created On: 7/29/2011 1:30pm
 **********
 */
 
 //TODO: Override 'alert()' to have cool alert modal (using the dialog class)

(function($, win, undefined) {
    var ID_SEP = '__',
        curTheme = '';
    
    $.fn.extend({
        UiHover : function() {
            return this.each(function() {
                var $this = $(this);
                $this.addClass('ui-state-default');
                $this.hover(
                    function() { $this.addClass('ui-state-hover'); }, 
                    function() { $this.removeClass('ui-state-hover'); 
                });
            });
        }
    });
    
    function drawIconSet(iconSet, $container, size, bufferSize, initHeight) {
        var $icons = [],
            buffer = (bufferSize) ? bufferSize : 0,
            lastHeight = (initHeight) ? initHeight : 0;
            
        //draw desktop icons
        $.each(iconSet, function(key, val) {
            var $icon = new Icon.Icon($.extend(val, { size: size }));
                
            $icon.css('top', (lastHeight) + 'px');
            $container.append($icon);
            $icons.push($icon);
            
            lastHeight += $icon.outerHeight() + buffer;
        });
        
        return $icons;
    }
    
    function setTheme(theme) {
        curTheme = theme;
        
        $('link#jqueryUI').attr('href', 'themes/' + theme + '/jquery-ui-1.8.14.custom.css');
        $('link#themeUI').attr('href', 'themes/' + theme + '/theme.css');
    }
    
    function getCurTheme() {
        return curTheme;
    }
    
    function createImg(src, clss, id) {
        var $img = $('<img/>', { src: src });
        
        if(clss) $img.addClass(clss);
        if(id) $img.attr('id', id);
        
        return $img;
    }
    
    function createIcon(src, size, clss, id) {
        clss = (clss) ? ' ' + clss : '';
        var $icon = createImg(src, 'icon' + clss, id);
        
        if(size) $icon.height(size).width(size);
        
        return $icon;
    }
    
    function createUiImg(icon, clss, id) {
        var $widget = $('<div/>', { 'class': 'ui-corner-all ' + clss }),
            $span = $('<span/>', { 'class': 'ui-icon ' + icon });
        
        $widget.append($span).UiHover();
        
        if(id) $span.attr('id', id);
        
        return $widget;
    }
    
    function getId(context, name, sub) {
        var id = context + ID_SEP + name;
        
        if(sub) id += ID_SEP + sub;
        
        return id;
    }
    
    function getCssNum($elm, attr) {
        return parseInt($elm.css(attr).replace('px', ''), 10);
    }
    
    function getVertPadding($elm) {
        return (getCssNum($elm, 'padding-top') + getCssNum($elm, 'padding-bottom'));
    }
    
    function getHorzPadding($elm) {
        return (getCssNum($elm, 'padding-left') + getCssNum($elm, 'padding-right'));
    }
    
    function mouseDown() { $(this).addClass('mouseDown'); }
    function mouseUp() { $(this).removeClass('mouseDown'); }
    
    function dragStart() { $(this).addClass('dragStart'); }
    function dragStop() { $(this).removeClass('dragStart'); }
    
    function getCurTimeString() {
        var d = new Date(),
            hrs = d.getHours(),
            min = d.getMinutes(),
            sec = d.getSeconds(),
            p = (hrs > 11) ? 'PM' : 'AM';
            t = [];
        
        t.push((hrs > 12) ? hrs - 12 : hrs);
        t.push((min < 10) ? '0' + min : min);
        t.push((sec < 10) ? '0' + sec : sec);
        
        return t.join(':') + ' ' + p;
    }
    
    function createTabInterface(tabs) {
        if(jQuery.isEmptyObject(tabs)) return;
        
        var $container = $('<div/>'),
            $titles = $('<ul/>').appendTo($container);
            
        $.each(tabs, function(key, val) {
            //append the title
            $titles.append($('<li/>').append(
                $('<a/>', { href: '#' + val.id }).text((val.title) ? val.title : key)
            ));
            
            var $div = $('<div/>', { id: val.id }); //create tab container
            $container.append($div); //append tab
            val.build(key, val, $div); //initialize tab
        });
        
        return $container.tabs();
    }
    
    function clearBr() { return $('<br/>', { clear: 'all', 'class': 'ui-helper-clearfix' }); }
    
    win.Util = {
        VERSION         : '0.1 ALPHA',
        drawIconSet     : drawIconSet,
        createImg       : createImg,
        createIcon      : createIcon,
        getCssNum       : getCssNum,
        getVertPadding  : getVertPadding,
        getHorzPadding  : getHorzPadding,
        mouseDown       : mouseDown,
        mouseUp         : mouseUp,
        dragStart       : dragStart,
        dragStop        : dragStop,
        getCurTimeString: getCurTimeString,
        getId           : getId,
        createTabInterface: createTabInterface,
        createUiImg     : createUiImg,
        clearBr         : clearBr,
        setTheme        : setTheme,
        getCurTheme     : getCurTheme
    };
})(jQuery, window);