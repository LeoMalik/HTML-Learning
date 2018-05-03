### js的闭包

现在看起来正常多了吧，但我们想实现通过鼠标任意点击其中一个小圆点，切换到相应的图片，原理同样，我们还是需要通过偏移量去找到对应的图片。

```
  for (var i = 0; i < buttons.length; i++) {
            buttons[i].onclick = function () {
                // 在浏览器的控制台打印一下，看看结果
                console.log(i);

                /* 偏移量获取：这里获得鼠标移动到小圆点的位置，用this把index绑定到对象buttons[i]上，去谷歌this的用法  */
                /* 由于这里的index是自定义属性，需要用到getAttribute()这个DOM2级方法，去获取自定义index的属性*/
                var clickIndex = parseInt(this.getAttribute('index'));
                var offset = 600 * (index - clickIndex);
                animate(offset); //存放鼠标点击后的位置，用于小圆点的正常显示 
                index = clickIndex;
                buttonsShow();
            }
        }
```

到这一步时，以为大功告成？你在控制台会发现打印出来的永远的是i=5。

错误原因：没有正确获取i值，使用闭包就可以了。你在高级程序设计第三版中76页，会看到这么一句话：

​            **“对javascript来说，由for语句创建的变量i即使在for循环执行结束后，也依旧会存在于循环外部的执行环境中。”**

就是说，js没有块级作用域这东西，（可能我C写多了，混淆了）。在第一次循环（从 i=0 到 4 这一过程）结束后，最后的 i 获取到的为 *buttons.length* 的值被

保存在for循环之外，最后鼠标点击任何一个小圆点时，自然访问的一直是 i=5 了。

正确代码如下：

```
    for (var i = 0; i < buttons.length; i++) {
                // 这里使用的是立即执行函数，
                (function(i) {
                    buttons[i].onclick = function() {
                        var clickIndex = parseInt(this.getAttribute('index'));
                        var offset = 600 * (index - clickIndex); 
                        animate(offset);
                        index = clickIndex;
                        buttonsShow();
                    }
                })(i)
            }
```