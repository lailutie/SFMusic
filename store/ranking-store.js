import { HYEventStore } from 'hy-event-store'

import { getRankings } from '../service/api_music'

const rankingStore = new HYEventStore({
  state: {
    newRanking: {}, // 0: 新歌
    hotRanking: {}, // 1: 热门
    originRanking: {}, // 2: 原创
    upRanking: {} // 3: 飙升
  },
  actions: {
    getRankingDataAction(ctx) {
      for (let i = 0; i < 4; i++) {
        getRankings(i).then(res => {
          switch(i) {
            case 0:
              ctx.newRanking = res.playlist
              break;
            case 1:
              ctx.hotRanking = res.playlist
              break;
            case 2:
              ctx.originRanking = res.playlist
              break;
            case 3:
              ctx.upRanking = res.playlist
              break;
          }
        })
      }
    }
  }
})

export {
  rankingStore
}
