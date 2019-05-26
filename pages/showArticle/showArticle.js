// pages/showArticle/showArticle.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    pageSize: 5,
    diaryList: [],
    hasData:false
  },

  onShow: function() {
    this.getArticle();
  },

  onLoad: function(options) {

  },

  getArticle() {
    /**
     * &photo={{item.photo}}&title={{item.title}}&content={{item.content}}&time={{item.time}}&sentiment={{item.sentiment}}
     */
    var that = this;
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/diary/get', {
          nickName: res.userInfo.nickName,
          start: that.data.currentPage,
          size: that.data.pageSize
        }, function(res) {

          if (that.data.diaryList != null && (that.data.diaryList.length == res.data.length)) {
            wx.showToast({
              title: '没有更多数据啦',
              icon:'none',
              duration: 1000
            })
            that.setData({
              hasData:true
            })
          }

          that.setData({
            diaryList: res.data,
          })

          let diaryList = that.data.diaryList;
          for (let i = 0; i < diaryList.length; ++i) {
            diaryList[i].content = diaryList[i].content.substring(0, 30);
          }

          that.setData({
            diaryList: diaryList
          })
        })
      }
    })


  },

  addArticle: function() {
    wx.navigateTo({
      url: '/pages/addArticle/addArticle',
    })
  },

  showDetail: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detailArticle/detailArticle?id = ' + id,
    })
  },

  //上拉加载
  onReachBottom() {
    var that = this

    wx.showLoading({
      title: '正在加载',
    })

    var pageSize = that.data.pageSize + 5
    that.setData({
      pageSize: pageSize
    })

    that.getArticle()
    wx.hideLoading()
  }
})