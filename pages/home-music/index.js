// pages/home-music/index.js
import { rankingStore, playerStore } from '../../store/index'

import { getBanners, getSongMenu } from '../../service/api_music'
import debounce from '../../utils/debounce'

Page({
  data: {
    swiperHeight: 0,
    banners: [],
    recommendSongs: [],
    hotSongMenu: [],
    recommendSongMenu: [],
    upSongs: {},
    newSongs: {},
    originSongs: {}
  },

  onLoad: function (options) {
    getBanners().then(res => {
      this.setData({ banners: res.banners })
    })

    getSongMenu().then(res => {
      this.setData({ hotSongMenu: res.playlists })
    })

    getSongMenu("华语").then(res => {
      this.setData({ recommendSongMenu: res.playlists })
    })

    rankingStore.dispatch("getRankingDataAction")

    // get store data
    rankingStore.onState("hotRanking", (res) => {
      if (!res.tracks) return
      const recommendSongs = res.tracks.slice(0, 6)
      this.setData({ recommendSongs })
    })

    rankingStore.onState("newRanking", (res) => {
      // console.log("newSongs:", res)
      if (!res.tracks) return
      this.setData({ newSongs: res })
    })

    rankingStore.onState("originRanking", (res) => {
      // console.log("originSongs:", res)
      if (!res.tracks) return
      this.setData({ originSongs: res })
    })

    rankingStore.onState("upRanking", (res) => {
      // console.log("upSongs:", res)
      if (!res.tracks) return
      this.setData({ upSongs: res })
    })
  },

  searchItemClick() {
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },

  /**
   * 因为轮播图的默认高度导致下面的小点点可能会在不同的设备上出现偏差
   * 所以这里我们需要拿到展示在设备上的展示的图片的真实高度
   * holdload方法说明在image组件中
   * wx.createSelectorQuery 拿到组件实例在wxml API中
   */
  handleSwiperImageLoaded() {
    const _this = this
    debounce(() => {
      const query = wx.createSelectorQuery()
      query.select('.swiper-image').boundingClientRect()
      query.exec((res) => {
        _this.setData({ swiperHeight: res[0].height })
      })
    }, 1000, false)()
  },

  handleMoreClick: function() {
    this.navigateToDetailSongsPage("hotRanking")
  },
  

  handleRankingItemClick: function(event) {
    console.log(event)
    const rankingName = event.currentTarget.dataset.name
    this.navigateToDetailSongsPage(rankingName)
  },

  handleSongItemClick: function(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playListSongs", this.data.recommendSongs)
    playerStore.setState("playListIndex", index)
  },

  navigateToDetailSongsPage: function(rankingName) {
    wx.navigateTo({
      url: `/pages/detail-songs/index?ranking=${rankingName}&type=rank`,
    })
  }

})