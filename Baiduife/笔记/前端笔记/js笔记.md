# 第一节

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
+ 访问方法:`Object.functionName()` 

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

访问方法时**记得加括号**obj2.sayHi **()**;

### 第六课:对象的原型链

每个对象都有一个原型链:

![](https://ws1.sinaimg.cn/large/c364e082gy1fqz0667x1yj20bp0i9wgi.jpg)

+ 在使用或者查找对象的属性时,首先会在对象本身中查找,然后会 **沿原型链顺序自顶向上查找**

+ 对象的不同创建方法对应创建的是原型链的不同位置:

  ![1525423688363](C:\Users\Leo\AppData\Local\Temp\1525423688363.png)

  1. var obj={x:1,y:2} `父级Object.prototype`
  2. function foo(){},`父级foo.prototype`
  3. Object.craete({obj)

+ 检查对象中是否有某个属性:
  1. "x" in obj:`原型链上查找`
  2. obj.hasOwnproprety:`对象本身上查找`

### 第七课 对象属性的特性:

![](https://ws1.sinaimg.cn/large/c364e082gy1fqz5wwl84yj20xu06pagy.jpg)

默认都为true,可以用`defineProperty`来修改特定数据的属性,使其不可修改或者删除等:

语法:

````
Object.defineProperty(obj,x,{
	value:1,
	writable:true
 })

````



### 第八课 对象的存储器属性:get set

其实也就是构造函数

````js
var obj2={
    username:"king",
    addr:"北京",
    get age(){  //注意这里没有冒号
        return 12;
    }
    set age(val){
        this.age=val;
    }
};
obj2.age=15;
obj2.age;
````

### 第九课 对象的特性: 

判断一个类是否是另一个类的父类:`obj.isPrototypeOf(obj1)`

判断对象的类型

### 第十课 数组对象: 

1. arr.join()
2. arr.shift()
3. arr.pop()
4. arr.map()
5. arr.indexOf()













# 第二节

### 第十一课 函数的预处理与执行:

js的解析和执行过程中分为全局和函数两种类型:



+ **<u>全局类型</u>**:在函数运行之前会创建一个词法环境,**先扫描函数声明和var定义的变量**,并定义为undefined.

**在处理函数声明时有冲突,会覆盖,处理变量有冲突,会忽略(函数是优先级最高的一等公民)**



+ **<u>函数类型</u>**:当函数每运行一次时会产生一次词法环境,其他一样,不过当函数有参数时,会直接讲参数的值传入词法环境中



### 第十二课 作用域:

![](https://ws1.sinaimg.cn/large/c364e082gy1fr0p05b9u7j20no05vmyj.jpg)

**<u>块作用域</u>**:js是没有块作用域这个概念的,意思是如果在括号内定义一个变量,在括号外仍然可以使用

函数作用域:了解一下就行

**<u>动态作用域</u>**:指运行时才指定值域,js不能跨函数动态使用变量

````js
function f(){
    alert(x)
}
function f1(){
    var x=5;
    f();
}
function f2(){
    var x=1;
    f1();
}
f2();
````

此时运行f2是得不到想要的结果的

**<u>静态作用域</u>**:每个函数都有其对应的词法作用域,

当函数预处理时,它有自己的词法环境scope,当函数被调用的时候,会产生自己的le,并指向f.scope

子函数同理,查找定义时链式向上查找

![](https://ws1.sinaimg.cn/large/c364e082gy1fr0pgt5ayfj20hh0a3mzz.jpg)

### 第十三课 作用域本质与用途:

在写项目时,为了避免全局变量的大量使用,我们在定义一个函数时,只放出它的接口,这个就是作用域的用途:

记得加window.f=f;

![](https://ws1.sinaimg.cn/large/c364e082gy1fr0u53jbw9j208h06o75h.jpg)

### 第十四课 闭包的含义:

引用自由变量的函数离开了创造它的环境后仍然一同存在.如代码所示

````js
function f1(){
    var a=10;
    var b=20;
    return function f2(){
        console.log(a);
    }
}
var result=f1();
result();
````

这个时候在全局代码中,即使函数f2脱离了函数f1,但是却任旧可以访问a变量



### 第十五课 闭包的理解

闭包并不是要return出去才创建,而是在函数预处理的时候就已经形成了关系链.

### 第十六课 闭包的好处

减少全局变量的使用,减少函数参数的个数,例:

````js
function f1(sum1){
    var value=0;
    function f2(max){
        for(var i=0;i<max;i++){
            value+=i;
        }
    }
    return value+sum1;
}
var result=f1(2);
console.log(result(3));
````

这个时候只需要传入一个参数就可以完成函数的调用

### 第十七课 闭包使用的注意点

+ 父函数每调用一次,就会产生一次闭包
+ 对捕获的父级词法环境的的变量是引用,而不是复制值
+ 循环中创建的变量是全局变量

### 第十八课 对象的创建和访问

````js
var p={
    name:"leo",
    work:function(){
        console.log("working....");
    }
    _age=18,  //约定以_开头的不能更改
    get age(){
    	return this._age;
	},
    set age(val){
        if(val<0||val>150){
            throw new error("invalid");
        }
        else{
            this._age=val;
        }
    }
    
}

````

对象的访问:使用obj.age,或者obj["age"]创建

var result=p&&p.address&&p.address.home

### 第十九课 对象工厂创建对象

````js
function personFactory(name,age){
    return {
        name:name,
        age:age;
    }
}

var p1=personFactory("Leo",20);
var p2=personFactory("Bella",20);

````

### 第二十课 js里的对象(prototype属性)

可以把对象的共同的东西放到原型当中去

````js
function Person(){
    var age=20;//无效
    this.age=30;
    this.name="Leo";
}
Person.prototype.headCount=1;//定义父类属性,只有函数才有prototype属性
var p=new Person();
var p1=new Person();

````

### 第二十一课 _____proto_____属性

 对象都有一个__proto__属性,它指向这个对象对应的父级对象,即使父级对象的值临时被改变,改变前创建的对象建立的联系也不变,就是通过这个proto属性联系的

**和prototpye的区别:**函数才有prototype这个属性,对象只有 _____proto_____属性

### 第二十二课 this和this指向的改变

+ 谁调用的function谁就是this,直接使用函数的话this相当于是windows
+ this指向的改变:`log.call(o,"name")`通过call来改变this的指向,前一个参数指对像,后面的参数指函数参数

### 第二十三课 new的自定义实现

函数的结构要相等,也就是数据部分和 _____proto_____属性都要相等,也就是说,我们new一个对象的时候,只需要传入对象的构造器,以及数据部分,然后返回一个object就能实现new一个对象的效果了

````js
function Person(name,age){
    this.name=name;
    this.age=age;
}
var p1=NEW(Person)("cj",22);

function NEW(f){//f是个构造器函数
    return function(){//这里采用闭包的原因是为了每次调用NEW的时候重新获取引用,防止f.prototype随时更改
        var obj={__proto__:f.prototype};
        f.apply(obj,arguments);
    	return obj; 
    }
}
````

![](https://ws1.sinaimg.cn/large/c364e082gy1fr5j0j54dtj20un0h311z.jpg)

其实根本没有用到person这个对象,只是调用了它的引用,关系如图

### 第二十四课 封装

定义一个对象:

````js
function Person(name){
    //私有变量
    var age=20;
    function showAge(){
        console.log(this.name);
    }
    //公有变量
    this.name=name;
    this.test=function(){
        console.log("test");
        showAge();//公有变量调用私有变量
    };
}
````

这个时候不能达到我们调用私有函数的效果,因为showAge的this指向的是windows,应该改成`showAge.call(this)`



![](https://ws1.sinaimg.cn/large/c364e082gy1fr5j3pgav2j20ur0iyahw.jpg)![](https://ws1.sinaimg.cn/large/c364e082gy1fr5j42x2msj20vu0crtes.jpg)

### 第二十五课 继承

自建create函数实现继承.

![](https://ws1.sinaimg.cn/large/c364e082ly1fr6jgb3drgj20q70ga0sw.jpg)

````js
var p={name:"cj"}

function Create(p){
    var ins;
    function F(){}
    F.prototype=p;
    ins=new F();
    return ins;
}
````

### 第二十六课 原型链

万物皆对象呐...function也可以当做对象来用,..

![](https://ws1.sinaimg.cn/large/c364e082ly1fr6jik8scdj20gs0i30wb.jpg)

### 第二十七课 类的继承

分三步:

1. 创建父类
2. 创建子类
3. 建立关系
4. 构造器的重新指向

````js
function P(name,person){this.name=name;this.person=person}
function C(){}
````



第一种方法:C.prototype=P.prototype,缺点:子类的属性会传给父类

第二种方法:C.prototype=new P();优点:实现了自类属性的隔离缺点:如果p的属性太多汇总造成内存滥用

第三种方法:

````js
function F();
F.prototype=P.prototype;
C.prototype=new F();
//也就是
C.prototype=Object.create(P.prototype);
//构造器的重新指向
C.prototype.constructor=C;

````

### 第二十八课 通用的继承方法

````js
function createEx(Child,Parent){
    function F(){};
    F.prototype=Parent.prototype;
    Child.prototype=new F();
    //构造器的重新指向
    child.prototype.constructor=Child;
    //定义父类调用的接口
    Child.super=child.base=Parent.prototype;
}
function Person(name,age){
    this.name=name;
    this.age=age;
    function eat(){
        console.log("eating....");
    }
}

function Programmer(name,age,title){
    //继承父类的实例成员
    Person.apply(this,arguments);
}

````

必须在prototype重新新指向后再添加属性:

//继承调用父类的私有函数

![](https://ws1.sinaimg.cn/large/c364e082ly1fr77x9l33mj20if07677c.jpg)