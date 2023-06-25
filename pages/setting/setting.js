Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    nickname: '你还未登录哦',
    avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    infoList: [
      {
        name: '我的团队',
        img: '/images/setting/团队.png',
        pageurl: '/pages/team/team'
      },
      {
        name: '帮助中心',
        img: '/images/setting/帮助.png',
        pageurl: '/pages/help/help'
      }
    ]
  },

  gotoLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  gotoInfoItem(e) {
    const pagename = e.currentTarget.dataset.pagename;
    wx.navigateTo({
      url: '/pages/' + pagename + '/' + pagename,
    })
  },

  logout(e) {
    wx.clearStorage()
    this.setData({
      isLogin: false,
      nickname: '你还未登录哦',
      avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
    })
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: "user",
      success: (res) => {
        this.setData({
          nickname: res.data.nickname,
          avatar: res.data.avatarUrl
        })
      }
    })
    wx.getStorage({
      key: "isLogin",
      success: (res) => {
        this.setData({
          isLogin: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})