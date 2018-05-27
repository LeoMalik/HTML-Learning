判断是否为数字:`isNaN(4)`

四舍五入数字:`.toFixed(4) `

输入B中的内容，在输入A的内容中第一次出现的位置:`a.indexof(b)`

判断数据类型:`Object.prototype.toString.call(n)`



# day20-21:

### 第一个任务:

基于如上 HTML，实现以下功能：

- 当用户选择了 School 的单选框时，显示 School 的下拉选项，隐藏 Company 的下拉选项
- 当用户选择了 School 的单选框时，显示 Company 的下拉选项，隐藏 School 的下拉选项

````` js
$(document).ready(function(){
    $('input').on('click', function () {
        // 用this来调用调用该函数的对象
        var id="#"+$(this).attr('id')+'-select';
        $("select").hide();
        console.log(id);
        $(id).show().attr("style","display:inline");
    });
})
`````

1. 使用`($this)`而非`this`,因为this指的是函数的调用者
2. 使用串式`$(id).show().attr("style","display:inline");`链接简化代码

### 第二个任务:

基于如上 HTML，实现如下功能：

- 点击某一个 Li 标签时，将 Li 的背景色显示在 P 标签内，并将 P 标签中的文字颜色设置成 Li 的背景色

```` js
for (var i = i = 0, len = list.length; i < len; i++) {
            list[i].onclick = function(e) {
                var t = e.target;
                var c = t.style.backgroundColor;
                var p = document.getElementsByClassName("color-picker")[0]
                p.innerHTML = c;
                p.style.color = c;
                p.style.backgroundColor=c;
            }
        }
````

1. 这里可以用代理来简化代码
2. 使用e.target获取事件的dom对象

### 第三个任务:

针对以上 HTML，分别使用 setTimeout 和 setInterval 实现以下功能：

- 点击按钮时，开始改变 fade-obj 的透明度，开始一个淡出（逐渐消失）动画，直到透明度为0

- 在动画过程中，按钮的状态变为不可点击

- 在动画结束后，按钮状态恢复，且文字变成“淡入”

- 在 按钮显示 淡入 的状态时，点击按钮，开始一个“淡入”（逐渐出现）的动画，和上面类似按钮不可点，直到透明度完全不透明

- 淡入动画结束后，按钮文字变为“淡出”

- 暂时不要使用 CSS animation （以后我们再学习）

  

思路:

1. 首先给按钮绑定一个点击事件 当点击触发时,设定一个改变透明度的毫秒定时器
2. 如果透明度小于0或者大于1时,清除定时器,改变按钮值

### 第四个任务:

学习来实现一个帧动画：

- 基于一个我们提供的图片，实现 [IFE2016中Erik笑容的动画](http://ife.baidu.com/2016/static/index.html)
- 图片地址：<http://ife.baidu.com/2016/static/img/erik_ce204002.jpg>
- 注意，依然不要使用 CSS animation，因为我们这里要学习的是使用 JavaScript 来操作 CSS，而不是为了完成这个任务

思路:

1. 这里使用`backgroundPosition `属性来控制背景图在大图中的位置
2. 使用定时器:来控制背景图片所属位置的变化,如果到底了就循环再来一次



# day22-24

### 任务一

```
实现一个字符串头尾去除空格的函数
注意需要去除的空格，包括全角、半角空格
暂时不需要学习和使用正则表达式的方式
```

思路:

1. 获取第一个非空格元素的下标
2. 获取最后一个非空格元素的下标
3. 用`charCodeAt`来判定是否是全角的还是半角的空格
4. 用string.slice方法来截取字符串

### 任务二

```
去掉字符串str中，连续重复的地方
```

思路:

1. 用split方法将字符串转为一个数组
2. 如果相邻的数组元素相同的话.就删除前一个数组元素
3. 最后用join方法将数组转换为字符串

### 任务三

树的遍历:

```js
var tree = {
    "id": 0,
    "name": "root",
    "left": {
        "id": 1,
        "name": "Simon",
        "left": {
            "id": 3,
            "name": "Carl",
            "left": {
                "id": 7,
                "name": "Lee",
                "left": {
                    "id": 11,
                    "name": "Fate"
                }
            },
            "right": {
                "id": 8,
                "name": "Annie",
                "left": {
                    "id": 12,
                    "name": "Saber"
                }
            }
        },
        "right": {
            "id": 4,
            "name": "Tony",
            "left": {
                "id": 9,
                "name": "Candy"
            }
        }
    },
    "right": {
        "id": 2,
        "name": "right",
        "left": {
            "id": 5,
            "name": "Carl",
        },
        "right": {
            "id": 6,
            "name": "Carl",
            "right": {
                "id": 10,
                "name": "Kai"
            }        
        }
    }
}
```

有如上对象，分别实现代码下方的几个函数，满足以下需求：

- 假设id和name均不会重复，根据输入name找到对应的id
- 假设id和name均不会重复，根据输入id找到对应的name
- 把这个对象中所有的名字以“前序遍历”的方式全部输出到console中
- 把这个对象中所有的名字以“中序遍历”的方式全部输出到console中
- 把这个对象中所有的名字以“后序遍历”的方式全部输出到console中

思路:

1. 前序遍历这个树,同时对name的值进行判定,如果相等的话就进行输出,否则继续遍历

````js
function findIdByName1(name,object){
    if(object!=null){
        if(object['name']==name)
        {
            console.log(object.id);
            flag=false;
        }
        findIdByName1(name,object.left);
        findIdByName1(name,object.right);
    }
}
findIdByName1('Kai',tree);
````

### 任务四

将上面的二维数组，按照每个元素中第二个数从大到小的顺序进行排序输出

```
var arr = [[10, 14], [16, 60], [7, 44], [26, 35], [22, 63]];
```

思路:

1. 自定义comparetor进行自定义比较
2. 如果返回值小于0,则排在数组的前面,大于一则在后面

````js
console.log(arr.sort(function(a,b){
    if(a[1]<b[1]){
        return 1;
    }
    if(a[1]>b[1]){
        return -1;
    }
    return 0;
}));
````

### 任务五

数组转为对象： 

```
var menuArr = [
    [1, "Area1", -1],
    [2, "Area2", -1],
    [3, "Area1-1", 1],
    [4, "Area1-2", 1],
    [5, "Area2-1", 2],
    [6, "Area2-2", 2],
    [7, "Area1-2-3", 4],
    [8, "Area2-2-1", 6],
];
```

数组第一个元素代表的是数组的位置,第二个元素是数组的值,第三个元素是数组父元素的值

思路:

1. 首先 **递归** 遍历这个数组,找到每个元素的父节点
2. 设置父节点的subMenu属性为一个对象{}
3. subMenu对象的节点值指向该节点的name属性

````js
function objectLoop(obj,id){
        var parent = null;
          for(key in obj){
              if(key==id){
                  parent=obj[key];
                  break;
              }
              else if(obj[key].subMenu){
                  parent=objectLoop(obj[key].subMenu,id);
                  if(parent) 
                  break;
              }
          }
          return parent;
      }

    menuArr.map(function(item){
        var keyValue=item[0].toString();
        var keyParent=item[2].toString();
        var parentObj=objectLoop(menuObject,keyParent);
        
        // 头元素
        if(!parentObj){
            menuObject[keyValue] = { name: item[1] };
        }
        else{
            if (!parentObj.subMenu) parentObj.subMenu = {};
            parentObj.subMenu[keyValue]={name:item[1]};
        }
    });
````

# day25-27

### 任务一:

- 当变更任何一个select选择时，更新 result-wrapper 的内容
- 当所选时间早于现在时间时，文案为 现在距离 "所选时间" 已经过去 xxxx
- 当所选时间晚于现在时间时，文案为 现在距离 "所选时间" 还有 xxxx
- 注意当前时间经过所选时间时候的文案变化
- 注意选择不同月份的时候，日期的可选范围不一样，比如1月可以选31天，11月只有30天，注意闰年
- 同样，需要注意，通过优雅的函数封装，使得代码更加可读且可维护

思路:

1. 获取每个select输入框的值,以此为参数初始化一个Date类型的对象,并获取当前的date对象
2. 设定一个每秒刷新的定时器获取两个date类型对象的毫秒的差值,计算相差的时间
3. 当select发生改变(`this.onchange`)时,利用`$('#year-select option:checked') `更新网页中的文本

````js
  var days = mss / (1000 * 60 * 60 * 24);  

  var hours = (mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);  

  var minutes = (mss % (1000 * 60 * 60)) / (1000 * 60);  

  var seconds = (mss % (1000 * 60)) / 1000;

````

# day28-30:

1. 发现用户输入
2. 获取用户输入,通过trim对输入进行去空
3. 生成提示框内容
4. 根据输入框是否有内容,控制提示框的显隐变化



知识点:

1. `input.blur() ` 失去焦点
2. `list.delegate(dom,event,function)` 事件代理
3. `input.select()` 文本的选中
4. `list.each`:jq获取的dom对象列表可以用each方法(和数组的forEach区别开)
5. `dom.classList.add("active")`动态添加类属性
6. `array.filter`对数组每个元素调用函数,返回值true的对象到数组中
7. `list.css('visibility','hidden');`控制dom元素的显示和隐藏,不过获取不到绑定的事件
8. **同时增加`list.css('visibility','hidden')`和`opcapity`属性可以获取到绑定的事件**
9. **最近看到一个var和let声明变量的区别:区别如下**
   + 使用var声明的变量，其作用域为该语句所在的函数内，且存在变量提升现象； 
   + 使用let声明的变量，其作用域为该语句所在的代码块内，不存在变量提升；
   +  使用const声明的是常量，在后面出现的代码中不能再修改该常量的值。 
