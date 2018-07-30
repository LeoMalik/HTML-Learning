## 基础

##### **filters**: 过滤器

````
<div id="app" :class="active">

        <p>{{ message.toLowerCase() | myfilter | to_uppercase }}</p>

    </div>
````



````
new Vue({
        el: '#app',
        data: {
            message: 'Hello World!',
            active: 'active'
        },
        filters: {
            myfilter(value) {
                return value.split('').reverse().join('');
            },
            to_uppercase(value) {
                return value.toUpperCase();
            }
        }
    })
````

##### **bind:class='active'**：绑定属性

##### **v-on:click="add_a"** ：绑定事件

##### **input type="text" v-model="message"** ：双向模型



````
var vm = new Vue({
        el: '#app',
        data: {
            a: 1,
            message: 'Hello VUE'
        },
        computed: {
            b: function () {
                return this.a + 1
            }
        },
        methods: {
            add_a() {
                this.a = this.a + 10
            }
        }
    })
````

普通用法

```
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

v-bind和v-model的联用

```
<input type="radio" v-model="pick" v-bind:value="a">
```

##### **computed:** (setter/getter)：计算器，随着属性的值自动变化

```
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

##### **methods: **方法，需要事件来触发







##### **template**: 网页模板

````
 <div id="app2">
        <ol>
            <todo-item v-for="item in todo_list" :todo="item":key="item.id">			</todo-item>
        </ol>
    </div>
 
 Vue.component('todo-item', {
        props: ['todo'],
        template: '<li>{{todo.text}}</li>',
    })
    var vm2 = new Vue({
        el: '#app2',
        data: {
            todo_list: [{
                    id: 0,
                    text: 'item0'
                },
                {
                    id: 1,
                    text: 'item1'
                },
                {
                    id: 2,
                    text: 'item2'
                },
            ]
        }
    })
````

##### **事件修饰符** ：，防止冒泡等等

- `.stop`  //阻止事件继续传播 即阻止它的捕获和冒泡过程  
- `.prevent` //阻止默认事件发生 即event.preventdefault():  
- `.capture`  //添加事件监听器时使用事件捕获模式，即在捕获模式下触发 ，优先触发定义了捕捉到元素
- `.self ` //当前元素自身时触发处理函数时才会触发函数，原理：是根据event.target确定是否当前元素本身，来决定是否触发的事件/函数  
- `.once`//只触发一次  

##### **按键修饰符**：

全部的按键别名：

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

```
<input v-on:keyup.enter="submit">
```

**鼠标修饰符**

> 2.2.0 新增

- `.left`
- `.right`
- `.middle`

这些修饰符会限制处理函数仅响应特定的鼠标按钮

##### **v-bind:class** ： 可以传一组数组给class

```
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

##### **v-bind:style** ：传一个css给标签



##### **v-if,v-for,v-show**

当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。 



##### **Vue.set** 改变数组元素

如果使用数组下标来改变数组元素，那么此改变不是响应性的，需要用到

```
Vue.set(vm.items, indexOfItem, newValue)
```

同样动态添加实例也不是响应式的

```
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```

````
Vue.set(vm.userProfile,'age',27)
````

## 组件基础

### [通过 Prop 向子组件传递数据](https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87-Prop-%E5%90%91%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE)

早些时候，我们提到了创建一个博文组件的事情。问题是如果你不能向这个组件传递某一篇博文的标题或内容之类的我们想展示的数据的话，它是没有办法使用的。这也正是 prop 的由来。

Prop 是你可以在组件上注册的一些自定义特性。当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。为了给博文组件传递一个标题，我们可以用一个 `props` 选项将其包含在该组件可接受的 prop 列表中：

```
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```

一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。在上述模板中，你会发现我们能够在组件实例中访问这个值，就像访问 `data` 中的值一样。

一个 prop 被注册之后，你就可以像这样把数据作为一个自定义特性传递进来：

```
<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>
```

My journey with Vue

Blogging with Vue

Why Vue is so fun

然而在一个典型的应用中，你可能在 `data` 里有一个博文的数组：

```
new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})
```

并想要为每篇博文渲染一个组件：

```
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
```

如上所示，你会发现我们可以使用 `v-bind` 来动态传递 prop。这在你一开始不清楚要渲染的具体内容，比如[从一个 API 获取博文列表](https://jsfiddle.net/chrisvfritz/sbLgr0ad)的时候，是非常有用的。

到目前为止，关于 prop 你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把 [prop](https://cn.vuejs.org/v2/guide/components-props.html) 读完。



### [通过事件向父级组件发送消息](https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87%E4%BA%8B%E4%BB%B6%E5%90%91%E7%88%B6%E7%BA%A7%E7%BB%84%E4%BB%B6%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF)

当构建一个 `<blog-post>` 组件时，你的模板最终会包含的东西远不止一个标题：

```
<h3>{{ title }}</h3>
```

最最起码，你会包含这篇博文的正文：

```
<h3>{{ title }}</h3>
<div v-html="content"></div>
```

然而如果你在模板中尝试这样写，Vue 会显示一个错误，并解释道 **every component must have a single root element (每个组件必须只有一个根元素)**。你可以将模板的内容包裹在一个父元素内，来修复这个问题，例如：

```
<div class="blog-post">
  <h3>{{ title }}</h3>
  <div v-html="content"></div>
</div>
```

看起来当组件变得越来越复杂的时候，我们的博文不只需要标题和内容，还需要发布日期、评论等等。为每个相关的信息定义一个 prop 会变得很麻烦：

```
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
  v-bind:content="post.content"
  v-bind:publishedAt="post.publishedAt"
  v-bind:comments="post.comments"
></blog-post>
```

所以是时候重构一下这个 `<blog-post>` 组件了，让它变成接受一个单独的 `post` prop：

```
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
></blog-post>
```

```
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})
```

上述的这个和一些接下来的示例使用了 JavaScript 的[模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals)来让多行的模板更易读。它们在 IE 下并没有被支持，所以如果你需要在不 (经过 Babel 或 TypeScript 之类的工具) 编译的情况下支持 IE，请使用[折行转义字符](https://css-tricks.com/snippets/javascript/multiline-string-variables-in-javascript/)取而代之。

现在，不论何时为 `post` 对象添加一个新的属性，它都会自动地在 `<blog-post>` 内可用。



### [使用事件抛出一个值](https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8%E4%BA%8B%E4%BB%B6%E6%8A%9B%E5%87%BA%E4%B8%80%E4%B8%AA%E5%80%BC)

有的时候用一个事件来抛出一个特定的值是非常有用的。例如我们可能想让 `<blog-post>`组件决定它的文本要放大多少。这时可以使用 `$emit` 的第二个参数来提供这个值：

```
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
```

然后当在父级组件监听这个事件的时候，我们可以通过 `$event` 访问到被抛出的这个值：

```
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
```

或者，如果这个事件处理函数是一个方法：

```
<blog-post
  ...
  v-on:enlarge-text="onEnlargeText"
></blog-post>
```

那么这个值将会作为第一个参数传入这个方法：

```
methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

### [在组件上使用 `v-model`](https://cn.vuejs.org/v2/guide/components.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model)

自定义事件也可以用于创建支持 `v-model` 的自定义输入组件。记住：

```
<input v-model="searchText">
```

等价于：

```
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

当用在组件上时，`v-model` 则会这样：

```
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```

为了让它正常工作，这个组件内的 `<input>` 必须：

- 将其 `value` 特性绑定到一个名叫 `value` 的 prop 上
- 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出

写成代码之后是这样的：

```
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```

现在 `v-model` 就应该可以在这个组件上完美地工作起来了：

```
<custom-input v-model="searchText"></custom-input>
```

到目前为止，关于组件自定义事件你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把[自定义事件](https://cn.vuejs.org/v2/guide/components-custom-events.html)读完。

### [通过插槽分发内容](https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87%E6%8F%92%E6%A7%BD%E5%88%86%E5%8F%91%E5%86%85%E5%AE%B9)

和 HTML 元素一样，我们经常需要向一个组件传递内容，像这样：

```
<alert-box>
  Something bad happened.
</alert-box>
```

可能会渲染出这样的东西：

**Error!** Something bad happened.

幸好，Vue 自定义的 `<slot>` 元素让这变得非常简单：

```
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

如你所见，我们只要在需要的地方加入插槽就行了——就这么简单！

到目前为止，关于插槽你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把[插槽](https://cn.vuejs.org/v2/guide/components-slots.html)读完。

### [动态组件](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6)

有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里：

Home component

上述内容可以通过 Vue 的 `<component>` 元素加一个特殊的 `is` 特性来实现：

```
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```

在上述示例中，`currentTabComponent` 可以包括

- 已注册组件的名字，或
- 一个组件的选项对象

你可以在[这里](https://jsfiddle.net/chrisvfritz/o3nycadu/)查阅并体验完整的代码，或在[这个版本](https://jsfiddle.net/chrisvfritz/b2qj69o1/)了解绑定组件选项对象，而不是已注册组件名的示例。

到目前为止，关于动态组件你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把[动态和异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html)读完。

### [解析 DOM 模板时的注意事项](https://cn.vuejs.org/v2/guide/components.html#%E8%A7%A3%E6%9E%90-DOM-%E6%A8%A1%E6%9D%BF%E6%97%B6%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)

有些 HTML 元素，诸如 `<ul>`、`<ol>`、`<table>` 和 `<select>`，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 `<li>`、`<tr>` 和 `<option>`，只能出现在其它某些特定的元素内部。

这会导致我们使用这些有约束条件的元素时遇到一些问题。例如：

```
<table>
  <blog-post-row></blog-post-row>
</table>
```

这个自定义组件 `<blog-post-row>` 会被作为无效的内容提升到外部，并导致最终渲染结果出错。幸好这个特殊的 `is` 特性给了我们一个变通的办法：

```
<table>
  <tr is="blog-post-row"></tr>
</table>
```

需要注意的是**如果我们从以下来源使用模板的话，这条限制是不存在的**：

- 字符串 (例如：`template: '...'`)
- [单文件组件 (`.vue`)](https://cn.vuejs.org/v2/guide/single-file-components.html)
- [``](https://cn.vuejs.org/v2/guide/components-edge-cases.html#X-Templates)

到这里，你需要了解的解析 DOM 模板时的注意事项——实际上也是 Vue 的全部*必要内容*，大概就是这些了。恭喜你！接下来还有很多东西要去学习，不过首先，我们推荐你先休息一下，试用一下 Vue，自己随意做些好玩的东西。

如果你感觉已经掌握了这些知识，我们推荐你再回来把完整的组件指南，包括侧边栏中组件深入章节的所有页面读完。

## vue-cli 开启一个项目

![1531985137386](C:\Users\Leo\AppData\Local\Temp\1531985137386.png)



目录结构：

![1531964949294](C:\Users\Leo\AppData\Local\Temp\1531964949294.png)，

node_modules：自带的模块

.babelrc：项目的转换配置（es6转es5，功能的拓展）

.editconfig：编辑器的配置





