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
