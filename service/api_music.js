import sfRequest from './index'

export function getBanners() {
  return sfRequest.get("/banner", {
    type: 2
  })
}

export function getRankings(idx) {
  return sfRequest.get("/top/list", {
    idx
  })
}

// cat -> category 类别
export function getSongMenu(cat="全部", limit=6, offset=0) {
  return sfRequest.get("/top/playlist", {
    cat,
    limit,
    offset
  })
}

export function getSongMenuDetail(id) {
  return sfRequest.get("/playlist/detail/dynamic", {
    id
  })
}
