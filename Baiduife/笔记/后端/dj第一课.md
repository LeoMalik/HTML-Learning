# 项目初始化

## 创建app

````python
startapp users
````

## 创建apps文件夹管理app

设置apps为source root，并在setting中设置，使操作系统能查询到该文件夹下的apps

````
import sys
sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))
````

## 注册app

## 导入依赖

`pip install -r requirements.txt`

## 设置database 

````
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', #修改成mysql
        'NAME': 'DatabaseName',  #需要连接的数据库的名字
        'USER': ‘USERNAME’,  #安装mysql时的用户名
        'PASSWORD': ‘PWD’, #安装mysql时的密码
        'HOST': '127.0.0.1', #本地
    }
}
````

## 配置setting下的template模板位置

https://www.jianshu.com/p/304bbd3fe261

```
TEMPLATES = [
    {
        ````
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
    }
```

## 配置url映射

可以给映射起名字，这样以后调用名字就可以了，地址随便改

```
from django.conf.urls import url

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^form/$', getform,name = 'go_form'),
]
```

## 配置静态文件目录

```
STATIC_URL = '/static/'    #定义静态文件目录
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static')   #声明静态文件所在位置
]

```

## django的路径配置

django的路径配置不能像html一样配置xxx.html，可以使用django自带的语法

` {% load staticfiles %}` 这样映入static文件，就可以用

`{% static "my_app/myexample.jpg" %}`来引用路径





# template模板与数据库的联用

## 数据传递到模板里

````
<label>
		<input id="add" name="add" value="{{my_message.name}}">
</label>
````

## django中的if语句

````
<input id="add" name="add" value="{% if my_message.name == "test" %}  changedtest{% endif %}">
````



## template函数

````
<input id="add" name="add" value="{% if my_message.name|slice:'5' == "test" %}  changedtest{% endif %}">

````

## 配置表单

```
<form action="/form/" method="post" class="">  
<form action="{% url 'go_form' %}" method="post" class="">  
	<label>
		<input id="add" name="add">
	</label>
<form>

{% csrf_token %}
```

form传送的信息以name(add)-value存储在名为post的字典中

## 数据存储

```
if request.method == "post" :

	name = request.POST.get('name','')

	``````

	usermsg=UserMessage()		#类名

	username.name=name

	``````

	usermsg.save()
```

## 数据删除

```
messages=UserMessage.objects.filter(name='boddy',address='beijing')

for message in messages:

	message.delete()
```

# 设计app

根据具体项目设计不同的app

## 自定义user的model

```
from django.contrib.auth.models import AbstractUser
```

然后重写自己的类

meta信息里可以自定义存储到数据库表的名字,排列顺序等

```python
class UserProfile(AbstractUser):
    #这里是继承了自带的AbstractUser来覆盖自带的user表段的属性，例如regesist_time等，只有需要这个属性才会继承AbstractUser，否则继承model.Model就行
    nick_name = models.CharField(max_length=50, verbose_name=u'昵称', blank=True, null=True)
    birthday = models.DateField(verbose_name=u'生日', blank=True, null=True)
    address = models.CharField(max_length=100, verbose_name=u'地址', blank=True, null=True)
    age = models.IntegerField(verbose_name=u'年龄', blank=True, null=True)
    gender = models.CharField(max_length=10, choices=(('Female', u'女'), ('Male', '男')), verbose_name=u'性别', default='Male')
    image = models.ImageField(upload_to='images/%Y/%m',default=u"image/default.png",max_length-100,verbose_name=u'头像')
    
    class Meta:
        verbose_name = u'用户信息'
        
        db_table="user_message"
        
       	ordering="object-id"
        verbose_name_plural = verbose_name

    def __unicode__(self):
        return self.username

```

最后在setting里覆盖原来user的model

```
AUTH_USER_MODEL = "users.UserProfile"
```

## 自定义其他的model

首先根据网页,判断需要存储哪些信息,设计表

如果遇到循环调用的情况（例如user表需要调用course表的课程，course需要调用user表的人数）：则需要设计一个更高级的表operation表来管理表之间的联系

```python
# operation/models.py

from datetime import datetime

from django.db import models

from course.models import Course
from users.models import UserProfile


class UserAsk(models.Model):
    '''用户咨询'''
    name = models.CharField('姓名',max_length=20)
    mobile = models.CharField('手机',max_length=11)
    course_name = models.CharField('课程名',max_length=50)
    add_time = models.DateTimeField('添加时间',default=datetime.now)

    class Meta:
        verbose_name = '用户咨询'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class CourseComments(models.Model):
    '''课程评论'''
    user = models.ForeignKey(UserProfile,verbose_name='用户',on_delete=models.CASCADE)
    course = models.ForeignKey(Course,verbose_name='课程',on_delete=models.CASCADE)
    comments = models.CharField('评论',max_length=200)
    add_time = models.DateTimeField('添加时间', default=datetime.now)

    class Meta:
        verbose_name = '课程评论'
        verbose_name_plural = verbose_name


class UserFavorite(models.Model):
    '''用户收藏'''
    FAV_TYPE = (
        (1,'课程'),
        (2,'课程机构'),
        (3,'讲师')
    )

    user = models.ForeignKey(UserProfile,verbose_name='用户',on_delete=models.CASCADE)
    fav_id = models.IntegerField('数据id',default=0)
    fav_type = models.IntegerField(verbose_name='收藏类型',choices=FAV_TYPE,default=1)
    add_time = models.DateTimeField('添加时间', default=datetime.now)

    class Meta:
        verbose_name = '用户收藏'
        verbose_name_plural = verbose_name


class UserMessage(models.Model):
    user = models.IntegerField('接受用户',default=0)
    message = models.CharField('消息内容',max_length=500)
    has_read = models.BooleanField('是否已读',default=False)
    add_time = models.DateTimeField('添加时间', default=datetime.now)

    class Meta:
        verbose_name = '用户消息'
        verbose_name_plural = verbose_name


class UserCourse(models.Model):
    '''用户课程'''
    user = models.ForeignKey(UserProfile,verbose_name='用户',on_delete=models.CASCADE)
    course = models.ForeignKey(Course,verbose_name='课程',on_delete=models.CASCADE)
    add_time = models.DateTimeField('添加时间', default=datetime.now)

    class Meta:
        verbose_name = '用户课程'
        verbose_name_plural = verbose_name
```

# 网页的使用

首先在static文件夹中导入需要的js，css，html，media文件



然后更改html文件中这些文件的位置;

```
<link rel="stylesheet" type="text/css" href="../css/reset.css">
```

改为

```
<link rel="stylesheet" type="text/css" href="static/css/reset.css">
```



再修改网页中跳转网页的地址（每个都要更改）

```
<a style="color:white" class="fr registerbtn" href="register.html">注册</a>
```

改为

```
<a style="color:white" class="fr registerbtn" href="{% url 'regist' %}">注册</a>
```

## 设置自己的view和登陆逻辑：

在每个app里设置自己要用的url

```
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', TemplateView.as_view(template_name="index.html"), name='index'),
    url(r'^login/$', login, name='login'),
]
```

其中`TemplateView.as_view(template_name="index.html")`是自带的一个初始化模版，我们同样可以设置自己的view函数来处理post和get的请求：

```
def user_login(request):
    if request.method == 'POST':
        user_name = request.POST.get('username', '')
        pass_word = request.POST.get('password', '')
        user = authenticate(user_name=user_name, pass_word=pass_word)
        if user is not None:
            login(request, user)
            return render(request, 'index.html', {})
        else:
            return render(request, 'login.html', {})

    elif request.method == "GET":
        return render(request, 'login.html', {})
```

对上面的函数进行解释：

其中`authenticate(user_name, pass_word)` 和 `login(request, user)`是 `django.contrib.auth`自带的两个函数，用来检查用户能否登陆，render返回想要的页面



同时我们需要更改网页中的页面，如果登陆成功，右上角的用户登陆按钮必须替换成相应的用户信息：

```
{% if request.user.is_authenticated %}
	<div class="top">......<div>
{% else %}
	<div class="top">......<div>
{% endif %}
```

`request.user.is_authenticated`也是自带的一个函数，验证用户是否已经登陆





### 对表单进行更改:

login.html改为/login/,在底部加{% csrf_token %}

```
<form action="/login/" method="post" autocomplete="off">
```



设置多种登陆方式：

![1531125019487](C:\Users\Leo\AppData\Local\Temp\1531125019487.png)

authenticate会自动调用我们定义的这个方法，然后用Q方法，进行多条件的或判断

然后我们注册到setting中：

![1531125156226](C:\Users\Leo\AppData\Local\Temp\1531125156226.png)

这里的意思是验证登陆使用底下配置的这个函数



### 用表单验证免去编写逻辑

新建form文件

```
from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(required=True)
    password = forms.CharField(required=True, min_length=5)
```

views逻辑更改为下,传入post的字典，然后比较，注意loginform里的字段要和函数逻辑里的一致：

```python
login_form = LoginForm(request.POST)
if login_form.is_valid():
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    ······
else:
    return render(request, 'login.html', {"login_form": login_form}, {"msg": "用户名或者密码错误"})
```

### 数据传给前端：

```
return render(request, 'index.html', {"msg":"用户名或者密码错误"})
```

```
<div class="error btns login-form-tips" id="jsLoginTips">{{ msg }}</div>
```

```
<div class="error btns login-form-tips" id="jsLoginTips">{% for error,msg in login_form.errors.items %}{% endfor %}{{ msg }}</div>
```

### 验证码模块的编写：



导入CaptchaField:

```
from captcha.fields import CaptchaField
class RegisterForm(forms.Form):
    email = forms.EmailField(required=True)
    password = forms.CharField(required=True, min_length=5)
    captcha = CaptchaField(error_messages={'invalid': '验证码错误'})

```

```
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 用户导入
    'users',
    'courses',
    'organization',
    'operation',
    # 验证码模块
    'captcha',
]

```

导入url以显示验证码：

```
url('captcha/', include('captcha.urls'))
```

在html导入验证码模块：

```
<div class="form-group marb8 captcha1 ">
    <label>验&nbsp;证&nbsp;码</label>
    {{ register_form.captcha }}
</div>
```
### 注册模块的编写：

注册逻辑如下：

```
def post(self, request):

    ······
    register_form = RegisterForm(request.POST)
    if register_form.is_valid():
        email = register_form.POST.get('email', '')

        if UserProfile.objects.filter(email=email):
            return render(request, 'register.html', {'register_form': register_form, 'msg': '用户已存在'})

        password = register_form.POST.get('password', '')
        # captcha = register_form.POST.get('captcha', '')

        user_profile = UserProfile()
        user_profile.username = email
        user_profile.email = email

        # 是否经过邮箱激活，makepassword将密码加密后导入数据库
        user_profile.is_active = False
        user_profile.password = make_password(password)
        user_profile.save()

        # 参数二判断 注册/找回
        send_register_email(email, 'register')
        
        return render(request, 'login.html')
```

激活逻辑如下：

```
class ActiveView(View):
    def get(self, request, active_code):

        email_records = EmailVerifyRecord.objects.filter(code=active_code)

        if email_records.count() != 0:
            for email_record in email_records:
                email = email_record.email
                user = UserProfile.objects.get(email=email)
                user.is_active = True
                user.save()
        else:
            return render(request, 'active_fail.html')

        return render(request, 'login.html')
```



再在登录的逻辑下添加判断：

````python
user = authenticate(username=username, password=password)
            if user is not None:
                # 激活后才能登录
                if user.is_active:
                    login(request, user)
                    return render(request, 'index.html', {})
````



发送验证码：

```
from users.models import EmailVerifyRecord
from django.core.mail import send_mail
from MyMooc.settings import EMAIL_FROM
```

```
email_title = ''
email_body = ''

if type == 'register':
    email_title = '请点击以下链接完成注册'
    email_body = 'http://127.0.0.1:8000/active/{0}'.format(code)

if type == 'forget':
    email_title = '请点击以下链接找回密码'
    email_body = 'http://127.0.0.1:8000/forget/{0}'.format(code)

send_status = send_mail(email_title, email_body, EMAIL_FROM, [email])
```



正则捕获：

**<u>请问怎么理解这个正则表达式"\"(?P<first>.+)\""</u>**

**<u>(?P)为命名捕获，名称为first</u>** 

**这样first就可以直接在view的逻辑中当作变量来使用**



index页面获取登录信息

```
<dd>
    <h2>{{ request.user.nick_name }}</h2>
    <p>{{ request.user.username }}</p>
</dd>
```



## 网页模版继承：

（1）创建母板

把org-list.html拷贝到templates目录下，新建base.html,剪切org-list.html内容到里面

![img](https://images2018.cnblogs.com/blog/1299879/201803/1299879-20180324104830436-955539027.png)

![img](https://images2018.cnblogs.com/blog/1299879/201803/1299879-20180324104902493-1443458262.png)（4）org-list.html继承base

```
{#templates/org-list.html#}

{% extends 'base.html' %}

{% block title %}
    课程机构列表
{% endblock %}
```

（3）添加机构

添加机构信息的时候要上传机构的图片

在项目目录下面新建一个目录“media”，用来存放上传的图片

**setting中要配置我们把文件存放在哪个根目录之下**

```
#settings.py

# 设置上传文件的路径
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR,'media')   #指定根目录
```

（2）修改org-list.html

显示机构总共数量

![img](https://images2018.cnblogs.com/blog/1299879/201803/1299879-20180324140233528-267342101.png)

显示城市

![img](https://images2018.cnblogs.com/blog/1299879/201803/1299879-20180324134853576-773132439.png)

显示机构

![img](https://images2018.cnblogs.com/blog/1299879/201803/1299879-20180324135021295-242157208.png)

![img](https://images2018.cnblogs.com/blog/1299879/201803/1299879-20180324135110032-1070169703.png)7.4.分页功能

使用 分页神器 **django-pure-pagination** 分页，github上面有介绍使用方法

 （1）安装

```
pip install django-pure-pagination
```

（2）settings里面添加

```
INSTALLED_APPS = (
    ...
    'pure_pagination',
)
```

（3）views中使用方法

[![复制代码](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
class OrgView(View):
    '''课程机构'''

    def get(self, request):
        # 所有课程机构
        all_orgs = CourseOrg.objects.all()
        # 有多少家机构
        org_nums = all_orgs.count()
        # 所有城市
        all_citys = CityDict.objects.all()
        # 对课程机构进行分页
        # 尝试获取前台get请求传递过来的page参数
        # 如果是不合法的配置参数默认返回第一页
        try:
            page = request.GET.get('page', 1)
        except PageNotAnInteger:
            page = 1
        # 这里指从allorg中取五个出来，每页显示5个
        p = Paginator(all_orgs, 5, request=request)
        orgs = p.page(page)

        return render(request, "org-list.html", {
            "all_orgs": orgs,
            "all_citys": all_citys,
            "org_nums": org_nums,
        })
```

[![复制代码](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

（4）修改org-list.html

 这里变成 "all_orgs.object_list"

![img](https://images2018.cnblogs.com/blog/1299879/201803/1299879-20180324145117011-669942286.png)

分页功能

[![复制代码](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<div class="pageturn">
    <ul class="pagelist">
        {% if all_orgs.has_previous %}
            <li class="long"><a href="?{{ all_orgs.previous_page_number.querystring }}">上一页</a></li>
        {% endif %}

        {% for page in all_orgs.pages %}
            {% if page %}
                {% ifequal page all_orgs.number %}
                    <li class="active"><a href="?{{ page.querystring }}">{{ page }}</a></li>
                {% else %}
                    <li><a href="?{{ page.querystring }}" class="page">{{ page }}</a></li>
                {% endifequal %}
            {% else %}
                <li class="none"><a href="">...</a></li>
            {% endif %}
        {% endfor %}
        {% if all_orgs.has_next %}
            <li class="long"><a href="?{{ all_orgs.next_page_number.querystring }}">下一页</a></li>
        {% endif %}
    </ul>
</div>
```

[![复制代码](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

改成每页显示2个列表，如下：

![img](https://images2018.cnblogs.com/blog/1299879/201803/1299879-20180324150603639-447150068.png)

接下来的自己看吧：

http://www.cnblogs.com/derek1184405959/p/8666782.html