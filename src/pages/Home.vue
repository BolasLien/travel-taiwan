<template>
  <section class="search-group container-fluid">
    <div class="container">
      <div class="row mb-2">
        <h1 class="title">景點</h1>
      </div>
      <ul class="nav row mb-3">
        <li class="nav-item col-auto">
          <a class="nav-link active" aria-current="page" href="#">景點 🎆</a>
        </li>
        <li class="nav-item col-auto">
          <a class="nav-link" href="#">餐飲 🍕</a>
        </li>
        <li class="nav-item col-auto">
          <a class="nav-link" href="#">旅宿 🏠</a>
        </li>
        <li class="nav-item col-auto">
          <a class="nav-link" href="#">活動 🎈</a>
        </li>
      </ul>
      <form class="row gx-3 gy-2 align-items-center pb-4">
        <div class="col-sm-6">
          <label class="visually-hidden" for="specificSizeSelect">選擇地區</label>
          <select class="form-select" id="specificSizeSelect">
            <option selected>選擇地區</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="col-sm-4">
          <label class="visually-hidden" for="specificSizeInputName">請輸入景點名稱</label>
          <input type="text" class="form-control" id="specificSizeInputName" placeholder="請輸入景點名稱" />
        </div>
        <div class="col-sm-2">
          <button type="submit" class="btn btn-primary btn-search">搜尋</button>
        </div>
      </form>
    </div>
  </section>
  <section class="search-result container">
    <div class="row justify-content-between align-items-center px-4 py-3 search-result-title">
      <div class="col-auto">
        <h4>搜尋結果</h4>
      </div>
      <div class="col-auto d-flex align-items-center">
        <p>排序</p>
        <select name="" id="">
          <option value="最新">最新</option>
        </select>
      </div>
    </div>
    <ul class="row px-4">
      <li class="col-sm-3 mb-4" v-for="(item, index) in showList" :key="index">
        <div class="card m-auto" style="">
          <img :src="item.imgUrl" class="card-img-top" :alt="item.imgAlt" />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">{{ item.city }}</p>
            <div class="tag">
              <h5>
                <span class="badge" v-for="(tag, index) in item.tags" :key="index">{{ tag }}</span>
              </h5>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="row mb-5">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link">＜</a>
          </li>
          <li class="page-item active"><a class="page-link page-num" href="#">1</a></li>
          <li class="page-item"><a class="page-link page-num" href="#">2</a></li>
          <li class="page-item"><a class="page-link page-num" href="#">3</a></li>
          <li class="page-item"><a class="page-link page-num" href="#">4</a></li>
          <li class="page-item"><a class="page-link page-num" href="#">5</a></li>
          <li class="page-item">
            <a class="page-link" href="#">＞</a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script setup>
import {ref} from 'vue'
import {tdxGet} from '../services/tdxApi'
import TdxTest from '../components/TdxTest.vue'
import noImg from '../assets/Where-is-image.svg'
let showList = ref([])
let data = []
let limitNum = 16
// 臺北市:Taipei
// 新北市:NewTaipei
// 桃園市:Taoyuan
// 臺中市:Taichung
// 臺南市:Tainan
// 高雄市:Kaohsiung
// 基隆市:Keelung
// 新竹市:Hsinchu
// 新竹縣:HsinchuCounty
// 苗栗縣:MiaoliCounty
// 彰化縣:ChanghuaCounty
// 南投縣:NantouCounty
// 雲林縣:YunlinCounty
// 嘉義縣:ChiayiCounty
// 嘉義市:Chiayi
// 屏東縣:PingtungCounty
// 宜蘭縣:YilanCounty
// 花蓮縣:HualienCounty
// 臺東縣:TaitungCounty
// 金門縣:KinmenCounty
// 澎湖縣:PenghuCounty
// 連江縣:LienchiangCounty
let city = 'Taipei'

//取得指定[縣市]觀光景點資料
let url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}?$top=${limitNum}&$format=JSON`
tdxGet(url)
  .then(response => {
    data = [...response.data]
    showList.value = data.map(item => {
      if (Object.keys(item.Picture).length === 0) {
        item.Picture.PictureUrl1 = noImg
        item.Picture.PictureDescription1 = '圖片不存在'
      }

      return {
        title: item.Name,
        city: item.City,
        imgUrl: item.Picture.PictureUrl1,
        imgAlt: item.Picture.PictureDescription1,
        tags: [item.Class1, item.Class2, item.Class3],
      }
    })
  })
  .catch(error => {
    console.log(error)
  })

// const showList = [
//   {
//     title: '大佳公園',
//     location: '台北市',
//     imgUrl: 'https://picsum.photos/id/12/300/200',
//     tags: ['遊憩類', '都會公園類'],
//   },
//   {
//     title: '大佳公園',
//     location: '台北市',
//     imgUrl: 'https://picsum.photos/id/1002/300/200',
//     tags: ['遊憩類', '都會公園類'],
//   },
//   {
//     title: '大佳公園',
//     location: '台北市',
//     imgUrl: 'https://picsum.photos/id/512/300/200',
//     tags: ['遊憩類', '都會公園類'],
//   },
//   {
//     title: '大佳公園',
//     location: '台北市',
//     imgUrl: 'https://picsum.photos/id/254/300/200',
//     tags: ['遊憩類', '都會公園類'],
//   },
//   {
//     title: '大佳公園',
//     location: '台北市',
//     imgUrl: 'https://picsum.photos/id/215/300/200',
//     tags: ['遊憩類', '都會公園類'],
//   },
//   {
//     title: '大佳公園',
//     location: '台北市',
//     imgUrl: 'https://picsum.photos/id/64/300/200',
//     tags: ['遊憩類', '都會公園類'],
//   },
//   {
//     title: '大佳公園',
//     location: '台北市',
//     imgUrl: 'https://picsum.photos/id/72/300/200',
//     tags: ['遊憩類', '都會公園類'],
//   },
// ]
</script>
