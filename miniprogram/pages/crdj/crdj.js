// miniprogram/pages/crdj/crdj.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',// 单位名称
    username:'', // 用户姓名
    access:'', // 申请进门or出门
    health:'', // 是否健康
    temperature:'', // 体温
    remark:'',//备注
   // sence:'',
    //value:'',
    // lat:'', //纬度
    // lon:'',//经度
    time:'', //申请日期
    province:'',
    city:'',
    district:'',
    street:'',
    address:[{
      province:'',
      city:'',
      district:'',
      street:'',
      street_number:''

    }]

  },

//获取radio中的value（申请出门、进入）
  swiperChange:function(e){
    var that = this;
    var radioValue = e.detail.value;
    that.setData({
      access: radioValue
    })
    console.log(that.data.access);
  },

  //获取switch中的checked（是否健康）
  switchChange: function(e) {
    //得到值
    var that = this;
    var checkedValue = e.detail.value;  
    //打印输出 
    that.setData({
      health: checkedValue
    })
     //console.info("当前开关按钮是否打开："+checkedValue);
    console.log(that.data.health);
    },
  
  //  //获取用户位置
  //   getlocal:function(e){
  //     var that = this;
  //     wx.getLocation({
  //       type: 'wgs84',
  //       success (res) {
  //         const latitude = res.latitude
  //         const longitude = res.longitude
  //         const speed = res.speed
  //         const accuracy = res.accuracy
  //         console.info(res)
  //         var lat = latitude;
  //         var lon = longitude;
  //         that.setData({
  //           lat:latitude,
  //           lon:longitude
  //         })
  //       },
  //       fail: function (errInfo) {
  //         console.info(errInfo)
  //       }
  //      }) 
  //   },



// 获取用户所在地信息
  // 使用腾讯地图
  getlocal:function(e)  {
  	// 注意，将that修改为this
    let that=this;
    // 在https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview地址下载qqmap-wx-jssdk.js文件
    let Map = require('../../lib/qqmap-wx-jssdk');
    // 在https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/qqMapwx创建密钥
    let map = new Map({
      key: 'OLJBZ-ZEO6F-7PDJB-NSNKG-CNRCS-VBBSW'
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // 将坐标发送到腾讯后台进行解析定位
        map.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            let address = addressRes.result.address_component
            that.setData({
              address: {
                province: address.province,//省
                city: address.city,//市
                district:address.district,//区
                street:address.street,//街道
                street_number:address.street_number//门牌号
              }
            })
            console.log(that.data.address)


          },
          fail(err) {
            console.log(err);
          }
        })
      }
    })
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value);
    const db = wx.cloud.database();
    db.collection('record').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name:e.detail.value.name,
        username:e.detail.value.username,
       access:this.data.access,
        health: this.data.health,
        temperature: e.detail.value.temperature,
        remark: e.detail.value.remark,
        // areaid: this.data.sence,
        address:this.data.address,
        date: new Date(),
        status: 1,
        lat:this.data.lat,
        lon:this.data.lon,
        time: e.detail.value.time,
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res);
        // 如果成功，则跳转到成功的页面，带上id
        wx.showModal({
          content: '提交成功',
          showCancel:false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        // wx.navigateTo({
        //   url: '/pages/crdj?id='+res._id,
        // })

      },
      fail:function(res){
        console.log(res);
        wx.navigateTo({
          url: '/pages/crdj'
        })
      }
      
    });
  },





  







})

