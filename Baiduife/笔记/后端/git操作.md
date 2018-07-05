# 二、初始化

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

## 4.4、GIT分支

### 4.4.1、新建分支与切换分支

```
# 列出所有本地分支
$ git branch

# 列出所有远程分支
$ git branch -r

# 列出所有本地分支和远程分支
$ git branch -a

# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]

# 新建一个分支，并切换到该分支
$ git checkout -b [branch]

# 新建一个分支，指向指定commit
$ git branch [branch] [commit]

# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]

# 切换到指定分支，并更新工作区
$ git checkout [branch-name]

# 切换到上一个分支
$ git checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]

# 合并指定分支到当前分支
$ git merge [branch]

# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]

# 删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]
```

默认分支是这样的，master是主分支

1）、新建一个分支，但依然停留在当前分支，使用：$ git branch [branch-name]

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908102319366-860612118.png)

切换分支到dev1后的结果：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908110413257-321369438.png)

[关于分支廖雪峰解释的比较清楚，我们引用一下](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001375840038939c291467cc7c747b1810aab2fb8863508000)。

当我们创建新的分支，例如`dev`时，Git新建了一个指针叫`dev`，指向`master`相同的提交，再把`HEAD`指向`dev`，就表示当前分支在`dev`上：

你看，Git创建一个分支很快，因为除了增加一个`dev`指针，改改`HEAD`的指向，工作区的文件都没有任何变化！

不过，从现在开始，对工作区的修改和提交就是针对`dev`分支了，比如新提交一次后，`dev`指针往前移动一步，而`master`指针不变：

假如我们在`dev`上的工作完成了，就可以把`dev`合并到`master`上。Git怎么合并呢？最简单的方法，就是直接把`master`指向`dev`的当前提交，就完成了合并：

所以Git合并分支也很快！就改改指针，工作区内容也不变！

合并完分支后，甚至可以删除`dev`分支。删除`dev`分支就是把`dev`指针给删掉，删掉后，我们就剩下了一条`master`分支：

2）、切换分支，git branch <name>，如果name为-则为上一个分支

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908132937991-1683911580.png)

切换为上一个分支

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908133024413-690367079.png)

3）、新建一个分支，并切换到该分支，$ git checkout -b [branch]

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908111024772-643503878.png)

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908111155288-294742108.png)

4）、新建一个分支，指向指定commit使用命令：$ git branch [branch] [commit]

 ![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908134134241-2117296784.png)

上面创建了dev3分支且指向了master中首次提交的位置，切换到dev3查看日志如下：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908134438476-888421004.png)

master上本来有两个提交记录的，此时的dev3指向的是第1次提交的位置

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908134547913-960980351.png)

 5）、新建一个分支，与指定的远程分支建立追踪关系使用命令：$ git branch --track [branch] [remote-branch]

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908160347741-1146762696.png)

### 4.4.2、查看分支

1）、列出所有本地分支使用$ git branch

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908160532413-665563097.png)

2）、列表所有远程分支使用$ git branch -r

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908160625554-32272071.png)

3)、列出所有本地分支和远程分支使用$ git branch -a

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908160704413-490309889.png)

### 4.4.3、分支合并

合并指定分支到当前分支使用指令$ git merge [branch]

这里的合并分支就是对分支的指针操作，我们先创建一个分支再合并到主分支：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908200941007-525713587.png)

这里的file11.txt主分支与dev6的内容现在是不同的，因为在dev6中已被修改过，我们可以使用指令查看：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908201243038-1579475148.png)

现在我们将dev6合并到主分支中去，从下图中可以看出dev6中有一次提交，而master并没有

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908201946241-1502411831.png)

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908202307929-640297009.png)

合并后在master上查看file11.txt文件内容与dev6上的内容就一样了，合并后dev6中多出的提交在master也拥有了。

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908202408257-864175348.png)

### 4.4.4、解决冲突

如果同一个文件在合并分支时都被修改了则会引起冲突，如下所示：

提交前两个分支的状态

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908210135757-25776448.png)

在dev6分支中同样修改file11.txt

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908210227741-1265576286.png)

dev6与master分支中file11.txt文件都被修改且提交了，现在合并分支

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908210610835-267872418.png)

提示冲突，现在我们看看file11.txt在master分支中的状态

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908210749319-1779643226.png)

Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容，其中<<<HEAD是指主分支修改的内容，>>>>>dev6 是指dev6上修改的内容

解决的办法是我们可以修改冲突文件后重新提交，请注意当前的状态产master | MERGING：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908211751257-770094797.png)

重新提交后冲突解决：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908212011241-1014866334.png)手动解决完冲突后就可以把此文件添 加到索引(index)中去，用git commit命令来提交，就像平时修改了一个文件 一样。

用*git log --graph*命令可以看到分支合并图。

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908212534382-1166076106.png)



# 五、远程仓库操作

申请到了Git远程仓库的帐号并创建了一个空的远程仓库现在我们就可以结合本地的仓库与远程仓库一起协同工作了，模拟多人协同开发，这里我们全部使用命令完成。

### 5.3.1、常用操作指令



```
# 下载远程仓库的所有变动
$ git fetch [remote]

# 显示所有远程仓库
$ git remote -v

# 显示某个远程仓库的信息
$ git remote show [remote]

# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]

# 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]

# 上传本地指定分支到远程仓库
$ git push [remote] [branch]

# 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force

# 推送所有分支到远程仓库
$ git push [remote] --all

#简单查看远程---所有仓库
git remote  （只能查看远程仓库的名字）
#查看单个仓库
git  remote show [remote-branch-name]

#新建远程仓库
git remote add [branchname]  [url]

#修改远程仓库
git remote rename [oldname] [newname]

#删除远程仓库
git remote rm [remote-name]

#获取远程仓库数据
git fetch [remote-name] (获取仓库所有更新，但不自动合并当前分支)
git pull (获取仓库所有更新，并自动合并到当前分支)

#上传数据，如git push origin master
git push [remote-name] [branch]
```



### 5.3.2、git clone 克隆

远程操作的第一步，通常是从远程主机克隆一个版本库，这时就要用到`git clone`命令。

```
$ git clone <版本库的网址>
```

比如，克隆一个上课示例的版本库。

```
$ git clone https://github.com/zhangguo5/AngularJS04_BookStore.git
```

该命令会在本地主机生成一个目录，与远程主机的版本库同名。如果要指定不同的目录名，可以将目录名作为`git clone`命令的第二个参数。

```
$ git clone <版本库的网址> <本地目录名>
```

`git clone`支持多种协议，除了HTTP(s)以外，还支持SSH、Git、本地文件协议等，下面是一些例子。



```
$ git clone http[s]://example.com/path/to/repo.git/
$ git clone ssh://example.com/path/to/repo.git/
$ git clone git://example.com/path/to/repo.git/
$ git clone /opt/git/project.git 
$ git clone file:///opt/git/project.git
$ git clone ftp[s]://example.com/path/to/repo.git/
$ git clone rsync://example.com/path/to/repo.git/
```



SSH协议还有另一种写法。

```
$ git clone [user@]example.com:path/to/repo.git/
```

通常来说，Git协议下载速度最快，SSH协议用于需要用户认证的场合。各种协议优劣的详细讨论请参考 [官方文档](http://git-scm.com/book/en/Git-on-the-Server-The-Protocols)。

示例：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908222646397-430894497.png)

结果：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908222707960-282622883.png)

### 5.3.3、git remote

为了便于管理，Git要求每个远程主机都必须指定一个主机名。`git remote`命令就用于管理主机名。

不带选项的时候，`git remote`命令列出所有远程主机。

```
$ git remote
```

 ![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908222818397-722213136.png)

使用`-v`选项，可以参看远程主机的网址。

```
$ git remote -v
```

 ![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908222926897-216628652.png)

上面命令表示，当前只有一台远程主机，叫做origin，以及它的网址。

克隆版本库的时候，所使用的远程主机自动被Git命名为`origin`。如果想用其他的主机名，需要用`git clone`命令的`-o`选项指定。

```
$ git clone -o WeUI https://github.com/Tencent/weui.git
$ git remote
```

 ![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908223611616-773447420.png)

上面命令表示，克隆的时候，指定远程主机叫做WeUI。

`git remote show`命令加上主机名，可以查看该主机的详细信息。

```
$ git remote show <主机名>
```

 ![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908223918257-1858209596.png)

`git remote add`命令用于添加远程主机。

```
$ git remote add <主机名> <网址>
```

 ![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908224213663-945242668.png)

`git remote rm`命令用于删除远程主机。

```
$ git remote rm <主机名>
```

 ![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908224407179-621857253.png)

`git remote rename`命令用于远程主机的改名。

```
$ git remote rename <原主机名> <新主机名>
```

 ![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908224328835-2011669932.png)

### 5.3.4、git fetch

一旦远程主机的版本库有了更新（Git术语叫做commit），需要将这些更新取回本地，这时就要用到`git fetch`命令。

```
$ git fetch <远程主机名>
```

 ![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908224517710-282516709.png)

上面命令将某个远程主机的更新，全部取回本地。

`git fetch`命令通常用来查看其他人的进程，因为它取回的代码对你本地的开发代码没有影响。

默认情况下，`git fetch`取回所有分支（branch）的更新。如果只想取回特定分支的更新，可以指定分支名。

```
$ git fetch <远程主机名> <分支名>
```

 ![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908224858882-553214269.png)

比如，取回`origin`主机的`master`分支。

```
$ git fetch origin master
```

所取回的更新，在本地主机上要用"远程主机名/分支名"的形式读取。比如`origin`主机的`master`，就要用`origin/master`读取。

`git branch`命令的`-r`选项，可以用来查看远程分支，`-a`选项查看所有分支。

上面命令表示，本地主机的当前分支是`master`，远程分支是`origin/master`。

取回远程主机的更新以后，可以在它的基础上，使用`git checkout`命令创建一个新的分支。

```
$ git checkout -b newBrach origin/master
```

上面命令表示，在`origin/master`的基础上，创建一个新分支。

此外，也可以使用`git merge`命令或者`git rebase`命令，在本地分支上合并远程分支。

```
$ git merge origin/master
# 或者
$ git rebase origin/master
```

上面命令表示在当前分支上，合并`origin/master`。

### 5.3.5、git pull

`git pull`命令的作用是，取回远程主机某个分支的更新，再与本地的指定分支合并。它的完整格式稍稍有点复杂。

```
$ git pull <远程主机名> <远程分支名>:<本地分支名>
```

比如，取回`origin`主机的`next`分支，与本地的`master`分支合并，需要写成下面这样。

```
$ git pull origin next:master
```

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908225306444-501626163.png)

如果远程分支是与当前分支合并，则冒号后面的部分可以省略。

```
$ git pull origin next
```

上面命令表示，取回`origin/next`分支，再与当前分支合并。实质上，这等同于先做`git fetch`，再做`git merge`。

```
$ git fetch origin
$ git merge origin/next
```

在某些场合，Git会自动在本地分支与远程分支之间，建立一种追踪关系（tracking）。比如，在`git clone`的时候，所有本地分支默认与远程主机的同名分支，建立追踪关系，也就是说，本地的`master`分支自动"追踪"`origin/master`分支。

Git也允许手动建立追踪关系。

```
git branch --set-upstream master origin/next
```

上面命令指定`master`分支追踪`origin/next`分支。

如果当前分支与远程分支存在追踪关系，`git pull`就可以省略远程分支名。

```
$ git pull origin
```

上面命令表示，本地的当前分支自动与对应的`origin`主机"追踪分支"（remote-tracking branch）进行合并。

如果当前分支只有一个追踪分支，连远程主机名都可以省略。

```
$ git pull
```

上面命令表示，当前分支自动与唯一一个追踪分支进行合并。

如果合并需要采用rebase模式，可以使用`--rebase`选项。

```
$ git pull --rebase <远程主机名> <远程分支名>:<本地分支名>
```

如果远程主机删除了某个分支，默认情况下，`git pull` 不会在拉取远程分支的时候，删除对应的本地分支。这是为了防止，由于其他人操作了远程主机，导致`git pull`不知不觉删除了本地分支。

但是，你可以改变这个行为，加上参数 `-p` 就会在本地删除远程已经删除的分支。

```
$ git pull -p
# 等同于下面的命令
$ git fetch --prune origin 
$ git fetch -p
```

### 5.3.6、git push

`git push`命令用于将本地分支的更新，推送到远程主机。它的格式与`git pull`命令相仿。

```
$ git push <远程主机名> <本地分支名>:<远程分支名>
```

注意，分支推送顺序的写法是<来源地>:<目的地>，所以`git pull`是<远程分支>:<本地分支>，而`git push`是<本地分支>:<远程分支>。

如果省略远程分支名，则表示将本地分支推送与之存在"追踪关系"的远程分支（通常两者同名），如果该远程分支不存在，则会被新建。

```
$ git push origin master
```

 ![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908225504819-2024610007.png)

上面命令表示，将本地的`master`分支推送到`origin`主机的`master`分支。如果后者不存在，则会被新建。

如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支。

```
$ git push origin :master
# 等同于
$ git push origin --delete master
```

 ![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908225743272-1924279457.png)

上面命令表示删除`origin`主机的`master`分支。

如果当前分支与远程分支之间存在追踪关系，则本地分支和远程分支都可以省略。

```
$ git push origin
```

上面命令表示，将当前分支推送到`origin`主机的对应分支。

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170908230824710-1381765944.png)

如果是新建分支第一次push，会提示：
　　fatal: The current branch dev1 has no upstream branch.
　　To push the current branch and set the remote as upstream, use
　　git push --set-upstream origin dev1
　　输入这行命令，然后输入用户名和密码，就push成功了。

　　以后的push就只需要输入git push origin

原因是：

```
#因为在git的全局配置中，有一个push.default属性，其决定了git push操作的默认行为。在Git 2.0之前，这个属性的默认被设为'matching'，2.0之后则被更改为了'simple'。

#我们可以通过git version确定当前的git版本（如果小于2.0，更新是个更好的选择），通过git config --global push.default 'option'改变push.default的默认行为（或者也可直接编辑~/.gitconfig文件）。

push.default 有以下几个可选值：
nothing, current, upstream, simple, matching

其用途分别为：
nothing - push操作无效，除非显式指定远程分支，例如git push origin develop（我觉得。。。可以给那些不愿学git的同事配上此项）。
current - push当前分支到远程同名分支，如果远程同名分支不存在则自动创建同名分支。
upstream - push当前分支到它的upstream分支上（这一项其实用于经常从本地分支push/pull到同一远程仓库的情景，这种模式叫做central workflow）。
simple - simple和upstream是相似的，只有一点不同，simple必须保证本地分支和它的远程
upstream分支同名，否则会拒绝push操作。
matching - push所有本地和远程两端都存在的同名分支。

因此如果我们使用了git2.0之前的版本，push.default = matching，git push后则会推送当前分支代码到远程分支，而2.0之后，push.default = simple，如果没有指定当前分支的upstream分支，就会收到上文的fatal提示。
```

 

如果当前分支只有一个追踪分支，那么主机名都可以省略。

```
$ git push
```

如果当前分支与多个主机存在追踪关系，则可以使用`-u`选项指定一个默认主机，这样后面就可以不加任何参数使用`git push`。

```
$ git push -u origin master
```

上面命令将本地的`master`分支推送到`origin`主机，同时指定`origin`为默认主机，后面就可以不加任何参数使用`git push`了。

不带任何参数的`git push`，默认只推送当前分支，这叫做simple方式。此外，还有一种matching方式，会推送所有有对应的远程分支的本地分支。Git 2.0版本之前，默认采用matching方法，现在改为默认采用simple方式。如果要修改这个设置，可以采用`git config`命令。

```
$ git config --global push.default matching
# 或者
$ git config --global push.default simple
```

还有一种情况，就是不管是否存在对应的远程分支，将本地的所有分支都推送到远程主机，这时需要使用`--all`选项。

```
$ git push --all origin
```

上面命令表示，将所有本地分支都推送到`origin`主机。

如果远程主机的版本比本地版本更新，推送时Git会报错，要求先在本地做`git pull`合并差异，然后再推送到远程主机。这时，如果你一定要推送，可以使用`--force`选项。

```
$ git push --force origin 
```

上面命令使用`--force`选项，结果导致远程主机上更新的版本被覆盖。除非你很确定要这样做，否则应该尽量避免使用`--force`选项。

最后，`git push`不会推送标签（tag），除非使用`--tags`选项。

```
$ git push origin --tags
```

## 5.4、在命令行中同步本地仓库示例

假定我们创建好了一个远程仓库地址为：https://coding.net/u/zhangguo5/p/project7/git，现在我们在本地创建一个项目并同步到远程仓库中。

1）、创建文件添加到暂存区

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170907221032944-2131239213.png)

2）、提交到本地仓库

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170907233021210-1805159090.png)

3）、提交到远程仓库

添加远程主机地址：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170907233146726-618960592.png)

推送文件：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170907233217163-1083264263.png)

结果：

![img](https://images2017.cnblogs.com/blog/63651/201709/63651-20170907233514601-722647890.png)

说明：这里我使用的是SSH方式提交的，所有并没有让我输入用户名与密码，如果你使用https方式提交则要配置用户名与邮箱，还要输入密码。



# 六、git远程分支的push

本地分支的创建

 

本地分支的来源为执行git checkout -b <branch name> 的那个分支

例如现在有两个分支，master和b1

master 分支下有一个commit：

commit1： add test1.c

b1分支下有两个commit：

commit2： add test2.c

commit1： add test1.c

如果在master分支下checkout，即：

git checkout master //进入master分支

git checkout -b frommaster //以master为源创建分支frommaster

git log后发现frommaster中有一个提交：

commit1： add test1.c

这说明他是从master分支为源头创建的

如果在b1分支下checkout，即：

git checkout b1 //进入master分支

git checkout -b fromb1 //以b1为源创建分支fromb1

git log后发现fromb1中已经有两个提交：

commit2： add test2.c

commit1： add test1.c

这说明他是从b1分支为源头创建的

**远程分支的创建**

从远程分支检出的本地分支，称为跟踪分支(tracking branch)。跟踪分支是一种和远程
分支有直接联系的本地分支。在跟踪分支里输入git push，Git 会自行推断应该向哪个服
务器的哪个分支推送数据。反过来，在这些分支里运行git pull 会获取所有远程索引，并

把它们的数据都合并到本地分支中来.

 

 

 

 

 

 

 

​    **需要说明的是，默认情况下这条语句等价于提交本地的master仓库到远程仓库，并作为远程的master分支。**

我从master分支创建了一个issue5560分支，做了一些修改后，使用git push origin master提交，但是显示的结果却是'Everything up-to-date'，发生问题的原因是git push origin master 在没有track远程分支的本地分支中默认提交的master分支，因为master分支默认指向了origin master 分支，这里要使用git push origin issue5560：master 就可以把issue5560推送到远程的master分支了。

 

 

 

 

 

 

 

 