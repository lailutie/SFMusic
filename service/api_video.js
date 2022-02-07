import sfRequest from './index'

export function getTopMV(offset, limit = 10) {
  return sfRequest.get("/top/mv", {
    offset,
    limit
  })
}

export function getMVURL(id) {
  return sfRequest.get("/mv/url", {
    id
  })
}

export function getMVDetail(mvid) {
  return sfRequest.get("/mv/detail", {
    mvid
  })
}

export function getRelatedVideo(id) {
  return sfRequest.get("/related/allvideo", {
    id
  })
}
