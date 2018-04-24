window.onload=load();

function load() {
    var dragBlock = $(".drag-block"); //最外层容器
    var leftUl = $(".left-ul"); //左边ul
    var rightUl = $(".right-ul"); //右边ul
    var aLi = dragBlock.getElementsByTagName("li");

    changeColor(dragBlock);

    /*改变颜色*/
    function changeColor(element) {
        var oLi = element.getElementsByTagName("li");
        for (var i = 0, len = oLi.length; i < len; i++) {
            oLi[i].style.backgroundColor = '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
        }
    }

    toAbsolute(dragBlock, "li");

    function toAbsolute(element, child) {
        var childs = element.getElementsByTagName(child);
        var childArr = [];
        for (var i = 0; i < childs.length; i++) {
            childArr[i] = {
                left: childs[i].offsetLeft,
                top: childs[i].offsetTop
            };
        }
        for (i = 0; i < childs.length; i++) {
            childs[i].style.left = childArr[i].left + "px";
            childs[i].style.top = childArr[i].top + "px";
            childs[i].style.position = "absolute";
            childs[i].style.margin = "0";
            childs[i].index = i;
        }
    }

    delegateEvent(dragBlock, "li", "mousedown", function (ev) {
        var oEvent = ev || event;
        var disX = oEvent.clientX - this.offsetLeft;
        var disY = oEvent.clientY - this.offsetTop;
        var that = this; //缓存this
        //添加鼠标移动及跳出事件
        addEvent(document, "mousemove", onmousemove);
        addEvent(document, "mouseup", onmouseup);

        var createLi = document.createElement("li");
        createLi.style.left = that.offsetLeft + "px";
        createLi.style.top = that.offsetTop + "px";
        createLi.className = "create-active";
        createLi.style.position = "absolute";
        that.parentNode.appendChild(createLi);

        //保存原始位置
        var originLeft = createLi.style.left;
        var originTop = createLi.style.top;

        var createActivePar = createLi.parentNode;
        //拖拽时透明度改变
        that.style.opacity = "0.5";

        function onmousemove(ev) {
            var oEvent = ev || event;
            var dragL = oEvent.clientX - disX;
            var dragT = oEvent.clientY - disY;

            //边界限制
            var winWidth = document.body.clientWidth || document.documentElement.clientWidth;
            var winHeight = document.body.clientHeight || document.documentElement.clientHeight;
            // console.log(winWidth + "," + winHeight)
            if (dragL < -40) {
                dragL = -40;
            } else if (dragL >= (winWidth - that.offsetWidth)) {
                dragL = winWidth - that.offsetWidth - that.offsetWidth / 2;
            }
            if (dragT < -40) {
                dragT = -40;
            } else if (dragT >= (winHeight - that.offsetHeight)) {
                dragT = winHeight - that.offsetHeight;
            }


            that.style.left = dragL + "px";
            that.style.top = dragT + "px";

            var oNear = findNearest(that);
            if (oNear) {
                addClass(oNear, "active");
            }
        }

        function onmouseup() {
            removeEvent(document, "onmousedown", onmousemove);
            removeEvent(document, "onmouseup", onmouseup);

            var oNear = findNearest(that);

            //鼠标抬起，碰撞到的情况
            if (oNear) {
                //如果碰撞不发生在同一父级中
                if (that.parentNode !== oNear.parentNode) {
                    oNear.parentNode.insertBefore(that, oNear);
                    that.style.left = oNear.style.left;
                    that.style.top = oNear.style.top;
                    var oNearLi = oNear.parentNode.getElementsByTagName("li");
                    var thatLi = createActivePar.getElementsByTagName("li");

                    //添加过去后处理位置
                    for (var i = getIndex(that) + 1, len = oNearLi.length; i < len; i++) {
                        oNearLi[i].style.left = that.style.left;
                        oNearLi[i].style.top = that.offsetHeight + oNearLi[i].offsetTop + "px";
                    }

                    //处理原位置。
                    for (var j = 0, thatLen = thatLi.length; j < thatLen; j++) {
                        if (j === 0) {
                            thatLi[0].style.left = createActivePar.offsetLeft + 1 + "px";
                            thatLi[0].style.top = createActivePar.offsetTop + 1 + "px";
                        } else {
                            thatLi[j].style.left = thatLi[j - 1].style.left;
                            thatLi[j].style.top = that.offsetHeight + thatLi[j - 1].offsetTop + "px";
                        }

                    }

                } else {
                    //碰撞发生在同一父级的情况
                    //交换位置
                    that.style.left = oNear.style.left;
                    that.style.top = oNear.style.top;
                    oNear.style.left = originLeft + "px";
                    oNear.style.top = originTop + "px";

                }

            } else {
                //未碰撞到的情况
                //再来判断是不是与对面的父容器碰撞到了，调用函数
                if (that.parentNode === leftUl) {
                    appChild(that, rightUl);

                } else {
                    appChild(that, leftUl);

                }

            }
            createLi.parentNode.removeChild(createLi);
            that.style.opacity = "1";
        }
        function appChild(obj, parent) {
            //碰撞对面父级元素的情况
            if (hitDetection(obj, parent)) {
                var oLi = parent.getElementsByTagName("li");
                var len = oLi.length;
                parent.appendChild(obj);
                //新父元素内没有li的情况
                if (len) {
                    obj.style.left = oLi[0].style.left;
                    obj.style.top = oLi[len - 1].offsetTop + oLi[0].offsetHeight + "px";
                } else {
                    obj.style.left = parent.offsetLeft + 1 + "px";
                    obj.style.top = parent.offsetTop + 1 + "px";
                }

                //处理原位置。
                var thatLi = createActivePar.getElementsByTagName("li");
                for (var j = 0, thatLen = thatLi.length; j < thatLen; j++) {
                    if (j === 0) {
                        thatLi[0].style.left = createActivePar.offsetLeft + 1 + "px";
                        thatLi[0].style.top = createActivePar.offsetTop + 1 + "px";
                    } else {
                        thatLi[j].style.left = thatLi[j - 1].style.left;
                        thatLi[j].style.top = that.offsetHeight + thatLi[j - 1].offsetTop + "px";
                    }

                }
            } else {
                //未碰撞到时返回原位置
                startMove(obj, {left: originalLeft, top: originalTop}, function () {
                    obj.style.left = originalLeft + "px";
                    obj.style.top = originalTop + "px";
                });
            }
        }

        clearInterval(that.timer); //处理在未碰撞到时，回到原位置途中再次拖拽的问题。不然会闪屏
    });
    function hitDetection(obj1, obj2) {
        //对象1的相关值
        var l1 = obj1.offsetLeft;
        var r1 = obj1.offsetLeft + obj1.offsetWidth;
        var t1 = obj1.offsetTop;
        var b1 = obj1.offsetTop + obj1.offsetHeight;
        //对象2的相关值
        var l2 = obj2.offsetLeft;
        var r2 = obj2.offsetLeft + obj2.offsetWidth;
        var t2 = obj2.offsetTop;
        var b2 = obj2.offsetTop + obj2.offsetHeight;

        if (l1 > r2 || r1 < l2 || b1 < t2 || t1 > b2) {
            return false;
        } else {
            return true;
        }
    }
    //获取两点直线的距离
    function getDis(obj1, obj2) {
        var a = obj1.offsetLeft - obj2.offsetLeft;
        var b = obj1.offsetTop - obj2.offsetTop;
        return Math.sqrt(a * a + b * b);
    }
    //获取距离最近的元素
    function findNearest(obj) {
        var iMin = 99999999;
        var iMinIndex = -1;
        for (var i = 0, len = aLi.length; i < len; i++) {
            if (obj == aLi[i]) {
                continue;
            }

            if (hitDetection(obj, aLi[i])) {
                var dis = getDis(obj, aLi[i]);

                if (iMin > dis) {
                    iMin = dis;
                    iMinIndex = i;
                }
                if (iMinIndex == -1) {
                    return null;
                } else {
                    return aLi[iMinIndex];
                }
            }

        }
    }

}