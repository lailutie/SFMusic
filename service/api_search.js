import sfRequest from "./index";

export function getSearchHot() {
  return sfRequest.get("/search/hot")
}

export function getSearchSuggest(keywords) {
  return sfRequest.get("/search/suggest", {
    keywords,
    type: "mobile"
  })
}

export function getSearchResult(keywords) {
  return sfRequest.get("/search", {
    keywords
  })
}
