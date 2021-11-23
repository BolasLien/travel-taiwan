<template>
  <div class="search banner-view">

    <div class="container">
    <router-link to="/about">About</router-link>
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <h1 class="display-1 d-none d-lg-block">景點</h1>
          <div class="row">
            <div class="col-lg-6">
              <nav class="nav nav-pills">
                <a class="flex-fill text-sm-center nav-link active" href="#">景點</a>
                <a class="flex-fill text-sm-center nav-link" href="#">餐飲</a>
                <a class="flex-fill text-sm-center nav-link" href="#">旅宿</a>
                <a class="flex-fill text-sm-center nav-link" href="#">活動</a>
              </nav>
            </div>
          </div>
          <div class="row sticky-top">
            <div class="col-md-6">
              <div class="dropdown">
                <button
                  class="btn btn-light dropdown-toggle d-block w-100 text-start"
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{city.zh}}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <li v-for="(city, index) in cityList" :key="index"><button class="dropdown-item" type="button" @click="clickCity(city)">{{city.zh}}</button></li>
                </ul>
              </div>
            </div>
            <div class="col-md-6">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="輸入景點名稱"
                  aria-label="輸入景點名稱"
                  aria-describedby="button-addon2"
                />
                <button class="btn btn-secondary d-none d-md-block" type="button" id="button-addon2" @click="search">搜尋</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="search-result">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="row align-items-center">
            <div class="col-4">
              <h5 class="search-result-title mb-0">搜尋結果</h5>
            </div>
            <div class="col-4 ms-auto d-flex justify-content-end align-items-center">
              <h6 class="sort-title mb-0 text-secondary">排序</h6>
              <div class="dropdown ms-3">
                <button
                  class="btn btn-light dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  最新
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <li><button class="dropdown-item" type="button">Action</button></li>
                  <li><button class="dropdown-item" type="button">Another action</button></li>
                  <li><button class="dropdown-item" type="button">Something else here</button></li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-lg-4 g-4">
        <div class="col" v-for="(item, index) in showData" :key="index">
          <div class="card">
            <div class="row g-0 flex-lg-column">
              <div class="col-5 col-lg-12">
                <img :src="item.imgUrl" class="card-img-top object-fit-cover" :alt="item.imgAlt" />
              </div>
              <div class="col-7 col-lg-12">
                <div class="card-body">
                  <h6 class="card-title">{{ item.title }}</h6>
                  <a class="card-text" href="#">{{ item.city }}</a>
                  <div class="row g-1">
                    <div class="col-auto" v-for="(tag, index) in item.tags" :key="index">
                      <span class="badge bg-secondary">{{ tag }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <img :src="item.imgUrl" class="card-img-top object-fit-cover" :alt="item.imgAlt" />
            <div class="card-body">
              <h6 class="card-title">{{ item.title }}</h6>
              <a class="card-text" href="#">{{ item.city }}</a>
              <div class="row g-1">
                <div class="col-auto" v-for="(tag, index) in item.tags" :key="index">
                  <span class="badge bg-secondary">{{ tag }}</span>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <nav>
            <ul class="pagination justify-content-center pagination-lg">
              <li class="page-item">
                <a class="page-link" href="#">
                  <span>&laquo;</span>
                </a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">4</a></li>
              <li class="page-item"><a class="page-link" href="#">5</a></li>
              <li class="page-item">
                <a class="page-link" href="#">
                  <span>&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import {tdxGet} from '../services/tdxApi'
import noImg from '../assets/Where-is-image.svg'

let allData = ref([])
let data = []
let cityList = [
  {zh: '臺北市', en: 'Taipei'},
  {zh: '新北市', en: 'NewTaipei'},
  {zh: '桃園市', en: 'Taoyuan'},
  {zh: '臺中市', en: 'Taichung'},
  {zh: '臺南市', en: 'Tainan'},
  {zh: '高雄市', en: 'Kaohsiung'},
  {zh: '基隆市', en: 'Keelung'},
  {zh: '新竹市', en: 'Hsinchu'},
  {zh: '新竹縣', en: 'HsinchuCounty'},
  {zh: '苗栗縣', en: 'MiaoliCounty'},
  {zh: '彰化縣', en: 'ChanghuaCounty'},
  {zh: '南投縣', en: 'NantouCounty'},
  {zh: '雲林縣', en: 'YunlinCounty'},
  {zh: '嘉義縣', en: 'ChiayiCounty'},
  {zh: '嘉義市', en: 'Chiayi'},
  {zh: '屏東縣', en: 'PingtungCounty'},
  {zh: '宜蘭縣', en: 'YilanCounty'},
  {zh: '花蓮縣', en: 'HualienCounty'},
  {zh: '臺東縣', en: 'TaitungCounty'},
  {zh: '金門縣', en: 'KinmenCounty'},
  {zh: '澎湖縣', en: 'PenghuCounty'},
  {zh: '連江縣', en: 'LienchiangCounty'},
]

// let limitNum = 16
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
let city = ref('')

const clickCity = (cityObj)=>{
  city.value = cityObj
  console.log(city.value);
}

const showData = computed(() => {
  let showList = []

  if (allData.value.length) {
    for (let i = 0; i < 16; i++) {
      showList.push(allData.value[i])
    }
  }

  return showList
})

const search = () => {
  //取得指定[縣市]觀光景點資料
  // https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$format=JSON
  let url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city.value.en}?$format=JSON`
  tdxGet(url)
    .then(response => {
      data = [...response.data]
      allData.value = data.map(item => {
        if (Object.keys(item.Picture).length === 0) {
          item.Picture.PictureUrl1 = noImg
          item.Picture.PictureDescription1 = '圖片不存在'
        }

        let tags = [item.Class1, item.Class2, item.Class3]
        tags = tags.filter(item => item !== undefined)

        return {
          title: item.Name,
          city: item.City,
          imgUrl: item.Picture.PictureUrl1,
          imgAlt: item.Picture.PictureDescription1,
          tags: tags,
        }
      })
    })
    .catch(error => {
      console.log(error)
    })
}

onMounted(() => {
  city.value = {zh: '臺北市', en: 'Taipei'}
  search()
})
</script>
