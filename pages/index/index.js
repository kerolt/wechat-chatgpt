const app = getApp()
Page({
  data: {
    is_check: 1,
    lists: [{
      user: 'ChatGPT',
      message: ['你好！很高兴为你服务！']
    }],
    message: '',
    scrollTop: 0,
    isDisable: true,
    loginStat: false,
    copyTexts: []
  },
  
  onLoad(options) {

  },
  onShow() {

  },

  checkLogin() {
    wx.getStorage({
      key: "isLogin",
      success: (res) => {
        this.setData({
          loginStat: res.data
        })
      },
      fail: (err) => {
          wx.showToast({
            title: '请先登录',
            icon: 'error',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }, 1200)
      }
    })
  },

  sendText() {
    const msg = this.data.message.trim()
    this.checkLogin()
    if (!msg) {
      wx.showToast({
        title: '请输入内容哦',
        icon: 'error',
        duration: 1100
      })
      return
    }

    if (!this.data.loginStat) {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        duration: 2000
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1200)
      return
    }

    this.inputUserMessage(msg)

    wx.request({
      url: 'XXX',
      method: 'POST',
      data: {
        "role": "user",
        "content": msg
      },
      success: (res) => {
        const data = res.data
        const recvData = res.data.choices
        if (recvData == null) {
          this.showMessage('出错啦！请重新输入一下吧~')
          return
        }
        const recvMsg = recvData[0].message.content
        this.showMessage(recvMsg)
      }
    })
  },

  copyText(e) {
    console.log(e)
    const text = e.currentTarget.dataset.text
    this.setData({
      copyTexts: text
    })
    wx.setClipboardData({
      data: this.data.copyTexts.join('\n'),
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },

  inputUserMessage(msg) {
    this.data.lists.push({
      user: '你',
      message: [msg]
    })
    this.data.lists.push({
      user: 'ChatGPT',
      message: ['正在思考ing...']
    })
    this.setData({
      message: '',
      isDisable: true,
      lists: this.data.lists
    })
    this.scrollToBottom()
  },

  showMessage(msg) {
    this.data.lists = this.data.lists.slice(0, -1)
    this.data.lists.push({
      user: 'ChatGPT',
      message: [msg]
    })
    this.setData({
      lists: this.data.lists
    })
    this.scrollToBottom()
  },

  scrollToBottom() {
    setTimeout(() => {
      let query = wx.createSelectorQuery().in(this)
      query.select('.list').boundingClientRect(res => {
        this.setData({
          scrollTop: res.height
        })
      })
      query.exec(res => {})
    }, 100)
  },

  onTextAreaChange(e) {
    const text = e.detail.value
    if (text !== '') {
      this.setData({
        isDisable: false
      })
      
    } else {
      this.setData({
        isDisable: true
      })
    }
  }

})