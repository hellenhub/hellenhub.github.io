# Ubuntu 初始化记录


使用腾讯云 CVM 安装了系统之后，需要做的一些基本设置与配置。

<!--more-->

## 系统更新与优化

> 本文默认: 在开启 root 登录后，一切使用 root 用户操作。

### 开启 root 登录

默认可登录帐户名是: ubuntu(密码可以使用 key，或者安装时设定)， 为了使用 root 需要开启。

```shell
# 我使用 key 登录，先修改 ubuntu 密码
sudo passwd ubuntu
# 修改 root ，可以与 ubuntu 一样
sudo passwd root

# 修改 ssh 配置  末尾添加: PermitRootLogin yes
sudo vim /etc/ssh/sshd_config
PermitRootLogin yes
# PasswordAuthentication yes 修改这个参数 no 改为 yes 是为了使用密码可以登录，默认只能使用 ssh-key
sudo service ssh restart
# 然后使用 root 用户登录即可，如果无法使用 ssh-key 登录，可以使用以下命令(确保本地已生成 ssh-key):
# 本地使用，非服务器
ssh-copy-id -i ~/.ssh/id_rsa user@host
# 附上生成 ssh-key 的命令，建议一路回车即可
ssh-keygen -t rsa -b 4096 -C "user@163.com"
ssh-copy-id -i ~/.ssh/id_rsa root@150.109.108.7
```

### 更新系统，安装常用软件。

> 使用 root 登录之后操作

```shell
# 更新系统
apt-get -y update && apt-get -y upgrade
# 安装常用软件
apt-get -y install git vim zsh aptitude exuberant-ctags wget \
    screen apt-transport-https ca-certificates curl \
    software-properties-common openssh-server snap landscape-common fish \
    build-essential debian-keyring gcc-4.1-doc \
    lib64stdc++6 glibc-doc manpages-dev libstdc++6-4.1-doc \
    bison ed gawk gcc libc6-dev make cmake
# 安装 webhookd
echo "deb http://packages.azlux.fr/debian/ buster main" | sudo tee /etc/apt/sources.list.d/azlux.list
wget -qO - https://azlux.fr/repo.gpg.key | sudo apt-key add -
sudo apt-get -y install webhookd

# 下载 OneinStack 并解压
cd ~ && wget http://mirrors.linuxeye.com/oneinstack-full.tar.gz && tar xzf oneinstack-full.tar.gz

# 安装 GoLang
sudo add-apt-repository ppa:longsleep/golang-backports
sudo apt-get -y update
sudo apt-get -y install golang-go

# 安装 OhMyZsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

```

### 配置 OhMyZsh

- zshrc 文件:

```shell
export PATH=$HOME/bin:/usr/local/bin:$PATH
export ZSH="/root/.oh-my-zsh"
ZSH_THEME="robbyrussell"
plugins=(
    z git mvn npm nvm ubuntu github docker docker-compose git-auto-fetch alias-tips
    zsh-autosuggestions zsh-syntax-highlighting zsh-completions
)
source $ZSH/oh-my-zsh.sh
# User configuration
export MANPATH="/usr/local/man:$MANPATH"
export LANG=zh_CN.UTF-8
[[ -e ~/.profile ]] && emulate sh -c 'source ~/.profile'
# Compilation flags
export ARCHFLAGS="-arch x86_64"
# Set personal aliases
alias zshconfig="vim ~/.zshrc"
alias zshsource="source ~/.oh-my-zsh"
alias rm="rm -r"
alias cp="cp -f"
alias mv="mv -f"
# nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

- 安装插件

```shell
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-completions
git clone https://github.com/djui/alias-tips ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/alias-tips
git clone https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
source ~/.zshrc
```

### 安装 npm & nvm

```shell
# 安装nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
sudo tee ~/.profile <<-'EOF'
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
EOF
sudo tee ~/.zshrc <<-'EOF'
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
EOF
source ~/.zhsrc
# 安装 Node 和 最新版 npm
nvm install --lts
nvm use --lts
nvm install-latest-npm
# 配置 cnpm [[ 仅国内机房使用 ]]
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 配置 中文环境

设置命令(root):

```shell
dpkg-reconfigure locales
# 第一步:选择所有 zh_CN 开头的
# 第二步: 选择 zh_CN.UTF-8
```

配置:

```shell
# 注释原有的内容
sed 's/^/#&/g' /etc/default/locale
# 修改 /etc/default/locale [配置中文]
cat >>/etc/default/locale<<EOF
LANG="zh_CN.UTF-8"
LANGUAGE="zh_CN:zh"
LC_NUMERIC="zh_CN"
LC_TIME="zh_CN"
LC_MONETARY="zh_CN"
LC_PAPER="zh_CN"
LC_NAME="zh_CN"
LC_ADDRESS="zh_CN"
LC_TELEPHONE="zh_CN"
LC_MEASUREMENT="zh_CN"
LC_IDENTIFICATION="zh_CN"
LC_ALL="zh_CN.UTF-8"
EOF
# 不修改原有内容！ [配置中文]
cat >>/etc/environment<<EOF
LANG="zh_CN.UTF-8"
LANGUAGE="zh_CN:zh"
LC_NUMERIC="zh_CN"
LC_TIME="zh_CN"
LC_MONETARY="zh_CN"
LC_PAPER="zh_CN"
LC_NAME="zh_CN"
LC_ADDRESS="zh_CN"
LC_TELEPHONE="zh_CN"
LC_MEASUREMENT="zh_CN"
LC_IDENTIFICATION="zh_CN"
LC_ALL="zh_CN.UTF-8"
EOF
```

### 修改登录界面:

去除一些臃肿的信息

```shell
mv /etc/update-motd.d/50-motd-news /etc/update-motd.d/50-motd-news.bak
mv /etc/update-motd.d/80-livepatch /etc/update-motd.d/80-livepatch.bak
mv /etc/update-motd.d/10-help-text /etc/update-motd.d/10-help-text.bak

```

添加登录图画，可自定义

```shell
sudo tee /etc/motd <<-'EOF'
       dP
       88
       88 .d8888b. 88d888b. 88d888b. dP    dP
       88 88'  `88 88'  `88 88'  `88 88    88
88.  .d8P 88.  .88 88    88 88    88 88.  .88
 `Y8888'  `88888P' dP    dP dP    dP `8888P88
oooooooooooooooooooooooooooooooooooooo~~~~.88~
                                      d8888P
EOF
```

### webhookd 配置

```service
[Unit]
Description=WEBHOOKD

[Service]
ExecStart=webhookd
User=webhookd
Group=webhookd
EnvironmentFile=-/etc/default/webhookd.env
EnvironmentFile=-/etc/webhookd.env
Restart=always
Type=simple
RestartSec=30s

[Install]
WantedBy=multi-user.target
```

```shell

# 安装 nodejs & nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
sudo tee ~/.profile <<-'EOF'
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
EOF
source ~/.profile
```

