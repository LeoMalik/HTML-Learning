### 2.3.3、设置用户名与邮箱（用户标识，必要）

当你安装Git后首先要做的事情是设置你的用户名称和e-mail地址。这是非常重要的，因为每次Git提交都会使用该信息。它被永远的嵌入到了你的提交中：

```
 　　$ git config --global user.name "zhangguo"  #名称
 　　$ git config --global user.email zhangguo@qq.com   #邮箱
```

只需要做一次这个设置，如果你传递了--global 选项，因为Git将总是会使用该信息来处理你在系统中所做的一切操作。如果你希望在一个特定的项目中使用不同的名称或e-mail地址，你可以在该项目中运行该命令而不要--global选项。 总之--global为全局配置，不加为某个项目的特定配置。

# 三、Git理论基础

## 3.1、工作区域

Git本地有三个工作区域：工作目录（Working Directory）、暂存区(Stage/Index)、资源库(Repository或Git Directory)。如果在加上远程的git仓库(Remote Directory)就可以分为四个工作区域。文件在这四个区域之间的转换关系如下：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170905201017069-171460014.png)

- Workspace：工作区，就是你平时存放项目代码的地方
- Index / Stage：暂存区，用于临时存放你的改动，事实上它只是一个文件，保存即将提交到文件列表信息
- Repository：仓库区（或本地仓库），就是安全存放数据的位置，这里面有你提交到所有版本的数据。其中HEAD指向最新放入仓库的版本
- Remote：远程仓库，托管代码的服务器，可以简单的认为是你项目组中的一台电脑用于远程数据交换

本地的三个区域确切的说应该是git仓库中HEAD指向的版本

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170906230652788-1835188684.png)

- Directory：使用Git管理的一个目录，也就是一个仓库，包含我们的工作空间和Git的管理空间。
- WorkSpace：需要通过Git进行版本控制的目录和文件，这些目录和文件组成了工作空间。
- .git：存放Git管理信息的目录，初始化仓库的时候自动创建。
- Index/Stage：暂存区，或者叫待提交更新区，在提交进入repo之前，我们可以把所有的更新放在暂存区。
- Local Repo：本地仓库，一个存放在本地的版本库；HEAD会只是当前的开发分支（branch）。
- Stash：隐藏，是一个工作状态保存栈，用于保存/恢复WorkSpace中的临时状态。

## 3.2、工作流程

git的工作流程一般是这样的：

１、在工作目录中添加、修改文件；

２、将需要进行版本管理的文件放入暂存区域；

３、将暂存区域的文件提交到git仓库。

因此，git管理的文件有三种状态：已修改（modified）,已暂存（staged）,已提交(committed)

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170905201033647-1915833066.png)

## 3.3、图解教程

个人认为Git的原理相比别的版本控制器还是复杂一些的，有一份图解教程比较直观：

[图解教程英文原版](https://github.com/MarkLodato/visual-git-guide)

[图解教程中文版](http://www.cnblogs.com/yaozhongxiao/p/3811130.html)

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170914100820891-2098204183.png)

# 四、Git操作

## 4.1、创建工作目录与常用指令

工作目录（WorkSpace)一般就是你希望Git帮助你管理的文件夹，可以是你项目的目录，也可以是一个空目录，建议不要有中文。

日常使用只要记住下图6个命令：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170905212837976-775285128.png)

## 4.2、获得GIT仓库

创建本地仓库的方法有两种：一种是创建全新的仓库，另一种是克隆远程仓库。

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170905214339226-738603749.png)

### 4.2.1、创建全新仓库

需要用GIT管理的项目的根目录执行：

```
# 在当前目录新建一个Git代码库
$ git init
```

**执行：**

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170905215656866-1398401674.png)

**结果：**

 ![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170905215735366-1289732483.png)

执行后可以看到，仅仅在项目目录多出了一个.git目录，关于版本等的所有信息都在这个目录里面。

当然如果使用如下命令，可以把创建目录与仓库一起完成：

```
# 新建一个目录，将其初始化为Git代码库
$ git init [project-name]
```

 执行命令与运行结果：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170905220337507-804117637.png)



### 4.2.2、克隆远程仓库

 另一种方式是克隆远程目录，由于是将远程服务器上的仓库完全镜像一份至本地，而不是取某一个特定版本，所以用clone而不是checkout，语法格式如下：

```
# 克隆一个项目和它的整个代码历史(版本信息)
$ git clone [url]
```

## 4.3、GIT文件操作

### 4.3.1、文件4种状态

- **Untracked**: 未跟踪, 此文件在文件夹中, 但并没有加入到git库, 不参与版本控制. 通过`git add` 状态变为`Staged`.
- **Unmodify**: 文件已经入库, 未修改, 即版本库中的文件快照内容与文件夹中完全一致. 这种类型的文件有两种去处, 如果它被修改, 而变为`Modified`. 如果使用`git rm`移出版本库, 则成为`Untracked`文件
- **Modified**: 文件已修改, 仅仅是修改, 并没有进行其他的操作. 这个文件也有两个去处, 通过`git add`可进入暂存`staged`状态, 使用`git checkout` 则丢弃修改过, 返回到`unmodify`状态, 这个`git checkout`即从库中取出文件, 覆盖当前修改
- **Staged**: 暂存状态. 执行`git commit`则将修改同步到库中, 这时库中的文件和本地文件又变为一致, 文件为`Unmodify`状态. 执行`git reset HEAD filename`取消暂存, 文件状态为`Modified`

上面说文件有4种状态，通过如下命令可以查看到文件的状态：

```
#查看指定文件状态
git status [filename]

#查看所有文件状态
git status
```

### 4.3.4、移除文件与目录（撤销add）

![img](https://images0.cnblogs.com/blog/99928/201411/201751509379751.png)

当执行如下命令时，会直接从暂存区删除文件，工作区则不做出改变、

1. git diff --cached：是查看index file与commit的差别的。
2. git diff HEAD：是查看working tree和commit的差别的。（你一定没有忘记，HEAD代表的是最近的一次commit的信息） 

```
#直接从暂存区删除文件，工作区则不做出改变
git rm --cached <file>
```

执行命令

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170905234240804-1332106185.png)

通过重写目录树移除add文件：

```
#如果已经用add 命令把文件加入stage了，就先需要从stage中撤销
git reset HEAD <file>...
```

当执行 “git reset HEAD” 命令时，暂存区的目录树会被重写，被 master 分支指向的目录树所替换，但是工作区不受影响。

示例：把f1.txt文件从暂存区撤回工作区

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170906214833804-177821547.png)

### 4.3.5、查看文件修改后的差异

git diff用于显示WorkSpace中的文件和暂存区文件的差异

用"git status"只能查看对哪些文件做了改动，如果要看改动了什么，可以用：

```
#查看文件修改后的差异
git diff [files]
```

命令：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170906141531554-463319760.png)

 ---a表示修改之前的文件，+++b表示修改后的文件

```
#比较暂存区的文件与之前已经提交过的文件
git diff --cached
```

也可以把WorkSpace中的状态和repo中的状态进行diff，命令如下:

```
#比较repo与工作空间中的文件差异
git diff HEAD~n
```

**![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170914095506203-2063795525.png)**



[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

示例： 

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170906223105851-2141952910.png)

### 4.3.6、忽略文件

有些时候我们不想把某些文件纳入版本控制中，比如数据库文件，临时文件，设计文件等

在主目录下建立".gitignore"文件，此文件有如下规则：

1. 忽略文件中的空行或以井号（#）开始的行将会被忽略。
2. 可以使用Linux通配符。例如：星号（*）代表任意多个字符，问号（？）代表一个字符，方括号（[abc]）代表可选字符范围，大括号（{string1,string2,...}）代表可选的字符串等。
3. 如果名称的最前面有一个感叹号（!），表示例外规则，将不被忽略。
4. 如果名称的最前面是一个路径分隔符（/），表示要忽略的文件在此目录下，而子目录中的文件不忽略。
5. 如果名称的最后面是一个路径分隔符（/），表示要忽略的是此目录下该名称的子目录，而非文件（默认文件或目录都忽略）。

如：

```
#为注释
*.txt #忽略所有 .txt结尾的文件
!lib.txt #但lib.txt除外
/temp #仅忽略项目根目录下的TODO文件,不包括其它目录temp
build/ #忽略build/目录下的所有文件
doc/*.txt #会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
```

### 4.3.7、提交

通过add只是将文件或目录添加到了index暂存区，使用commit可以实现将暂存区的文件提交到本地仓库。

```
# 提交暂存区到仓库区
$ git commit -m [message]

# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区，跳过了add,对新文件无效
$ git commit -a

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...
```

### 4.3.8、日志与历史

查看提交日志可以使用git log指令，语法格式如下：

```
#查看提交日志
git log [<options>] [<revision range>] [[\--] <path>…]
```

示例：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170906162101757-272912226.png)

"git log --graph"以图形化的方式显示提交历史的关系，这就可以方便地查看提交历史的分支信息，当然是控制台用字符画出来的图形。

### 4.3.10、撤销更新

**1）、撤销暂存区更新**

使用"git add"把更新提交到了暂存区。这时"git status"的输出中提示我们可以通过"git reset HEAD <file>..."把暂存区的更新移出到WorkSpace中

示例：f6已经提交，工作区修改，暂存区修改，撤销

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170906233841179-595609603.png)

**2)、撤销本地仓库更新**

使用git log查看提交日志

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170906234944507-1852886113.png)

撤销提交有两种方式：**使用HEAD指针**和**使用commit id**

在Git中，有一个HEAD指针指向当前分支中最新的提交。当前版本，我们使用"HEAD^"，那么再钱一个版本可以使用"HEAD^^"，如果想回退到更早的提交，可以使用"HEAD~n"。（也就是，HEAD^=HEAD~1，HEAD^^=HEAD~2）

```
git reset --hard HEAD^
git reset --hard HEAD~1
git reset --59cf9334cf957535cb328f22a1579b84db0911e5
```

示例：回退到添加f6

回退前：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170906235156351-597175458.png)

回退后：

 ![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170906235057710-1820019779.png)

现在又想恢复被撤销的提交可用"git reflog"查看仓库中所有的分支的所有更新记录，包括已经撤销的更新，撤销方法与前面一样。

```
git reset --hard HEAD@{7}
git reset --hard e0e79d7
```

--hard：撤销并删除相应的更新

--soft：撤销相应的更新，把这些更新的内容放到Stage中

### 4.3.12、文件操作小结

![img](https://images0.cnblogs.com/blog/221923/201501/061510341401056.png)

 Git很强大，很灵活，这是毋庸置疑的。但也正因为它的强大造成了它的复杂，因此会有很多奇奇怪怪的问题出现，多用就好了。