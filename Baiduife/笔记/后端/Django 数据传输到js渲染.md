# [Django 前后台的数据传递](https://www.cnblogs.com/psklf/p/5542612.html)

**严正声明：**
作者：[psklf](http://www.cnblogs.com/psklf/)
出处： <https://www.cnblogs.com/psklf/archive/2016/05/30/5542612.html>
欢迎转载，但未经作者同意，必须保留此段声明；必须在文章中给出原文连接；否则必究法律责任!

Django 从后台往前台传递数据时有多种方法可以实现。

最简单的后台是这样的：

```
from django.shortcuts import render

def main_page(request):
    return render(request, 'index.html')
```

这个就是返回index.html的内容，但是如果要带一些数据一起传给前台的话，该怎么办呢？

### 一 view -> HTML 使用Django模版

这里是这样：后台传递一些数据给html，直接渲染在网页上，不会有什么复杂的数据处理（如果前台要处理数据，那么就传数据给JS处理）

Django 代码：

```
from django.shortcuts import render

def main_page(request):
    data = [1,2,3,4]
    return render(request, 'index.html', {'data': data})
```

html使用 `{{ }}` 来获取数据

```
<div>{{ data }}</div>
```

可以对可迭代的数据进行迭代：

```
{% for item in data%}
<p>{{ item }}</p>
{% endfor %}
```

该方法可以传递各种数据类型，包括list，dict等等。
而且除了 `{% for %}` 以外还可以进行if判断，大小比较等等。具体的用法读者可以自行搜索。

### 二 view-> JavaScript

如果数据不传给html用，要传给js用，那么按照上文的方式写会有错误。
需要注意两点：

1. views.py中返回的函数中的值要用 `json.dumps()` 处理
2. 在网页上要加一个 safe 过滤器。

代码：
views.py

```
# -*- coding: utf-8 -*-
 
import json
from django.shortcuts import render
 
def main_page(request):
    list = ['view', 'Json', 'JS']
    return render(request, 'index.html', {
            'List': json.dumps(list),
        })
```

JavaScript部分：

```
var List = {{ List|safe }};
```

### 三 JavaScript Ajax 动态刷新页面

这个标题的意思是：网页前台使用Ajax发送请求，后台处理数据后返回数据给前台，前台不刷新网页动态加载数据

Django 代码：

```
def scene_update_view(request):
    if request.method == "POST":
            name = request.POST.get('name')
            status = 0
            result = "Error!"
            return HttpResponse(json.dumps({
                "status": status,
                "result": result
            }))
```

JS 代码：

```
        function getSceneId(scece_name, td) {
            var post_data = {
                "name": scece_name,
            };

            $.ajax({
                url: {% url 'scene_update_url' %},
                type: "POST",
                data: post_data,
                success: function (data) {
                    data = JSON.parse(data);
                    if (data["status"] == 1) {
                        setSceneTd(data["result"], scece_name, td);
                    } else {
                        alert(data["result"]);
                    }
                }
            });
        } 
```

JS 发送ajax请求，后台处理请求并返回status, result
在 `success:` 后面定义回调函数处理返回的数据，需要使用 `JSON.parse(data)`