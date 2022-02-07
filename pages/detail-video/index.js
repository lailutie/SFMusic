// pages/detail-video/index.js
import { getMVURL, getMVDetail, getRelatedVideo } from "../../service/api_video"

Page({
  data: {
    MVURL: {},
    MVDetail: {},
    RelatedVideo: []
  },

  onLoad: function (options) {
    const id = options.id
    this.getPageInfo(id)
  },

  // all network requests
  getPageInfo(id) {
    getMVURL(id).then(res => {
      this.setData({ MVURL: res.data })
    })
    getMVDetail(id).then(res => {
      this.setData({ MVDetail: res.data })
    })
    getRelatedVideo(id).then(res => {
      this.setData({ RelatedVideo: res.data })
    })
  }
})