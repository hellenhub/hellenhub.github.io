# 关于 Unix 中的配置文件


> 关于 Unix ，配置文件十分重要，对于用户来说，总是会搞不清，到底要设置哪里。下面就针对不同系统的文件做详细介绍。

<!--more-->

---

# 关于 Unix 中的配置文件

## Linux Shell 种类简单介绍

Unix shell，一种壳层与命令行界面，是Unix操作系统下传统的用户和计算机的交互界面。

- 查看本机 shell 有哪些，可以使用命令： `cat /etc/shells`
- 查看当前用户正在使用的 shell 可以使用命令： `echo $SHELL # 切换 shell 为 zsh`
- 切换当前用户的 shell 可以使用命令： `chsh -s /bin/zsh # 切换 shell 为 zsh`

## Linux 的变量种类

### 按变量的生存周期划分

- **永久的：** 需要修改配置文件，变量永久生效。
- **临时的：** 使用 `export` 命令声明即可，变量在关闭 shell 时失效。
- 在配置永久的环境变量时，又可以按照作用范围分为: **用户环境变量** & **系统环境变量**。

## 设置环境变量

1. 在 shell 的命令行下直接使用 `[export 变量名=变量值]` 定义变量。该变量只在当前的 shell(bash) 或其子 shell(bash) 下是有效的，shell 关闭了，变量也就失效了，再打开新 shell 时就没有这个变量，需要使用的话还需要重新定义。

2. 修改系统环境变量。系统环境变量一般保存在以下几个位置：

    - `/etc/profile` : 全局（公有）配置，不管是哪个用户，登录时都会读取该文件。
    - `/etc/bash.bashrc` : 它也是全局（公有）的 bash执行时，不管是何种方式，都会读取此文件。
    - `/etc/environment` : 不要轻易修改此文件。

3. 修改用户环境变量。用户环境变量一般保存在以下几个位置：

    - `~/.profile`
    - `~/.bash_profile` 或者 `~./bash_login`
    - `~/.bashrc` : 推荐放置个人设置。
    - `~/.bash_profile`

4. Linux 配置环境变量的几个文件的加载顺序：

   ```shell
    /etc/profile -> (~/.bash_profile | ~/.bash_login | ~/.profile) -> ~/.bashrc -> /etc/bashrc -> ~/.bash_logout
   ```

    **说明：**
    - 若bash是以login方式执行时，读取~/.bash_profile，若它不存在，则读取~/.bash_login，若前两者不存在，读取~/.profile。
    - 若bash是以login方式执行时，读取~/.bash_profile，若它不存,则读取~/.bash_login，若前两者不存在，读取 ~/.profile。只有bash是以login形式执行时，才会读取.bash_profile，Unbutu默认没有此文件，可新建。 通常该配置文件还会配置成去读取~/.bashrc。
    - 当bash是以non-login形式执行时，读取此文件。若是以login形式执行，则不会读取此文件。
    - ~/.bashrc 是交互式 non-login 方式进入 bash 运行的通常二者设置大致相同，所以通常前者会调用后者。

[读取流程图](https://img-blog.csdn.net/20180614131117463?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lpZmVuNDIzNA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

## `.bashrc` 和 `.bash_profile` 的区别

`.bash_profile`会用在登陆 shell， `.bashrc` 使用在交互式非登陆 shell 。
简单说来，它们的区别主要是: `.bash_profile`是在你每次登录的时候执行的；`.bashrc`是在你新开了一个命令行窗口时执行的。
当通过控制台进行登录（输入用户名和密码）：在初始化命令行提示符的时候会执行`.bash_profile` 来配置你的 shell 环境。但是如果已经登录到机器，在Gnome或者是KDE也开了一个新的终端窗口（xterm），这时，`.bashrc`会在窗口命令行提示符出现前被执行。当你在终端敲入`/bin/bash`时`.bashrc`也会在这个新的 bash 实例启动的时候执行。

## `.zshrc` 文件是什么

对于使用 zsh shell 的用户来说，`.zshrc` 文件就相当于以上所讲的  `~/.bashrc` 和 `.bash_profile`。

