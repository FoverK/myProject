// pages/showArticle/showArticle.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onShow: function() {
    this.getArticle();
  },

  onLoad: function(options) {
    /*request,需要获得数据库中所有日记总数 */
    this.getArticle();
  },

  getArticle() {
    var that = this;
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/diary/get', {
          nickName: res.userInfo.nickName
        }, function(res) {
          that.setData({
            diaryList: res.data
          })
          console.log(res.data)
        })
      }
    })
  },

  addArticle: function() {
    wx.navigateTo({
      url: '/pages/addArticle/addArticle',
    })
  },
})