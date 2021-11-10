import axios from 'axios'
import jsSHA from 'jssha'

function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  let AppID = import.meta.env.VITE_APP_ID
  let AppKey = import.meta.env.VITE_APP_KEY
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString()
  let ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  let HMAC = ShaObj.getHMAC('B64')
  let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"'
  return {Authorization: Authorization, 'X-Date': GMTString}
}

function tdxGet(url){
  return axios.get(url,{
    headers:getAuthorizationHeader()
  })
}

export {
  tdxGet,
}