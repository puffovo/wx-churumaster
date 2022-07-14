// miniprogram/pages/outdj/outdj.js
const db = wx.cloud.database();

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    names:'',// 单位名称
    usernames:'', // 用户姓名
    access:'', // 申请进门or出门
    health:'', // 是否健康
    temperature:'', // 体温
    remark:'',//备注
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

    }],

    step: 1,
    counterId: '',
    openid: '',
    count: null,
    queryResult: '',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query,options) {


    // var _this = this;

    // const scene = decodeURIComponent(query.scene) ? decodeURIComponent(query.scene):options.scene;
  
    // 需要查询出该小区的名称
  //  this.setData({
  //    sence:scene
  //  });
  //  getApp().globalData.scene = scene;
   
  //  需要获取到单位名称和用户名称
    // const db = wx.cloud.database();
    // db.collection('record').where({
    //   // 获取到小区的名字
    //   usernames:username
    // }).get({
    //   success: function (res) {
    //       console.log(res);
    //       // 设置小区名称
    //       _this.setData({
    //         names:res.data[0].name
    //       })
    //   }
    // }
    // )
    // var app = getApp();     

    // let openid = app.globalData.openid;
    // console.log("测试");
    // console.log(typeof openid != 'undefined');
    // if (typeof openid != 'undefined')
    //  console.log("获取用户名称");
    // // 获取用户名称
    // db.collection('system_user').where({
    //   _openid:openid
    // }).get({
    //   success: function (res) {
    //     console.log(res);
    //     _this.setData({
    //       username: res.data[0].username
    //     })
    //   }
    // })

    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }


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
  db.collection('record').where({
    // 获取到小区的名字
    _username:this.data.username
  }).get({
    success: function (res) {
        console.log(res);
        // 设置小区名称
        _this.setData({
          name:res.data[0].name
        })
    }
  })
},



// onQuery: function() {
//   const db = wx.cloud.database()
//   // 查询当前用户所有的 counters
//   db.collection('record').where({
//     _openid: this.data.openid
//   }).get({
//     success: res => {
//       this.setData({
//         queryResult: JSON.stringify(res.data, null, 2)
//       })
//       console.log('[数据库] [查询记录] 成功: ', res)
//     },
//     fail: err => {
//       wx.showToast({
//         icon: 'none',
//         title: '查询记录失败'
//       })
//       console.error('[数据库] [查询记录] 失败：', err)
//     }
//   })
// },





})

