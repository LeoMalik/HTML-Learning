# css的2D 3D转换

### 1.transform:

元素可以按照设定的值变形、旋转、缩放、倾斜

##### 语法：

`transform ： none | <transform-function> [ <transform-function> ]*`  
transform-function list:

- `matrix() = matrix(<number>[,<number>]{5,5})`  以一个含六值的(a,b,c,d,e,f)变换矩阵的形式指定一个2D变换，相当于直接应用一个\[a,b,c,d,e,f\]变换矩阵
- `matrix3d() = matrix3d(<number>[,<number>]{15,15})`以一个含九值的变换矩阵的形式指定一个3D变换
- `translate() = translate(<translation-value>[,<translation-value>]?)`平移
- `translate3d() = translate3d(<translation-value>,<translation-value>,<length>)`
- `translatex() = translatex(<translation-value>)`x轴方向上的平移
- `translatey() = translatey(<translation-value>)`y轴方向上的平移
- `translatez() = translatez(<length>)`
- `[transform-origin]`旋转的中心点:left,center,right,top等
- `rotate() = rotate(<angle>)`指定对象的2D rotation（2D旋转），需先有`[transform-origin]` (定义旋转的基点)属性的定义
- `rotate3d() = rotate3d(<number>,<number>,<number>,<angle>)`
- `rotatex() = rotatex(<angle>)`
- `rotatey() = rotatey(<angle>)`
- `rotatez() = rotatez(<angle>)`
- `scale() = scale(<number>[,<number>]?)`缩放
- `scale3d() = scale3d(<number>,<number>,<number>)`
- `scalex() = scalex(<number>)`
- `scaley() = scaley(<number>)`
- `scalez() = scalez(<number>)`
- `skew() = skew(<angle>[,<angle>]?)`拉伸
- `skewx() = skewx(<angle>)`
- `skewy() = skewy(<angle>)`
- `perspective() = perspective(<length>)`

### 2.transition:

`transition: all .5s ease-in-out 1s;`所有动画在0.5s内过渡完成，方式是ease-in-out，延迟1s执行

### 3.animation:

##### 语法：

`animation：<single-animation>[,<single-animation>]*`

```
<single-animation> = <single-animation-name> || <time> || <single-animation-timing-function>
 || <time> || <single-animation-iteration-count> || <single-animation-direction> ||
  <single-animation-fill-mode> || <single-animation-play-state>
```

<' animation-name '>：检索或设置对象所应用的动画名称  
<' animation-duration '>：检索或设置对象动画的持续时间  
<' animation-timing-function '>：检索或设置对象动画的过渡类型  
<' animation-delay '>：检索或设置对象动画延迟的时间  
<' animation-iteration-count '>：检索或设置对象动画的循环次数  
<' animation-direction '>：检索或设置对象动画在循环中是否反向运动  
<' animation-fill-mode '>：检索或设置对象动画时间之外的状态  
<' animation-play-state '>：检索或设置对象动画的状态。

##### 实例：

```css
.animation:hover{
    -webkit-animation:animated_div 5s 1;
    -moz-animation:animated_div 5s 1;
    animation:animated_div 5s 1;
}
@keyframes animated_div{
    0%      {transform: rotate(0deg);left:0px;}
    25%     {transform: rotate(20deg);left:0px;}
    50%     {transform: rotate(0deg);left:500px;}
    55%     {transform: rotate(0deg);left:500px;}
    70%     {transform: rotate(0deg);left:500px;background:#1ec7e6;}
    100%    {transform: rotate(-360deg);left:0px;}
}
```
