# ZSH 插件介绍


ZSH 插件的介绍和一些基本配置。

<!--more-->

# ZSH 插件介绍

## 常用插件介绍

- alias-finder : 查找某个完整命令的 alias。
  - alias-finder "git pull"
- git : Oh-My-ZSH 默认开启，它支持 Git 别名、标签补全以及所有 Git 命令的描述。
  - `git + tab`
- node : 在浏览器打开当前版本的 Node.js API。
  - `node-docs http`
- npm : 给 npm 添加自动补全，显示所有的 npm 命令。
  - `npm + tab`
- yarn : 给 yarn 添加自动补全，显示所有的 yarn 命令。
  - `yarn + tab`
- yum : 给 yum 添加自动补全，显示所有的 yum 命令。
  - `yum + tab`
- bower : 给 Bower 命令添加自动补全。
  - `bower + tab`
- brew : 给所有 Brew 命令添加自动补全和描述。
  - `brew + tab`
- osx : 支持在终端上使用很多 Finder 命令，[查看详情](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/osx#commands)。
- z.lua: 命令行目录跳转工具，性能优于 z 和 autojump。[安装方法](https://github.com/skywind3000/z.lua/blob/master/README.cn.md#install)
- battery : 电池插件-此插件添加了一些函数，可用于在自定义主题中显示电池信息。
  `.zshrc: --> RPROMPT='$(battery_pct_prompt) ...'`
- bbedit : BBEdit 插件，Mac OS X 的 HTML 和文本编辑器
- branch : 快速显示当前 Git 或 Mercurial 分支。

  ```shell
  - PROMPT='${ret_status}%{$fg_bold[green]%}%p %{$fg[cyan]%}%c %{$fg_bold[blue]%}$(git_prompt_info)%{$fg_bold[blue]%} % %{$reset_color%}'
  + PROMPT='${ret_status}%{$fg_bold[green]%}%p %{$fg[cyan]%}%c %{$fg_bold[blue]%}$(git_prompt_info)$(branch_prompt_info)%{$fg_bold[blue]%} % %{$reset_color%}'
  ```

- colored-man-pages : 高亮显示 man 命令内容。
- colorize : 有了这个插件，你可以语法突出显示文件内容超过 300 种支持的语言和其他文本格式。
- command-not-found : 此插件在找不到命令时提供要安装的建议包。
- common-aliases : 常用的 alias。
- dash : 为 Dash 添加命令行功能，一个用于 macOS 的 API 文档浏览器。此插件需要安装 Dash 才能工作。
  - `dash golang / dash python:tuple`
- docker-compose : 给 docker-compose 添加自动补全，显示所有的 docker-compose 命令，提供一些 docker-compose 命令的别名。具体[参考这里](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/docker-compose#aliases)
- docker : 给 docker 添加自动补全，显示所有的 docker 命令，提供一些 docker 命令的别名。
- emoji : 支持在 Zsh 中方便地使用 Unicode 表情符号。
  - `echo $emoji[mouse_face] / random_emoji`
- extract : 用于提取您传递的存档文件，它支持各种存档文件类型。
  - `extract xxx.tar.gz`
- fancy-ctrl-z : 使用 Ctrl-Z 切换回 Vim。
- forklift : OS X 的 FTP 应用程序。
  - `fl [<file_or_folder>]`
- fzf : fzf 是一个通用命令行模糊查找器。（ 需要安装 fzf： brew install fzf ）
  - 配置： `export FZF_BASE=/path/to/fzf/install/dir`
- git-auto-fetch : 在 git 初始化目录中工作时，自动从所有远程获取所有更改。
  - 间隔时间配置： `GIT_AUTO_FETCH_INTERVAL=1200`
- git-prompt : 显示有关当前 git 存储库的信息的提示。
- gitfast : 此插件使用 git.git 人员的 zsh 完成，这比 zsh 的官方完成速度要快得多。
- github : github 插件。
  - 配置环境变量 : `$GITHUB_USER / $GITHUB_PASSWORD`
  - Git 配置选项 : `github.user` - 用于存储库操作的 GitHub 用户名
  - 用法 : `man hub`
- gitignore : 此插件使您能够使用命令 gitignore.io 命令行的一个应用程序。
  - 查看 : `gi list`
  - 使用 : `gi java`
- golang : 此插件添加了 Go 编程语言的完成，以及常见 Golang 命令的一些别名。
  - 具体别名与使用方法[查看这里](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/golang#aliases)
- gradle : 增加了自动完成和别名的 gradle 。
- gulp : 自动完成 gulp 。
- history : 提供了几个方便的别名，用于使用 命令来检查命令行历史记录。
  用法 1： `h : history` 打印命令历史记录 ；
  用法 2： `hs : history | grep` 使用 grep 搜索命令历史记录 ；
  用法 3： `hsi : history | grep -i` 使用 grep 对命令历史记录进行不区分大小写搜索 。
- iterm2 : Iterm2 插件。
- jenv : 类似于 rbenv 和 pyenv 的 Java 版本管理器。
- jsontools : 用于处理 json 数据的方便的命令行工具。

  ```shell
  pp_json： 漂亮的打印 json 。如： curl https://coderwall.com/bobwilliams.json | pp_json
  is_json： 如果有效 json， 返回 true;假， 否则。
  urlencode_json： 返回给定 json 的 URL 编码字符串。
  urldecode_json： 返回给定 URL 编码字符串的解码 json。
  ```

- rvm : rvm 别名和自动完成插件 - Ruby 版本管理器：<https://rvm.io/>。
- mvn : mvn 别名和自动完成插件。
- nvm : nvm 别名和自动完成插件。
- npm : npm 别名和自动完成插件。
- npx : npx 别名和自动完成插件。
- pip : pip 别名和自动完成插件。
- pipenv : 此插件提供了一些功能，以简化使用 Pipenv。
- pyenv : 这个插件寻找 pyenv，一个简单的 Python 版本管理系统。
- python : 该插件为有用的 python 命令添加了多个别名。
- rails : 此插件添加了 Ruby On Rails 框架和 Rake 命令的完成，以及日志和环境变量的一些别名。
- rbenv : 这个插件的主要工作是提供可以添加到您的主题，包括 Ruby 版本和宝石集信息到您的提示。
- redis-cli : 此插件添加 redis-cli 完成，基于 Homebrew 完成。
- shell-proxy : 命令行代理工具，具体使用[参考这里](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/shell-proxy#usage)。
- spring : Spring Boot oh-my-zsh 插件。
- systemd : systemctl 插件。[参考](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/systemd#aliases)
- sudo : 按两次 ESC 自动在命令行前加 sudo 。
- textastic : Textastic 插件 Mac OS X。
- themes : 这个插件允许您更改 ZSH 主题。
  - 使用 1： `theme <theme_name>` - 将 ZSH 主题更改为指定主题。
  - 使用 2： `theme` - 将 ZSH 主题更改为一些随机主题。
  - 使用 3： `lstheme` - 列出已安装的 ZSH 主题。
- timer : 显示命令的执行时间。
- ubuntu : Ubuntu 自动完成和 alias。
- ufw : 这个插件增加了用于管理每个人最喜欢的简单防火墙（UFW）的完成，这是一个管理 iptable 的简单界面。
- urltools : 此插件提供两个别名到 URL 编码和 URL 解码字符串。

  ```shell
  urlencode 'https://github.com/ohmyzsh/ohmyzsh/search?q=urltools&type=Code'
  # returns https%3A%2F%2Fgithub.com%2Fohmyzsh%2Fohmyzsh%2Fsearch%3Fq%3Durltools%26type%3DCode
  urldecode 'https%3A%2F%2Fgithub.com%2Fohmyzsh%2Fohmyzsh%2Fsearch%3Fq%3Durltools%26type%3DCode'
  # returns https://github.com/ohmyzsh/ohmyzsh/search?q=urltools&type=Code
  ```

- vscode : 此插件提供了有用的别名，以简化命令行与 VS 代码或 VSCodium 编辑器之间的交互。
- web-search : 这个插件增加了搜索谷歌，维基，必应，YouTube 和其他流行的服务的别名。
  - 使用 : `google oh-my-zsh` `bing content`
- zsh-navigation-tools : Zsh 导航工具。
  - 配置： <https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/zsh-navigation-tools#configuration>
  - 使用： <https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/zsh-navigation-tools#introduction>

## 插件的安装

在 `~/.zshrc` 中的 `plugins=(...)` 中添加对应的插件名即可，上述插件，唯有 z.lua 需要安装。

```shell
cd ~
curl -R -O http://www.lua.org/ftp/lua-5.4.0.tar.gz
tar zxf lua-5.4.0.tar.gz
cd lua-5.4.0
make
sudo make install
lua -v
rm -rf lua-5.4.0
git clone https://github.com/skywind3000/z.lua.git ~/.oh-my-zsh/custom/plugins/z.lua
```

```shell
plugins=(
    alias-finder
    battery
    bbedit
    bower
    branch
    brew
    colored-man-pages
    colorize
    command-not-found
    common-aliases
    dash
    docker
    docker-compose
    emoji
    extract
    fancy-ctrl-z
    forklift
    fzf
    git
    git-auto-fetch
    git-prompt
    gitfast
    github
    gitignore
    golang
    gradle
    gulp
    history
    iterm2
    jenv
    jsontools
    mvn
    node
    npm
    npx
    nvm
    osx
    pip
    pipenv
    pyenv
    python
    rails
    rbenv
    redis-cli
    rvm
    shell-proxy
    spring
    sudo
    systemd
    textastic
    themes
    timer
    ubuntu
    ufw
    urltools
    vscode
    web-search
    yarn
    yum
    z.lua
    zsh-navigation-tools
)
eval "$(lua ~/.oh-my-zsh/custom/plugins/z.lua/z.lua  --init zsh once enhanced)"    # ZSH 初始化
```

