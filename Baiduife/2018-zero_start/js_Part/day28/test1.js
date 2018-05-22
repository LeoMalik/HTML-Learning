/// <reference path="../../../../typings/index.d.ts" />

$(document).ready(function () {
    var input = $('input');
    var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
    var list = $('ul');
    var line=$(".line");
    var icon=$('.fa-user-o');
    var close=$('.fa-close');
    var count=true;
    // 主体程序
    input.focus();
    checkInput();

    // 检测是否有输入
    function checkInput() {
        console.log(input);
        // 键盘打字设定值
        input.on('keyup', function (e) {
            getUserInput();
            TogglePrompt();
        });
        // 输入框聚焦
        input.on('focus',function(){
            icon.css('opacity','1');
            line.css('transform',"scaleX(1)");
            input.attr('placeholder',"please input");
            close.css('opacity','1');
        });
        // 输入框失去焦点
        input.on('blur',function(){
            line.css('transform',"scaleX(0)");
            icon.css('opacity','0.5');
            close.css('opacity','0');
            input.removeAttr('placeholder');
            list.hide();
        })
        console.log(close);
        
        close.on('click',()=>{input.val("");})
        // 鼠标点击设定值
        list.delegate('li', 'click', function (e) {
            input.val($(this).text());
            list.hide();
            input.focus();
            e.preventDefault();
        });
        checkKeyCode();
    }

    // 键盘事件判定
    function checkKeyCode() {
        // 初始坐标设为0
        var currentIndex = 0;
        document.onkeyup = function (e) {
            var li = $('li');
            // 按键判定

            // 方向键上
            if (e.keyCode == 40) {
                currentIndex++;
                if (currentIndex > 4) {
                    currentIndex = 0;
                }
            }
            //方向键下
            else if (e.keyCode == 38) {
                currentIndex--;
                if (currentIndex < 0) {
                    currentIndex = 4;
                }
            }
            // 回车
            else if (e.keyCode == 13) {
                input.val(li[currentIndex].innerText);
                list.hide();
                input.blur();
                currentIndex = -1;
            } 
            else if(e.keyCode == 27){
                input.select();
            }
            else {
                currentIndex = 0;
            }
            console.log(li);
            // $('ul li').not(':nth-child(1)').removeClass('active');
            if (currentIndex >= 0) {
                li.removeClass('active');
                li[currentIndex].classList.add("active");;
            }
        };
    }

    // 得到用户输入并加入网页元素添加提示
    function getUserInput() {
        var text = input.val().replace(/(^\s*)|(\s*$)/g, ""),
            // 菜单元素
            newList = new Array(),
            // 获取@前元素
            index = text.indexOf("@");
        // 高亮元素
        high_light = [];
        if (index != -1) {
            var text_before = text.slice(0, index),
                text_after = text.slice(index + 1, text.length);

            postfixList.forEach(function (item, index) {
                item = "<li>" + text_before + '@' + item + "</li>";
                newList.push(item);
            });
        } else {
            postfixList.forEach(function (item, index) {
                item = "<li>" + text + '@' + item + "</li>";
                newList.push(item);
            });
        }
        list.html(newList.join(""));
        // 后缀非空则进行以下操作
        if (text_after != null && text_after != "") {
            // 获取li列表
            var prompts = $('#email-sug-wrapper li');
            high_light = qianzhui(text_after);
            high_light.forEach(function (item, index) {
                // 找到前缀匹配的元素
                if (postfixList.indexOf(item) != -1 && prompt) {
                    prompts.each(function () {
                        if ($(this).html().indexOf(item) != -1) {
                            $(this).css("background", "darkcyan");
                        }
                    })
                }
            });
        }
        $('li:first').addClass('active');

    }

    // 控制提示菜单的隐显
    function TogglePrompt() {
        var text = input.val().replace(/(^\s*)|(\s*$)/g, "");
        if (text != null && text != "") {
            list.show();
            // getUserInput();
        } else {
            list.hide();
        }
    }

    // 前缀匹配
    function qianzhui(text_after) {
        var high_light = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
        postfixList.forEach(function (item, index) {
            for (var i = 0; i < text_after.length; i++) {
                // 如果没匹配到后缀文本,则将其从高亮数组中删除
                if (text_after.charAt(i) != item.charAt(i)) {
                    delete(high_light[index]);
                    break;
                }
            }
        });
        // 返回需要高亮的数组
        return high_light.filter(function (val) {
            return !(!val || val === "")
        });
    }

})