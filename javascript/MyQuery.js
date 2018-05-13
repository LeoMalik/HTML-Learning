(function (){
    // 暂存全局变量以供后续使用
    var _$=window.$;
    var _jQuery=window.jQuery;

    var jQuery=window.jQuery=window.$=function(selector){
        return jQuery.fn.init(selector);
    }
    jQuery.fn=jQuery.prototype={
        init:function(selector){
            var element=document.getElementsByTagName(selector);
            Array.prototype.push.apply(this,element);
            return this;
        },
        jQuery:"1.0.0",
        size:function(){
            return this.length;
        },
        deepCopy:function (p,c){
            for(var ele in p){
                if(typeof(ele)== "object"){
                    c[ele]=(p[ele].constructor===Array)?[]:{};
                    deepCopy(p[ele],c[ele]);
                }
                else{
                    c[ele]=p[ele];
                }
            }
        }
    };
    // 用作构造器初始化时原型指向本身(而不是windows)
    jQuery.fn.init.prototype=jQuery.prototype;
    
    jQuery.extend=jQuery.fn.extend=function(){
        var o=arguments[0];
        for(var p in o){
            this[p]=o[p];
        }
    }
    // 添加静态方法
    jQuery.extend({
        trim:function(text){
			return (text||"").replace(/^\s+|\s+$/g,"");
		},
        NoConflict:function(){
            window.$ = _$;
            window.jQuery = _jQuery;
            return jQuery;
        }
    })
    // 添加实例方法
    jQuery.fn.extend({
        get:function(index){
            return this[index];
        },
        each:function(fn){
            for(var i=0;i<this.length;i++){
                fn(i,this[i]);
            }
            return this;
        },
        css:function(){
            var l=arguments.length;
            if(l==1){
                return this[0].style[arguments[0]];
            }
            else{
                var name=arguments[0];
                var value=arguments[1];
                this.each(function(index,ele){
                    ele.style[name]=value;
                })
            }
            return this;
        }
    });
})();