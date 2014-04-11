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


//	The menu on the left
$(function () {
    //左菜单加载mmenu_left.html    
    $('nav#menu-left').load("subpage/mmenu_left.html", function () {
        //应用mmeunu
        var $menu = $('nav#menu-left');
        $menu.mmenu({
            position: 'left',
            classes: 'mm-black',
            dragOpen: true,
            counters: true,
            searchfield: true,
            labels: {
                fixed: !$.mmenu.support.touch
            }
        });

        // for one page
        var $html = $('html, body');
        //$menu.mmenu();
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
                };

                //load mmenuleft 链接content
                $('div#content').load(href.slice(1) + " #content", function () {
                    //alert("11112");

                });
                //
            }
        );

    });

});


//	The menu on the right
$(function () {
    //右菜单加载mmenu_right.html
    //"[href='#menu-right']"
    //$(document).ready(function () {});

    $('nav#menu-right').load("subpage/mmenu_right.html", function () {
        //alert("11111");
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