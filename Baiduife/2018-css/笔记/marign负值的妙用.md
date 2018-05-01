# marign负值的妙用

### 一、左右列固定，中间列自适应布局

　　此例适用于左右栏宽度固定，中间栏宽度自适应的布局。由于网页的主体部分一般在中间，很多网页都需要中间列优先加载，而这种布局刚好满足此需求。

　　HTML：

```html
<div class="main">
    <div class="main_body">Main</div>
</div>
<div class="left">Left</div>
<div class="right">Right</div>
```

　　CSS：

`margin-left:100%`

```css
body{
        margin:0;
        padding:0;
        min-width:600px;
    }
    .main{
        float:left;
        width:100%;
    }
    .main_body{
        margin:0 210px;
        background:#888;
        height:200px;
    }
    .left,.right{
        float:left;
        width:200px;
        height:200px;
        background:#F60;
    }
    .left{
        margin-left:-100%;
    }
    .right{
        margin-left:-200px;
    }
```

### 二、去除列表右边框

　　项目中经常会使用浮动列表展示信息，为了美观通常为每个列表之间设置一定的间距（margin-right）,当父元素的宽度固定式，每一行的最右端的li元素的右边距就多余了，去除的方法通常是为最右端的li添加class，设置_margin-right:0;_这种方法需要动态判断为哪些li元素添加class，麻烦！！！利用负margin就可以实现下面这种效果：

　　HTML：

```
<div id="test">
    <ul>
        <li>子元素1</li>
        <li>子元素2</li>
        <li>子元素3</li>
        <li>子元素4</li>
        <li>子元素5</li>
        <li>子元素6</li>
    </ul>
</div>
```

　　CSS：

`ul{ margin-right:-10px; zoom:1;}`

 

```css
body,ul,li{ padding:0; margin:0;} 
ul,li{ list-style:none;} 
#test{
  		width:320px; height:210px; background:#CCC;
    } 
#test ul{ 
  		margin-right:-10px; zoom:1;
    } 
#test ul li{ 
  width:100px; height:100px; background:#F60; margin-right:10px; margin-bottom:10px;             float:left;
 }
```

### 三、去除列表最后一个li元素的border-bottom

`border-bottom:1px solid #cccccc;`

`margin-bottom:-1px`

### 四、多列等高

　　此例关键是给每个框设置大的底部内边距，然后用数值相似的负外边距消除这个高度。这会导致每一列溢出容器元素，如果把外包容器的overflow属性设为hidden，列就在最高点被裁切。

　　HTML：

```
<div id="wrap">
    <div id="left">
        <p style="height:50px">style="height:50px"</p>
    </div>
    <div id="center">
        <p style="height:100px">style="height:100px"</p>
    </div>
    <div id="right">
        <p style="height:200px">style="height:200px"</p>
    </div>
</div>
```

　　CSS：

`#left,#center,#right{margin-bottom:-200px;padding-bottom:200px;}`

```css
 body,p{
        margin:0;
        padding:0;
    }
    #wrap{
        overflow:hidden;
        width:580px;
        margin:0 auto;
    }
    #left,#center,#right{
        margin-bottom:-200px;
        padding-bottom:200px;
    }
    #left {
        float:left;
        width:140px;
        background:#777;
    }
    #center {
        float:left;
        width:300px;
        background:#888;
    }
    #right {
        float:right;
        width:140px;
        background:#999;
    }
    p {color:#FFF;text-align:center}
```

![效果图](https://pic002.cnblogs.com/images/2012/389001/2012082813072672.png)
