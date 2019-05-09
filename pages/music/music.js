// pages/music/music.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.audioCtx = wx.createAudioContext('myAudio');
  },

  onShow: function() {
    this.getOneMusic()
  },

  getOneMusic: function() {
    var that = this
    app.ajax.post('/music/getOne', {}, function(res) {
      that.setData({
        music: res.data
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  audioPlay() {
    this.audioCtx.play()
  },
  audioPause() {
    this.audioCtx.pause()
  },
  audio14() {
    this.audioCtx.seek(14)
  },
  audioStart() {
    this.audioCtx.seek(0)
  }
})