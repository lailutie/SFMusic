import sfRequest from './index'

export function getSongDetail(ids) {
  return sfRequest.get("/song/detail", {
    ids
  })
}

