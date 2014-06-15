//menu_left,menu_right,page_left,page_right,page_top,page_bottom,popup_left,popup_right,popup_top,popup_bottom


//函数：将相对地址转换为绝对地址
function rel_to_obs(url, base_url) {
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

//函数：git域名则加上GMS_help，否则使用绝对地址
function git_or_obs(url) {
    //var gms_help = "/GMS_help";
    var obsurl;
    //alert(url.slice(0, 1));
    if (location.hostname == "xujing-project.github.io") {
        obsurl ="/GMS_help"+ url; //如果是git域名,则前面加上项目名称
    } else {
        obsurl = url;
    }
    return obsurl;
}


$(document).ready(function () {
    //	The menu on the left
    $(function () {
        //左菜单加载mmenu_left.html
        //显示或关闭左菜单
        var mmenu_left_fullurl = $('#forload_menuleft').attr("href");//git_or_obs($('#forload_menuleft').attr("href"));
        url_prefix = mmenu_left_fullurl.slice(0,-23);
        mmenu_left_fullurl = git_or_obs(mmenu_left_fullurl);
        //alert(url_prefix);        
        $('nav#menu_left').load(mmenu_left_fullurl, function () {
            //应用mmeunu
            var $menu = $('nav#menu_left');
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
            // 
            $(this).find('a').each(function () {
                var menu_inner_url = url_prefix + $(this).attr("href");
                //将载入菜单目录里的链接进行一个git or obslute url的判断。
                $(this).attr("href", git_or_obs(menu_inner_url));
            });
            $('#index_searcher').on('click', function () {

            });

        });
    });

    //	The menu on the right
    $(function () {
        //右菜单加载mmenu_right.html
        //alert(mmenu_right_fullurl);
        var mmenu_right_fullurl = $('#forload_menuright').attr("href");
        url_prefix = mmenu_right_fullurl.slice(0,-24);
        mmenu_right_fullurl = git_or_obs(mmenu_right_fullurl);
        $('nav#menu_right').load(mmenu_right_fullurl, function () {
            //alert("11111");
            var $menu = $('nav#menu_right');
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
            $(this).find('a').each(function () {
                var menu_inner_url = url_prefix + $(this).attr("href");
                //将载入菜单目录里的链接进行一个git or obslute url的判断。
                $(this).attr("href", git_or_obs(menu_inner_url));
            });
        });
    });

    // for the popups
    $(function () {

        //设计一个函数cre_popups用来创建消息面板
        function cre_popups(classtype) {
            var popclass = classtype + "_ceshi";
            $('a.' + classtype).each(function () { //classtype是消息面板的类别，通过a元素打开
                //给id为page_popup的div容量里面添加其中最后一个.popup的克隆副本
                $('#page_popup').append($('.popup').last().clone(true));
                var temp = $('.popup').last(); //找到刚克隆的.popup元素
                var data_page_url = git_or_obs($(this).attr("href"));
                var data_page_id = $(this).attr("id") + "-1";
                $(this).attr("href", '#' + data_page_id); //a的瞄指向"a的id加"-1"的id位置
                temp.attr("id", data_page_id); //将temp的id修改为a的瞄对应的值
                temp.removeClass("popup_left_ceshi popup_right_ceshi popup_top_ceshi popup_bottom_ceshi"); //移除可能会重复添加的其它的类
                temp.addClass(popclass); //添加classtype对应的类            
                $("#" + data_page_id + " div div").load(data_page_url + " #content", function () {

                    $(this).find('a').each(function () {
                        var menu_inner_url = $(this).attr("href");

                        if (menu_inner_url.slice(0, 1) == "/") { //判断是否为绝对址
                            //alert(menu_inner_url.slice(0, 1));
                            $(this).attr("href", git_or_obs(menu_inner_url));
                        } else if (menu_inner_url.slice(0, 4) == "http") {
                            $(this).attr("href", menu_inner_url);
                            $(this).attr("target", "_blank");
                            /*
                            $(this).on("click", function () {
                                window.open(menu_inner_url, "_blank");
                            })
                            */
                        } else if (menu_inner_url.slice(0, 3) == "www") {

                            menu_inner_url = "http://" + menu_inner_url;
                            $(this).attr("href", menu_inner_url);
                            $(this).attr("target", "_blank");

                        } else {
                            //如果是站点的相对地址则转换成相对于正在打开页面的绝对地址
                            $(this).attr("href", rel_to_obs(menu_inner_url, data_page_url));
                        }

                    });

                }); //在相应的id容量里载入dataurl对应的文件的content部分
            });
        }

        //提前载入四种消息面板可能会用到的资源
        cre_popups("popup_left");
        cre_popups("popup_right");
        cre_popups("popup_top");
        cre_popups("popup_bottom");

        //打开或关闭消息面板
        var options = {
            classes: 'mm-black',
            modal: false
        };
        //从左边弹出的消息面板
        options.position = 'left';
        options.zposition = 'front';
        $('.popup_left_ceshi').mmenu(options);
        //从右边弹出的消息面板
        options.position = 'right';
        options.zposition = 'front';
        $('.popup_right_ceshi').mmenu(options);
        //从上边弹出的消息面板
        options.position = 'top';
        options.zposition = 'front';
        $('.popup_top_ceshi').mmenu(options);
        //从下边弹出的消息面板
        options.position = 'bottom';
        options.zposition = 'front';
        $('.popup_bottom_ceshi').mmenu(options);
        //点击a.close对象关闭面板
        $('a.close').click(function () {
            $(this).closest('.mm-menu').trigger('close');
        });
    });

    //full screen
    $(function () {

        //设计一个函数cre_fullpages用来创建全屏面板
        function cre_fullpages(classtype) {
            var fullpageclass = classtype + "_ceshi";
            $('a.' + classtype).each(function () { //classtype是消息面板的类别，通过a元素打开
                //给id为page_fullscreen的div容量里面添加其中最后一个.panel的克隆副本
                $('#page_fullscreen').append($('.panel').last().clone(true));
                var temp = $('.panel').last(); //找到刚克隆的.panel元素
                var data_page_url = git_or_obs($(this).attr("href"));
                var data_page_id = $(this).attr("id") + "-1";
                $(this).attr("href", '#' + data_page_id); //a的瞄指向"a的id加"-1"的id位置
                temp.attr("id", data_page_id); //将temp的id修改为a的瞄对应的值
                temp.removeClass("page_left_ceshi page_right_ceshi page_top_ceshi page_bottom_ceshi"); //移除可能会重复添加的其它的类
                temp.addClass(fullpageclass); //添加classtype对应的类
                $("#" + data_page_id + " div div").load(data_page_url + " #content", function () {

                    $(this).find('a').each(function () {
                        var menu_inner_url = $(this).attr("href");
                        if (menu_inner_url.slice(0, 1) == "/") { //判断是否为绝对址
                            //alert(menu_inner_url.slice(0, 1));
                            $(this).attr("href", git_or_obs(menu_inner_url));
                        } else if (menu_inner_url.slice(0, 4) == "http") {
                            $(this).attr("href", menu_inner_url);
                            $(this).attr("target", "_blank");
                        } else if (menu_inner_url.slice(0, 3) == "www") {
                            menu_inner_url = "http://" + menu_inner_url;
                            $(this).attr("href", menu_inner_url);
                            $(this).attr("target", "_blank");
                            /*
                            $(this).on("click", function () {
                                window.open(menu_inner_url, "_blank");
                            })
                            */
                        } else {
                            //如果是站点的相对地址则转换成相对于正在打开页面的绝对地址
                            $(this).attr("href", rel_to_obs(menu_inner_url, data_page_url));
                        }
                    });
                }); //在相应的id容量里载入dataurl对应的文件的content部分
            });
        }

        //提前载入四种全屏面板可能会用到的资源
        cre_fullpages("page_left");
        cre_fullpages("page_right");
        cre_fullpages("page_top");
        cre_fullpages("page_bottom");


        //展开全屏页面
        var options = {
            classes: 'mm-fullscreen',
            zposition: 'next',
            moveBackground: false
        };

        $('.page_left_ceshi').mmenu(options);
        options.position = 'right',
        $('.page_right_ceshi').mmenu(options);
        options.position = 'top',
        $('.page_top_ceshi').mmenu(options);
        options.position = 'bottom',
        $('.page_bottom_ceshi').mmenu(options);
        $('.page_left_ceshi, .page_right_ceshi,.page_top_ceshi,.page_bottom_ceshi')
            .on(
                'opening.mm',
                function () {
                    $('body').addClass(this.id);
                }
        ).on(
            'closing.mm',
            function () {
                $('body').removeClass(this.id);
            }
        );

        $('a.back')
            .on(
                'click',
                function (e) {
                    e.preventDefault();
                    $('.page_left_ceshi, .page_right_ceshi,.page_top_ceshi,.page_bottom_ceshi').trigger('close.mm');
                }
        );
    });


    //显示英文翻译    
    $(".entr_click").each(function () {
        var data_entr = "#" + $(this).attr("data_entr");
        $(data_entr).addClass("entr_content");
        $(this).click(function () {
            $(data_entr).slideToggle("slow");
        });
    });

    //end

})