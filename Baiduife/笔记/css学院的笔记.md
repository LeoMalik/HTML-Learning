### 1.制作一个简单的菜单动画效果:

- 方法1:

  ```html
              <div class="box">
              <p>前端学院</p>
              <div id="showlineleft"></div>
              <div id="showlineRight"></div>
               </div>
  ```

  通过改变div的长度来实现渐变

- 方法2:

  ```html
  <div class="container">
          <h2 class="title">
              百度前端学院
              <i class="line"></i>
          </h2>
          <button class="change">change</button>
      </div>
  ```

  通过改变i的x轴缩放来改变大小

- 方法3:

  ```html
  <h1 class="text">看我看我</h1>
  ```

  ```css
  .text:after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              -ms-transform: translateX(-50%);        /* IE 9 */
              -webkit-transform: translateX(-50%);    /* Safari and Chrome */
              -o-transform: translateX(-50%);        /* Opera */
              -moz-transform: translateX(-50%);        /* Firefox */
              width: 0;
              height: 2px;
              background-color: #ff8bac;
              transition: width .4s;
              -moz-transition: width .4s;    /* Firefox 4 */
              -webkit-transition: width .4s;    /* Safari 和 Chrome */
              -o-transition: width .4s;    /* Opera */
          }
  .text.active {
              color: #ff8bac;
          }
          .text.active:after {
              width: 100%;
          }
  ```

  通过往h1的尾部插入元素,并更改宽度来实现渐变,期中使用js来动态添加active属性

### 2.实现小人的脸部动画

![](https://ws1.sinaimg.cn/large/c364e082gy1fqxga32m9lg20af089q6b.gif)

首先,把脸部分为许多个部分,耳部把transform-origin改成图片所示位置

![img](https://raw.githubusercontent.com/niuweitao777/2018ife/31522c367d0c0bf4bb5787efbfacb0b766653ad0/ife%20CSS/cat%20img/1.jpg)

眼睛分为眼眶和眼球部分,眼眶使用height渐变高度,眼球使用rotateX改变大小,最后是腮红的透明值为1使其显现

![img](https://raw.githubusercontent.com/niuweitao777/2018ife/31522c367d0c0bf4bb5787efbfacb0b766653ad0/ife%20CSS/cat%20img/2.jpg)

嘴巴的微笑使用border-radius改变弧度实现;

```
border-radius: 0% 40% 50% 50%;效果合适  
```

![img](https://raw.githubusercontent.com/niuweitao777/2018ife/cfca21d32b2d2af20790d61054f31b24f7b0300c/ife%20CSS/cat%20img/3.png)

注意的是每个元素都要预先设好过渡的属性,而不是hover以后再设置= =:

```` css
.ear-wrap .left,.ear-wrap .right,.eye-circle,.eye-core,.eye-bottom,.face-red,.mouth{
            transition: all 1s ease-in-out;
            transform-origin:50% 100%;
        }
````

### 3.3D 空间的卡片翻转动效

首先设置两个图片的position为absolute,使其处在同一位置

````css
#left,#right{
            transition: all 0.5s ease-out;
            position: absolute;
            left: 0;
            top: 0;
            backface-visibility: hidden;
        }
````

然后设置舞台元素的3D属性,首先是舞台的透视点元素,这里要设的尽量远,使其透视效果变化很小:

````css
.wrap{
            width:250px;
            height: 350px;
            margin: 1.5em auto;
            perspective: 1000px;
        }
````

然后给容器的子元素设置3D属性:

````css 
.container{
            width:250px;
            margin: 0 auto;
          }
````

最后设置旋转效果,这里给舞台设置旋转效果:

````css 
.wrap:hover .container{
            transform: rotateY(-180deg);
        }
````

完成

### 4.给正方体设置旋转效果:

这个简单,首先设置absolute使每个面一开始都处在同一个平面上,然后老样子

先设置`perspective: 1000px;`

再设置`transform-style: preserve-3d;`

再设置container的旋转效果,

再设置正方体每个面的效果,这里的方法是使每个面在z轴上运动半个变长的距离,然后再进行旋转,

ok,完成

````html
<div class="wrap">
    <div class="container">
        <div class="side front">1</div>
        <div class="side back">6</div>
        <div class="side right">4</div>
        <div class="side left">3</div>
        <div class="side top">5</div>
        <div class="side bottom">2</div>
    </div>
</div>
````

````css
.wrap{
            width: 1000px;
            margin: 0 auto;
            perspective: 1000px;
        }
        .container{
            font-size: 4em;
            width: 2em;
            margin: 1.5em auto;
            transform-style: preserve-3d;
            transition: transform 10s linear;
            transform: rotateY(0);
        }
        .container:hover{
            transform:rotateY(360deg);
        }
        .side{
            width: 2em;
            height: 2em;
            position: absolute;
            background: rgba(255, 99, 71, 0.6);
            color: white;
            text-align: center;
            line-height: 2em;
            border: 1px solid rgba(0,0,0,0.5);
        }
        .front{
            transform: translateZ(1em);
        }
        .back{
            transform: rotateY(180deg) translateZ(1em);
        }
        .right{
            transform: rotateY(-90deg) translateZ(1em);
        }
        .left{
            transform: rotateY(90deg) translateZ(1em);
        }
        .top{
            transform: rotateX(90deg) translateZ(1em);
        }
        .bottom{
            transform: rotateX(-90deg) translateZ(1em);
        }
````

再写一个3d轮播图:

先设置`perspective: 1000px;`

再设置`transform-style: preserve-3d;`

再absolute

然后再设置每个图片的转向,这个时候图片的状态是这样的:

![只设置rotateY时候，众多美女图片挤作一团](http://image.zhangxinxu.com/image/blog/201801/2018-01-02_113143.png)

所以我们还需要把图片向z轴方向前进一段距离;

![旋转木马效果理想方位图 张鑫旭-鑫空间-鑫生活](http://image.zhangxinxu.com/image/blog/201209/diagram.png)

ok,完成

### 3.这次是一个动态相册的效果:

![](https://ws1.sinaimg.cn/large/c364e082gy1fqxhxlt60sg20zv0j2he5.gif)

这是目前我碰到最难的一道题了,一点思路都没有,一开始还想用translate来做,后面发现根本不行...于是就借鉴了一下别人的代码:

首先html结构如下:

````html
</head>
<body>
    <div class="wrap">
        <div class="container">
            <!--name设置为相同值,使得每次只有一个标签为checked-->
            <input  id="img1" name="img" type="radio" class="view" checked>
            <input  id="img2" name="img" type="radio" class="view">
            <input  id="img3" name="img" type="radio" class="view">
            <input  id="img4" name="img" type="radio" class="view">
            <input  id="img5" name="img" type="radio" class="view">
            <label for="img1" class="img1"></label>
            <label for="img2" class="img2"></label>
            <label for="img3" class="img3"></label>
            <label for="img4" class="img4"></label>
            <label for="img5" class="img5"></label>
            <div class="imgList">
                <img src="timg.jpg"/>
                <img src="timg (1).jpg"/>
                <img src="timg (2).jpg"/>
                <img src="timg (3).jpg"/>
                <img src="timg(4).jpg"/>
            </div>

        </div>
    </div>
</body>
</html>
````

我们吧每个图片的小框设为input[radio]属性,这是个很聪明的办法,避免了js的操作(**我们同样可以利用js来给这些标签动态添加样式名,dom.classList.add**)

然后是到了imgList的部分了,这里的img图片都设置宽高占满屏幕height: 100%; width: 100%;



到了最重要的部分了,我们如何实现图片的层级显示呢,这里我们用到的一个属性叫做z-index,

由于img标签是铺满整个屏幕的,所以我们的菜单选项要设置足够高的优先级,使其永远在最顶部显示

label{z-index:10}

然后我们开始给我们的图片菜单设置背景图片,这里注意背景图片要填充满整个小框,所以我们这里用属性background-size: 100%;

接下来就是分配各种动画的时间了,首先要给每个元素分配不同的z-index:

- 菜单:z-index:10;
- 显示中的图片:4
- 刚切换的图片(也就是切换时的背景图片):3
- 普通的图片:2



这里会用到一个新的css选择器`:not`,意思是除此之外的元素,格式如下(**我们同样可以利用js来给这些标签动态添加样式名**):

````css
.view:not(:checked)~.imgList img{
            animation: oncheck 1s linear;
        }
````

当点击菜单时,我们使对应的img的z-index设置为4,切换的背景设置为3,其余的设置为2,这样就完成了我们的设计,代码如下:

````css
 		/*unchecked的图片的视层*/
        .view:not(:checked)~.imgList img{
            animation: oncheck 1s linear; 
        }
        /*选中标签实现图片的放大*/
        .view:nth-child(1):checked~.imgList img:nth-child(1){
            animation: img1 1s ease-out;
            z-index: 4;
        }
        .view:nth-child(2):checked~.imgList img:nth-child(2){
            animation: img2 1s ease-out;
            z-index: 4;
        }
        .view:nth-child(3):checked~.imgList img:nth-child(3){
            animation: img3 1s ease-in;
            z-index: 4;
        }
        .view:nth-child(4):checked~.imgList img:nth-child(4){
            animation: img4 1s ease-out;
            z-index: 4;
        }
        .view:nth-child(5):checked~.imgList img:nth-child(5){
            animation: img5 1s ease-in-out;
            z-index: 4;
        }
        /*关键帧动画*/
        @keyframes oncheck {
            from{
                opacity: 1;
                z-index: 3;
            }
            to{
                opacity: 1;
                z-index: 3;
            }
        }
        @keyframes img1 {
            0%{
                transform: translateX(-500px);
            }
            100%{
                transform: translateX(0);
            }
        }
````

ok完成





### 总结:

1. 了解`perspective: 1000px; ` `transform-style: preserve-3d `的作用 
2. 活用:after :before等伪属性,以及通过js动态添加属性来达到更改样式的目的
3. 熟悉`scale` `rorate` `translate` `@keyframe`的使用,并通过`animation`和`transition:`实现动画效果