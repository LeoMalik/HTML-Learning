### 选择器

部分解释:

li:not(li:first):除了第一个li元素

+ li:contains(second-level):li元素里包含该文本内容
+ li:has(a):li元素里包含a子元素

:header:所有h标签

:animated:所有动画效果

li:(even):所有偶数的li元素

li:eq(1):第一个li

li:first-child:所有父级元素下的第一个li

li.toggle():如果被选元素可见，则隐藏这些元素，如果被选元素隐藏，则显示这些元素。实现切换效果

![](https://ws1.sinaimg.cn/large/c364e082gy1frbb903zezj20cx0nm79j.jpg)



![](https://ws1.sinaimg.cn/large/c364e082gy1frbbokywc1j206h083q4d.jpg)







### dom操作

获取指定内容,如果没有传入参数，像`$('div').html()`则为get，返回一个值，若传入参数,如`$('div').html("<p>666<p>")`则为set，可设定dom元素的值

+ **每个操作dom的函数的参数都可以为function形式或者对象形式，function自带的参数视情况而定**

````js
$('div').html(function(index,html){
    alert(""+index+":"+html);
})

$('div').css('font-size','30px');
$('div').css({
    'font-size':'30px',
    'color':'yellow'
});
$('div').css(function(index,oldValue){
    alert(oldValue);
    return "40px"//return的值作为新的属性赋给dom元素
})
````

1. append():添加在父元素的子元素之后.
2. prepend():添加在父元素的子元素之前
3. before:添加在父元素之前
4. toggleClass():如果被选元素有对应属性,则删去,否则则加入,实现切换效果
5. .detach():解除元素并保留handler属性
6. wrap():对指定的元素进行外包裹
7. clone():传递一个元素的克隆

![](https://ws1.sinaimg.cn/large/c364e082gy1frc2vxlmqcj20cl08utcc.jpg)



### js事件:

可以用`$('div').on('click',function(){})`绑定事件

![](https://ws1.sinaimg.cn/large/c364e082gy1frc2okk83qj20e10idk2y.jpg)



### css的动画

![](https://ws1.sinaimg.cn/large/c364e082gy1frcdtvqk6aj20bd05tmzg.jpg)

传递参数:速度和回调函数

````js
//先执行从上往下过渡的效果,再执行从下往上
$('btn1').on("click",function(){
    $(".result").slideUp('1000',function(){
        $(".result").slideDown("fast");
    })
})
````

自定义动画:

````js
$("result").animate(
    {
        width:100%,
     	height:100%
    },1000,'linear').hide(1000);
````



### Ajax

![](https://ws1.sinaimg.cn/large/c364e082gy1frce4huwcyj20dx0hs7bq.jpg)

1. load方法

````js
$(document).ready(function(){
    $('button').on('click',function(){
        var ajax_load="<img src='loading.gif' alt=loading.../>";
        //此文件夹中包含了一个html文件
        var loadapi="/api";
        
        $("#result").html(ajax_load).load(loadUrl,null,function(){
            alert($('#result').html());
        });
    });
});
````

2. get方法：大致相同，只不过要传入json对象作为get的参数

    ````js
      $(document).ready(function(){
       $('button').on('click',function(){
           //将json对象传入url,然后返回/api下的data
           $.get("/api",{action:get,name:"leo"},function(data,textstatus){
               alert(data);
           });
       });
      });
    ````

   通用(最常用)配置$.ajax

   ![](https://ws1.sinaimg.cn/large/c364e082gy1frchy1js0jj20d20gfjxk.jpg)![](https://ws1.sinaimg.cn/large/c364e082gy1frci02kodwj20u40iote3.jpg)

complete:每次执行都会调用

success:成功时调用

error:失败时调用

beforeSend:在发送数据前调用，可以添加一些加载效果，在完成调用后移除

cache:有些时候return的object没有变化，可能是cache设置为true保存了缓存，设置为false即可



### jquery UI

![1526437169970](C:\Users\Leo\AppData\Local\Temp\1526437169970.png)

1. $.draggable({}),

![1526437192934](C:\Users\Leo\AppData\Local\Temp\1526437192934.png)![1526437605032](C:\Users\Leo\AppData\Local\Temp\1526437605032.png)

2. droppable({}),

   ![1526437465057](C:\Users\Leo\AppData\Local\Temp\1526437465057.png)![1526437586391](C:\Users\Leo\AppData\Local\Temp\1526437586391.png)

3. sortable({})

   ![1526437509184](C:\Users\Leo\AppData\Local\Temp\1526437509184.png)![1526437562602](C:\Users\Leo\AppData\Local\Temp\1526437562602.png)

4. selectable()

   ![1526437547571](C:\Users\Leo\AppData\Local\Temp\1526437547571.png)![1526437631001](C:\Users\Leo\AppData\Local\Temp\1526437631001.png)

5. accordion({})

![1526437685479](C:\Users\Leo\AppData\Local\Temp\1526437685479.png)![1526437693060](C:\Users\Leo\AppData\Local\Temp\1526437693060.png)

6. slider()

   ![1526437844745](C:\Users\Leo\AppData\Local\Temp\1526437844745.png)

   ![1526437799627](C:\Users\Leo\AppData\Local\Temp\1526437799627.png)

7. tablesorter()

   ![1526437875549](C:\Users\Leo\AppData\Local\Temp\1526437875549.png)![1526437882593](C:\Users\Leo\AppData\Local\Temp\1526437882593.png)