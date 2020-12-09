# Docker 常用命令


Docker 常用命令集合

<!--more-->

## 操作容器

### 手动更新容器

```shell
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower -cR \
    容器名1 容器名2 容器名3
```

### 用一行列出所有正在运行的 container

> 容器多的时候非常清晰

```shell
docker ps | less -S
```

### 查看容器日志

```shell
docker logs <id/container_name>
```

### 实时查看日志输出

```shell
docker logs -f <id/container_name>  # (类似 tail -f) (带上时间戳-t）
```

### 停止所有的容器

```shell
docker stop $(docker ps -aq)
```

### 删除所有的容器

```shell
docker rm $(docker ps -aq)
```

### 删除所有 **关闭** 的容器

```shell
docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs docker rm
```

### 删除所有 dangling 镜像(即无 tag 的镜像)：

```shell
docker rmi $(docker images | grep "^<none>" | awk "{print $3}")
```

### 删除所有 dangling 数据卷(即无用的 volume)：

```shell
docker volume rm $(docker volume ls -qf dangling=true)
```

# 重启所有容器

```shell
docker restart $(docker ps -a | awk '{ print $1}' | tail -n +2)
```

## 操作 Image

### 删除所有的镜像

```shell
docker rmi $(docker images -q)
```

### 复制文件

```shell
# container --> 宿主机
docker cp <container name>:/opt/<file name> /opt/local/

# 宿主机 --> container
docker cp /opt/local/<file name> <container name>:/opt/
```



