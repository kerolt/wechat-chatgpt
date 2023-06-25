const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickname: '',
    theme: wx.getSystemInfoSync().theme,
  },
  onChooseAvatar(e) {
    console.log(e)
    const {
      avatarUrl
    } = e.detail //获取的是头像的路径（可能也有可能是用户在相册选选择的图片）
    this.setData({
      avatarUrl: avatarUrl
    })
  },
  inputNickName(e) {
    console.log(e)
    this.setData({
      nickname: e.detail.value
    })
    console.log(this.data.nickname)
  },

  login(e) {
    wx.setStorageSync(
      "user", {
        "nickname": this.data.nickname,
        "avatarUrl": this.data.avatarUrl
      }
    )
    wx.setStorageSync(
      "isLogin", true
    )
    wx.switchTab({
      url: '/pages/setting/setting'
    })
  }
})