// miniprogram/pages/gly/gly.js
Page({

  /**
   * 页面的初始数据
   */

  // submit: function(e){
  //   wx.request({
  //     url: '接口',
  //     data:{
  //       username:e.detail.value.username,
  //       password:e.detail.value.pwd
  //     },
  //     success:function(res){
  //       if(res.statusCode ==200){
  //         if(res.data.error == true){
  //           wx.showToast({
  //             title: '网络错误',
  //             icon: 'none',
  //             duration:2000
  //           })
  //         }else{
  //           wx.setStorage({
  //             key: 'user',
  //             data: 'res.data.user',
  //           });
  //           wx.showToast({
  //             title:"登录成功",
  //             icon:"Yes",
  //             duration:2000,
  //             success:function(){
  //               setTimeout(function(){
  //                 wx.switchTab({
  //                   url: '../index/index',
  //                 },2000)
  //               })
  //             }
  //           })
  //         }
  //       }
  //     }
  //   })
  // },
 






  data: {

  },
  formSubmit: function (e) {
    let time = e.detail.value.time
    // console.log('time', time)
    let location = e.detail.value.location
    const db = wx.cloud.database();
    db.collection('record').where({
      // 'name':'武汉工程大学',
      // 'time':'2021/5/25'
      'name': location,
      'time': time
    })
    .get({
      success: function(res) {
        // console.log('cxres',res.data)
        const data = JSON.stringify(res.data)
        wx.navigateTo({
          url: '../touchInfo/touchInfo?record='+data,
/*           success: function(res) {
            // console.log('resdataw', data)
            // 通过eventChannel向被路由页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', { data: data})
          } */
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  /*   const db = wx.cloud.database();
    db.collection('record').where({
      // _openid: 'oPSkH5h8b4xTfulugT-7dukdi_qg',
      'name':'武汉工程大学',
      'time':'2021/5/25'
    })
    .get({
      success: function(res) {
        console.log(res.data)
      }
    }) */
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

  }
})



// const db = wx.cloud.database();
// db.collection('record').where({
//   // _openid: 'oPSkH5h8b4xTfulugT-7dukdi_qg',
//   'name':'武汉工程大学',
//   'time':'2021/5/25'
// })
// .get({
//   success: function(res) {
//     console.log(res.data)
//   }
// })
