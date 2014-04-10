//	The menu on the right
$(function () {

    var $menu = $('nav#menu-right');
    $menu.mmenu({
        position: 'right',
        classes: 'mm-black',
        dragOpen: true,
        counters: true,
        searchfield: true,
        labels: {
            fixed: !$.mmenu.support.touch
        }
    });

    //	Click a menu-item
    var $confirm = $('#confirmation');
    $menu.find('li a').not('.mm-subopen').not('.mm-subclose').bind(
        'click.example',
        function (e) {
            e.preventDefault();
            $confirm.show().text('You clicked "' + $.trim($(this).text()) + '"');
            $('#menu-left').trigger('close');
        }
    );
});

//	The menu on the left
$(function () {

    var $menu0 = $('nav#menu-left');

    $menu0.mmenu({
        position: 'left',
        classes: 'mm-black',
        dragOpen: true,
        counters: true,
        searchfield: true,
        labels: {
            fixed: !$.mmenu.support.touch
        }
    });

});

// for one page

$(function () {
    var $menu = $('nav#menu-left'),
        $html = $('html, body');

    $menu.mmenu();
    $menu.find('li > a').on(
        'click',
        function () {
            var href = $(this).attr('href');

            //	if the clicked link is linked to an anchor, scroll the page to that anchor 
            if (href.slice(0, 1) == '#') {
                $menu.one(
                    'closed.mm',
                    function () {
                        setTimeout(
                            function () {
                                $html.animate({
                                    scrollTop: $(href).offset().top
                                });
                            }, 10
                        );
                    }
                );
            }
        }
    );
});

// for the tips

$(function () {
    var options = {
        classes: 'mm-black',
        modal: true
    };

    options.position = 'left';
    options.zposition = 'next';
    $('#tooltip-1').mmenu(options);

    options.position = 'right';
    options.zposition = 'next';
    $('#tooltip-2').mmenu(options);

    options.position = 'top';
    options.zposition = 'front';
    $('#popup-1').mmenu(options);

    options.position = 'bottom';
    options.zposition = 'front';
    $('#en-1').mmenu(options);

    options.position = 'bottom';
    options.zposition = 'front';
    $('#en-2').mmenu(options);

    options.position = 'bottom';
    options.zposition = 'front';
    $('#tips-1').mmenu(options);

});

//在content中载入index_x.html
$(document).ready(function () {

    $("#content").load("index_x.html");
    $("#menu-left").load("mmenu_left.html");
    $("#menu-right").load("mmenu_right.html");    

    //在页面装载时，在ID为#labels的DOM元素里插入labels.html的内容。

});