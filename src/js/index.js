$(document).ready(function () {

    //函数：将相对地址转换为绝对地址
    function resolve(url, base_url) {
        var doc = document,
            old_base = doc.getElementsByTagName('base')[0],
            old_href = old_base && old_base.href,
            doc_head = doc.head || doc.getElementsByTagName('head')[0],
            our_base = old_base || doc_head.appendChild(doc.createElement('base')),
            resolver = doc.createElement('a'),
            resolved_url;
        our_base.href = base_url;
        resolver.href = url;
        resolved_url = resolver.href; // browser magic at work here

        if (old_base) old_base.href = old_href;
        else doc_head.removeChild(our_base);
        return resolved_url;
    }


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
        $('nav#menu-left').load("/subpage/mmenu_left.html", function () {
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

            /*
            //ajax load page
            var hash = window.location.hash.substr(1);
            var href = $('nav#menu-left').find('li a').each(function () {
                var href = $(this).attr('href');
                if (hash == href.substr(0, href.length - 5)) {
                    var toLoad = '/' + escape(hash) + '.html #content';
                    $("#content").load(toLoad, function () {

                        // 内容部分网址相对地址转换为绝对地址  
                        var href = $('#content').find('a').each(function () {
                            var url = $(this).attr('href');
                            var base_url = toLoad;
                            $(this).attr('href', resolve(url, base_url));
                        });
                        //内容部分图片的相对地址切换为绝对地址
                        var href = $('#content').find('img').each(function () {
                            var url = $(this).attr('src');
                            var base_url = toLoad;
                            $(this).attr('src', resolve(url, base_url));
                        });
                        // 
                    });

                }
            });            
            
            //点击menu_left部分在内容部分载入新的内容
            $('nav#menu-left').find('li a').click(function () {

                var toLoad = '/' + escape($(this).attr('href')) + ' #content';
                $('#content').hide('fast', loadContent);
                $('#load').remove();
                $('#footer').append('<span id="load">LOADING...</span>');
                $('#load').fadeIn('normal');
                window.location.hash = $(this).attr('href').substr(0, $(this).attr('href').length - 5);

                function loadContent() {
                    $('#content').load(toLoad, '', showNewContent())
                }

                function showNewContent() {                    
                    
                    $('#content').show('normal', hideLoader());                    

                }

                function hideLoader() {
                    $('#load').fadeOut('normal');                    
                }
                return false;

            });
            */



            // for one page

            var $html = $('html, body');
            //$menu.mmenu();
            $menu.find('li a').on(
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
                            });
                    };
                });
        });

    });



    //	The menu on the right
    $(function () {
        //右菜单加载mmenu_right.html
        //"[href='#menu-right']"
        //$(document).ready(function () {});

        $('nav#menu-right').load("/subpage/mmenu_right.html", function () {
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
        $('nav#menu-right').find('li a').not('.mm-subopen').not('.mm-subclose').bind(
            'click.example',
            function (e) {
                e.preventDefault();
                $confirm.show().text('You clicked "' + $.trim($(this).text()) + '"');
                $('#menu-left').trigger('close');
            }
        );
    });

})