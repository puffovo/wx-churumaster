# 学校人员出入登记小程序
这是疫情防控下的一款学校人员出入登记系统小程序，该项目使用云开发，无需后端部署。学校人员通过输入关键信息，如姓名、体温等，即可实现出入登记。一旦有确诊病例，管理员可通过申请时间、出入地点，在前端查询出同一天、同一地点接触人员信息，该项目避免了直接接触，有效预防交叉感染
# 技术栈
微信开发者工具 + colorui + 云开发
# 项目部署
1. 请先在[微信公众平台](https://mp.weixin.qq.com/)申请独属于您的appid,并在后端开发中中选择云开发；
2. 开通云开发，并将环境ID配置在miniprogram/app.js中；
```

      wx.cloud.init({
        env: 'puffovo-v2czz', // 您的环境ID
        traceUser: true,
      })
      
```
3. 云数据库中新建inf、record两个集合，分别是用户信息、登记信息。管理员也可以在数据库中直接完成增删改查操作；
4. 代码上传后可在微信官方审核上线，需要注意，由于该程序使用到wx.getLocation获取用户位置，需要先申请使用该api后方可通过审核，
5. wx.getLocation只能获取到用户的经纬度，为了获取到用户的准确位置（包括城市街道等），需要调用第三方服务进行逆地址解析。该项目使用的腾讯地图API
   调用腾讯地图API的具体步骤可分为以下三个步骤：
  （1）打开[腾讯地图位置服务](https://lbs.qq.com/，申请开发者密钥，开通webserviceAPI服务，下载微信小程序JavaScriptSDK)；
  （2）打开小程序官方网站，在设置中的开发设置中设置request合法域名，添加https://apis.map.qq.com；
  （3）把下载的javascriptsdk放入小程序miniprogram/lib/qqmap-wx-jssdk路径中，并在miniprogram/pages/crdj/crdj.js里引入。
# 成果展示
### 首页
![首页](https://github.com/puffovo/wx-churumaster/blob/main/screenshots/1.png)
### 出入登记
![出入登记](https://github.com/puffovo/wx-churumaster/blob/main/screenshots/2.png)
### 完善信息
![完善信息](https://github.com/puffovo/wx-churumaster/blob/main/screenshots/3.png)
### 管理员查询（主界面）
![查询](https://github.com/puffovo/wx-churumaster/blob/main/screenshots/4.png)
### 管理员查询（出入日志）
![出入日志](https://github.com/puffovo/wx-churumaster/blob/main/screenshots/5.png)
### 管理员查询（查询记录）
![出入日志](https://github.com/puffovo/wx-churumaster/blob/main/screenshots/6.png)
### 系统简介
![系统简介](https://github.com/puffovo/wx-churumaster/blob/main/screenshots/7.png)
### 结语
该小程序适合初学小程序想要练手的伙伴，还有待完善，虚心请教！
