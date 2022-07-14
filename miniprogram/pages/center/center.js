// pages/center/center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    app:getApp(),
    
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           this.setData({
    //             avatarUrl: res.userInfo.avatarUrl,
    //             userInfo: res.userInfo
    //           })
    //         }
    //       })
    //     }
    //   }
    // })

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

  },

  // bindGetUserInfo (e) {
  //   console.log(e.detail.userInfo)
  // },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
      console.log(this.data.userInfo);
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
    this.onGetOpenid();
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
  /**
   *  跳转到完善信息页面
   */
  navToUserInfoPage:function () {
    // 先看一下openid
    //console.log(getApp().globalData.openid);
      wx.navigateTo({
        url: "/pages/userinfo/userinfo",
      })
  },
  /**
   * 扫描二维码
   */
  scanQcode:function () {
    wx.scanCode({
      success(res) {
        console.log(res);
        // charSet: "utf-8"
        // errMsg: "scanCode:ok"
        // rawData: "bDAxd1pWRllhSHE1ZSp+Y1lfLSxqTDA="
        // result: ""
        // scanType: "WX_CODE"
        // 判断 如果scanType 等于 WX_CODE 则继续读取rawData中的内容和数据库中的二维码数据比较
        console.log(res.scanType);
        if (res.scanType == "WX_CODE"){
            console.log("扫码成功");
         
          console.log(scene);
            wx.navigateTo({
              url: '/pages/access/access/sence='+scene,
            })
        }else{
          console.log("扫码失败");
          wx.showToast({
            title: '扫码失败',
            icon: 'success',
            duration: 2000
          })
        }        
      }
    })
  },
  /**
   * 跳转到我也要用
   */
  navToAreaInfoPage:function() {
    // 首先获取数据验证当前用户是否已经填写小区信息
    var localOpenid =  this.data.app.globalData.openid;

    const db = wx.cloud.database();
    db.collection('system_area').where({
      _openid: localOpenid,
      }).
    get({
      success: function (res) {
      
        console.log(res.data);
        console.log(res.data.length);
        if(res.data.length == 0 ){
          console.log("nav to areainfo");
          wx.navigateTo({
            url: '/pages/areainfo/areainfo',
          })
        }else{
          if (res.data[0].status == 1) {
            console.log("nav to listinfo");
            getApp().globalData.areainfo = res.data[0];
            console.log("globalData" + getApp().globalData.areainfo);
            wx.navigateTo({
              url: '/pages/arealist/arealist',
            })
          } else {
            console.log("nav to areainfo");
            wx.navigateTo({
              url: '/pages/areainfo/areainfo',
            })
          }
        }
     

      }
    });
  },
  navToLinkusPage:function(){
    wx.navigateTo({
      url: '/pages/linkus/linkus',
    })
  },
  navToadministertorPage:function() {
    wx.navigateTo({
      url: '/pages/arealist/arealist',
    })
  },
  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  /**
   * 跳转到出入登记页面
   */
  navToAccessPage:function()  {
    // 需要先判断是否存在scence
    let _scene = getApp().globalData.scene;
    console.log("globalData.scence : "+_scene);
    if (typeof _scene == "undefined"){
      // 弹出对话框，让先扫码
      wx.showModal({
       
        content: '请先通过微信扫一扫扫描小区/社区出入口二维码，方可登记',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
    // 先判断该用户是否存在，存在则跳转到access,不存在则跳转到userInfo页面
    let _openids = getApp().globalData.openid;
    const db = wx.cloud.database();
    db.collection('system_user').where({
      _openid: _openids,
    }).
      get({
        success: function (res) {
          console.log(res.data);
          console.log(res.data.length);
          if (res.data.length == 0) {
            console.log("nav to userinfo");
            wx.navigateTo({
              url: '/pages/userinfo/userinfo?info=1',
            })
          } else {
            if (res.data[0].status == 1) {
              console.log("nav to listinfo");
              getApp().globalData.areainfo = res.data[0];
              console.log("globalData" + getApp().globalData.areainfo);
              wx.navigateTo({
                url: '/pages/access/access?scene=' + getApp().globalData.scene,
              })
            } else {
              console.log("nav to userinfo");
              wx.navigateTo({
                url: '/pages/userinfo/userinfo?info=1',
              })
            }
          }

        }
      });
    // wx.navigateTo({
    //   url: '/pages/access/access',
    // })
  }
  },

  

// 跳转出入登记，改后
navToCrdjPage:function () {
  // 先看一下openid
  //console.log(getApp().globalData.openid);
    wx.navigateTo({
      url: "/pages/crdj/crdj",
    })
},

//跳入管理员界面
navToGlyPage:function () {
  // 先看一下openid
  //console.log(getApp().globalData.openid);
    wx.navigateTo({
      url: "/pages/gly/gly",
    })
},



navToOutdjPage:function () {
  // 先看一下openid
  //console.log(getApp().globalData.openid);
    wx.navigateTo({
      url: "/pages/outdj/outdj",
    })
},

})




