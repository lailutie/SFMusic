// pages/home-video/index.js
import { getTopMV } from '../../service/api_video'

Page({
  data: {
    topMVs: []
  },

  onLoad(options) {
    this.getTopMVData(0)
  },

  // get topMVs data function
  async getTopMVData(offset) {
    const res = await getTopMV(offset)
    this.setData({
      topMVs: this.data.topMVs.concat(res.data)
    })
  },

  // video item click
  handleVideoItemClick(event) {
    const id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${id}`
    })
  },

  onPullDownRefresh() {
    this.getTopMVData(0)
    wx.stopPullDownRefresh()
  },

  async onReachBottom() {
    if (this.data.topMVs.length < 50) {
      this.getTopMVData(this.data.topMVs.length)
    } else {
      console.log("just demo, no more data")
    }
  },
})