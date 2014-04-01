GMS_help
========

<<<<<<< HEAD
目录文件放在gh-pages下面。
=======
目录文件放在[gh-pages](https://github.com/XuJing-project/GMS_help/tree/gh-pages)下面。
>>>>>>> f7a6c2f83e6cd5bdeccb4778f0af70295deef3f4

git clone到本地后先用dw8-站点-新建站点将整个目录载入到dw8中，目录结构如下：
- 站点-GMS_help
  + 000_Using GameMaker    
  + 001_Advanced Use
  + 002_Reference
  + Images    //放图片的目录
  + Library   //库目录
  + src       //mmenu插件目录
  + Templates  //模版目录
  + GM_Banner.png
  + index.html
  + style.css
  + update_log.html

1. 翻译只要打开000、001、002几个目录里的网页，在设计视图下显示的每段英文后面另起一段编辑中文就可以了。
2. 代码模式下看到的标签` <blockquote></blockquote>` 里面，尽量使用`<br>`换行。
3. 大部分网页都是使用库文件更新的，最近使用DW8内存出现溢出，于是重新制作了模版文件，如果要额外插入说明教程请在新建页面后在dw8右侧-文件-资源-模版，找到GMS_helppage应用模版，设计视图下可以看到几块可以编辑的地方。
4. 为新页面添加新的模块请在菜单-修改-模版属性里设置模块的显示或隐藏。
5. 网站是用jQuery-mmenu插件实现的，使用方法见：http://mmenu.frebsite.nl/index.php
