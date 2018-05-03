### 第一课 变量:

- **js定义全局变量**:不用var来声明,例y=5;
- 通过`arguments`控制参数


### 第二课 常用方法:

+ 常用函数:Number(),String();

![](https://ws1.sinaimg.cn/large/c364e082gy1fqyfrai2ugj20ai0i60ty.jpg)

### 第三课 函数:

+ 回调函数的代码形式:

````js
function test(a,b,c,callback){
    var arr=[];
    for(var i=0;i<3;i++){
        arr[i]=callback(arguments[i]*2);
    }
    return arr;
}
````



+ 回调函数的使用方式: 

`test.call(function(),param1,param2);`第一个参数填调用的回调函数名,后面的参数填函数的参数;

`test.apply(function(),params);`第一个参数填调用的回调函数名,后面的参数填参数数组



+ 自调函数(立即执行函数):

  ````js
  (function(i){

  	alert(i);

  })(i)

  ````

  ​

函数前面+()，括号后面填参数，自调函数常与 **闭包** 相关联



### 第四课 对象:

![](https://ws1.sinaimg.cn/large/c364e082gy1fqyimwydx1j20rn08nmxm.jpg)

+ 字面量创建:

````js
var x={

	a=1,

	"b"="king",

	c=true

}

````

+ 构造器创建:

````js
function test(a,b){
    this.a=a;
    this.b=b;
}
var obj=new test(1,2);
````

+ object.create创建:

````js
Object.create({x:1})
````



+ 判断对象类型: `obj instanceof test`



### 第五课 对象属性的相关操作:

+ 访问属性: `Object.attribute` `Object[attribute]`
+ 添加/修改属性:`Object.attr=value`
+ 删除属性:`delete Object.attr`  **注意delete只能删除自身属性,不能删除继承属性**
+ 访问方法:`Object.functionName` 

````js
var obj2={
    username:"king",
    age:12,
    addr:"北京",
    sayHi:funciton(){
        return "say hi";
    }
};
obj2.sayHi();
````

访问方法时记得加括号obj2.sayHi **()**;