import sfRequest from './index'

export function getLyric(id) {
  return sfRequest.get('/lyric', {
    id
  })
}