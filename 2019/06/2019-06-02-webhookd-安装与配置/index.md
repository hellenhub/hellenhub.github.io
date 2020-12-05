# Webhookd 安装与配置


Webhookd 是一个非常简单的 webhook 服务器启动 shell 脚本。目前使用十分方便，使用 go 开发，速度也很快。本文介绍了 Webhookd 安装与配置，采用了脚本自动化的方式来搭建整个自动化流程。

<!--more-->

## webhookd 介绍

> webhookd 是一个非常简单的 webhook 服务器启动 shell 脚本。目前使用十分方便，使用 go 开发，速度也很快。
> 由于 GitHub 请求时间有一个 10 秒的限制，因此在编写脚本的时候，采用了脚本内调用外部脚本的方式，来控制请求时长。
> 项目地址: [https://github.com/ncarlier/webhookd](https://github.com/ncarlier/webhookd)
> 配置文件参考: [webhookd.env](https://raw.githubusercontent.com/ncarlier/webhookd/master/etc/default/webhookd.env)
> 部署脚本参考: [github.sh](https://github.com/ncarlier/webhookd/blob/master/scripts/examples/github.sh)

## 一些约定 :

1. 所有的项目源码都放在 `/data/src/` 目录下;
2. 所有的脚本都放在 `/data/scripts/` 目录下，该目录下含有各个项目的脚步，每个项目会包含两个脚本:
   - 一个是 hook 请求脚步，脚本名称命名方式为 `{项目名}.sh` ，位于 `/data/scripts/` 下面;
   - 一个是 deploy 脚本，里面主要是部署项目的一些逻辑，平时添加 hooks 也只是主要编写这个脚步文件，命名方式为 `deploy_{项目名}.sh` ，位于 `/data/scripts/deploy/` 下面;
3. `/data/scripts/` 下面会创建一个 `addhook.sh` 脚本，是用来生成另外两个脚步(模板)的，以便减少编写脚本的工作量;
4. 配置文件设置为 `/etc/webhookd.env` ;
5. 请求地址使用 `http://hook.xxxx.xxx/{项目名}`

## 安装

### 准备

生产 ssh-key :

```shell
ssh-keygen -t rsa -b 4096 -C "jonny6015@qq.com"
openssl rsa -in ~/.ssh/id_rsa -outform pem > ~/.ssh/id_rsa.pem
```

将 ssh-key 公钥添加到 GitHub: `id_rsa.pub` 的内容。
创建一些文件夹:

`mkdir -p /data/scripts/deploy/ && mkdir -p /etc/webhookd/`

### Ubuntu

1. 配置仓库
   ```shell
   echo "deb http://packages.azlux.fr/debian/ buster main" | sudo tee /etc/apt/sources.list.d/azlux.list
   wget -qO - https://azlux.fr/repo.gpg.key | sudo apt-key add -
   apt-get -y update
   ```
2. 下载安装
   ```shell
   apt-get -y install webhookd
   systemctl start webhookd.service
   ```
3. 修改 `/etc/systemd/system/webhookd.service` 配置文件
   - 删除 `EnvironmentFile=-/etc/default/webhookd.env` 仅保留 `EnvironmentFile=-/etc/webhookd.env`
   - 保存即可
4. 修改 `/etc/webhookd.env`
   ```shell
   # Webhookd配置
   #是否开启 debug (写入日志)
   WHD_DEBUG=false
   # 日志目录
   WHD_LOG_DIR="/tmp"
   # 最大 hook 执行时间（以秒为单位），默认为10
   WHD_HOOK_TIMEOUT=600
   # HTTP 监听端口和地址, 默认 ":8080" 例如: `localhost:8080` or `:8080`
   WHD_LISTEN_ADDR=":7008"
   # Number of workers to start, default is 2
   #WHD_NB_WORKERS=2
   # 通知URI，默认情况下处于禁用状态
   # 例如: `http://requestb.in/v9b229v9` or `mailto://foo@bar.com?smtp=smtp-relay-localnet:25`
   #WHD_NOTIFICATION_URI=
   # 脚本位置，默认为 "scripts"
   WHD_SCRIPTS="/data/scripts"
   # GitHub 用于克隆存储库的私钥
   GITHUB_SECRET=~/.ssh/id_rsa
   # 例如: `/etc/webhookd/github_deploy_key.pem`
   WHD_SCRIPTS_GIT_KEY=~/.ssh/id_rsa.pem
   ```

### CentOS 的安装

- 待补充

## 脚本

### 生成新 hook 脚步的工具: _addhook.sh_ 脚本

- addhook.sh

```shell
clear
echo "################################################################"
echo "########    欢迎使用自动生成 WebHookd 脚本工具      ############"
echo "########    输入名字即可,建议对应 GitHub 仓库名      ###########"
echo -e "################################################################\n"
echo -n "Please enter the Repository name: "
read REPO_NAME
echo -n "Please enter the Branch name: "
read BRANCH_NAME

echo "你输入的应用是： ${REPO_NAME}"
ROOT_PATH="/data/scripts/webhookd"
SRC_PATH="/src/"
# echo -n "是否启用日志？ ( ture / false | y/n )":
# read  ENABLE_LOG
cat>${REPO_NAME}.sh<<EOF
#!/bin/env zsh
REPO_NAME="${REPO_NAME}"
DEGUG="true"
# log 文件位置
LOG_FILE="${ROOT_PATH}/logs/${REPO_NAME}_\$(date '+%Y%m%d_%H%M%S').log"
# 函数
payloadExit() { echo "错误: \$@" 1>&2 ; exit 1; }
isDebug() {
  [ "\$debug" = "true" ] && echo -e "Debug:\n \$@"
}
# 验证
payload=\$1
[ -z "\$payload" ] && payloadExit "payload 请求体不存在， 请检查配置。"
# Debug
isDebug "已收到 payload:\n \$payload"

#####################################################
############# 这里是真正要执行的脚本 ################

# 删除原有日志文件
cd /data/scripts/webhookd/logs || return
COUNT_LOGS=$(ls -l |grep "${REPO_NAME}*"|wc -l) && echo $COUNT_LOGS
if [ $COUNT_LOGS > 0 ] ; then
  echo "存在日志，先删除："
  rm -rf $REPO_NAME* || return
fi
# 调用部署脚本
cd ${ROOT_PATH}/deploy || return
nohup ${ROOT_PATH}/deploy/deploy_${REPO_NAME}.sh > "\${LOG_FILE}" 2>&1 &

####################################################

echo "已成功调用部署脚本，并后台运行部署；请稍后查看结果。"
echo "#########    ${REPO_NAME} hook 已发送完毕!   ########"
exit 0;
EOF
echo "==============================================="
echo "==============================================="
echo "========== 已生成 ${REPO_NAME}.sh 文件。========="
echo "==============================================="
echo "==============================================="

cat>./deploy/deploy_${REPO_NAME}.sh<<EOF
#!/bin/env zsh
REPO_NAME="${REPO_NAME}"
dateTime="\$(date '+%Y%m%d_%H%M%S')"
echo "进入项目目录："
cd "/src/${REPO_NAME}" || return
git pull origin ${BRANCH_NAME}:${BRANCH_NAME}
git reset --hard origin/${BRANCH_NAME}
git stash clear
git clean  -d  -fx .
git submodule update
git submodule foreach git checkout ${BRANCH_NAME}
git submodule foreach git pull origin ${BRANCH_NAME}
echo "已成功拉取最新代码！"

#***********  这里编写其余逻辑,如编译/部署等操作  **************
echo "***********     开始执行编译/部署操作：    ***************"





#********************  部署逻辑结束  ***************************
echo "ΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩ"
echo "ΩΩΩΩ      已成功部署 ${REPO_NAME}!      ΩΩΩΩ"
echo "ΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩ"
exit 0;
EOF
echo "已生成 deploy_${REPO_NAME}.sh"
chmod +x ${ROOT_PATH}/${REPO_NAME}.sh
chmod +x ${ROOT_PATH}/deploy/deploy_${REPO_NAME}.sh
echo "已添加执行权限！"
echo -e "\n###################################################################"
echo -e "###########################    完成！    ##########################\n"
echo "已生成${REPO_NAME}的 hook 脚本:"
echo $(ls -g ${ROOT_PATH}/${REPO_NAME}.sh)
echo "已生成${REPO_NAME}的 部署 脚本:"
echo $(ls -g ${ROOT_PATH}/deploy/deploy_${REPO_NAME}.sh)
echo -e "\n请编辑 \"/data/scripts/webhookd/deploy/deploy_${REPO_NAME}.sh\" 来启用自动化部署。"
echo -e "###################################################################\n"
exit 0;

```

