# 部署Gogs，导入repository

 1. 在OpenShift上部署gogs应用，部署包括gogs应用和mysql数据库。
```bash
$ oc new-project gogs
$ oc new-app -f https://raw.githubusercontent.com/liuxiaoyu-git/cicd-software-templates/master/gogs-persistent-template.yaml
```
 2. 在浏览器中进入gogs应用页面，先注册名为redhatdemo的用户，然后将以下2个repository导入到gogs中：
https://github.com/liuxiaoyu-git/GoldMiner-Game
https://github.com/liuxiaoyu-git/vote

# 部署游戏应用，配置webhook实现自动构建
 1. 部署游戏应用
```bash
$ oc new-project gold-miner-game
$ oc new-app httpd:2.4-el7~http://$(oc get route gogs -n gogs -o jsonpath='{.spec.host}')/redhatdemo/Gold-Miner-Game
$ oc expose svc gold-miner-game
```
 2. 设置游戏应用webhook，实现自动build。

1)在浏览器中查看gold-miner-game项目中名为gold-miner-game的buildconfig对象。

2)在webhooks区域点击“Copy URL with Secret”链接。

3)进入Gogs中的Gold-Miner-Game，然后再进入仓储设置->管理Web钩子，添加“Gogs”类型的Web钩子。

4)在推送地址中填入"2)"复制的链接，然后点击“添加web钩子”

5)修改Gogs中Gold-Miner-Game的代码，确认可触发新的gold-miner-game构建。

# 部署投票应用
## 部署投票数据库
 1. 部署mysql数据库（基于php的应用使用的是MySQL5.7数据库）
```bash
$ oc new-project vote
$ oc new-app --name mysql -e MYSQL_USER=openshift -e MYSQL_PASSWORD=password -e MYSQL_DATABASE=demodb -e MYSQL_ROOT_PASSWORD=password centos/mysql-57-centos7
```
 2. 创建应用需要的数据表
```
$ oc rsh $(oc get pods --output=jsonpath={.items[0].metadata.name} --field-selector status.phase=Running)
# mysql -h127.0.0.1 -P3306 -uopenshift -ppassword
mysql> use demodb;
mysql> drop table vote;
mysql> create table vote (vote_item varchar(20));
mysql> insert into vote values('red');
mysql> insert into vote values('red');
mysql> insert into vote values('red');
mysql> insert into vote values('green');
mysql> insert into vote values('green');
mysql> select vote_item, count(vote_item) vote_count from vote group by vote_item;
mysql> exit
# exit
```

## 部署投票应用

 1. 部署vote应用
```bash
$ oc new-app php:7.3-ubi7~http://$(oc get route gogs -n gogs -o jsonpath='{.spec.host}')/redhatdemo/vote --name=vote --env MYSQL_SERVICE_HOST=mysql.vote.svc MYSQL_SERVICE_PORT=3306 DATABASE_NAME=demodb DATABASE_USER=openshift DATABASE_PASSWORD=password
$ oc expose svc vote
```

# 演示步骤
1）访问游戏
2）访问vote并刷新投票结果
3）根据投标结果更新vote repository的代码
4）确认可以自动更新应用
5）重新访问应用，确认应用已经更新
