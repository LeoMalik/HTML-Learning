#### extends和block一起用

它们用于母版和子版的继承

在母版html中将一些需要替换的部分用{% block xxx %}。。。{% endblock %}括起来，

![img](https://images2015.cnblogs.com/blog/1011243/201703/1011243-20170314182739791-1676247035.png)

 

在子版html中，在第一行需要写上要继承的母版，{% extends '母版的相对路径' %}这样引入母版。

![img](https://images2015.cnblogs.com/blog/1011243/201703/1011243-20170314182649385-1200366485.png)

 

#### include

include用户公共模板的引入，当很多页面（不是所有）中都需要某段html语言时，引入公共模板是个好方法，

在当前的html中的某个你需要引入公共模板的地方使用{% include '公共模板的相对路径' %}引入。

![img](https://images2015.cnblogs.com/blog/1011243/201703/1011243-20170314182626166-895436320.png)









### 模板补充知识：

网站模板的设计，一般的，我们做网站有一些通用的部分，比如 **导航，底部，访问统计代码等等**

**nav.html, bottom.html, tongji.html**

可以写一个 base.html 来包含这些通用文件（include)

````
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}默认标题{% endblock %} - 自强学堂</title>
</head>
<body>
 
{% include 'nav.html' %}
 
{% block content %}
<div>这里是默认内容，所有继承自这个模板的，如果不覆盖就显示这里的默认内容。</div>
{% endblock %}
 
{% include 'bottom.html' %}
 
{% include 'tongji.html' %}
 
</body>
</html>
````



如果需要，写足够多的 **block** 以便继承的模板可以重写该部分，**include** 是包含其它文件的内容，就是把一些网页共用的部分拿出来，重复利用，改动的时候也方便一些，还可以把广告代码放在一个单独的html中，改动也方便一些，在用到的地方include进去。其它的页面继承自 **base.html** 就好了，继承后的模板也可以在 block 块中 include 其它的模板文件。

比如我们的首页 home.html，继承或者说扩展(extends)原来的 **base.html，**可以简单这样写，重写部分代码（默认值的那一部分不用改）