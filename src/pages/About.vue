<template>
  <Header />
  <div class="intro-top view-background">
    <div class="container d-none d-md-block">
      <router-link to="/">Home</router-link>
      <div class="row">
        <div class="col">
          <h1 class="display-1 d-none d-md-block">景點</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-main">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="../assets/Where-is-image.svg" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="../assets/Where-is-image.svg" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="../assets/Where-is-image.svg" class="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="col-lg-6 bg-light">
          <div class="row flex-column">
            <div class="col">
              <h4>大稻埕碼頭_大稻埕碼頭貨櫃市集</h4>
            </div>
            <div class="col">
              <h5>臺北市</h5>
            </div>
            <div class="col">
              <h5>標籤</h5>
              <p><span class="badge bg-secondary">遊憩類</span><span class="badge bg-secondary">非古蹟</span></p>
            </div>
            <div class="col">
              <h5>開放時間</h5>
              <p>
                平常日以團體預約包船為主，例假日行駛固定航次，請洽詢各船公司。強烈季風、漲退
                潮水位差影響航行及靠泊安全，當日實際航班得由現場公告或網站預告調整。
              </p>
            </div>
            <div class="col">
              <h5>簡介</h5>
              <p>
                大稻埕原是平埔族的居住地，因萬華（艋舺）同安人發生激烈的械鬥，造成族人移至
                大稻埕定居，開始大稻埕淡水河旁商店和房屋的興建，淡水港開放後，大稻埕在劉銘
                傳的治理下成為臺北城最繁華的物資集散中心，當中以茶葉、布料為主要貿易交易，當
                時的延平北路及貴德街一帶便是商業活動的重心，也讓大稻埕早年的歷史多采多姿、令 人回味。
              </p>
            </div>
            <div class="col">
              <a href="#" class="btn btn-outline-danger">886-2-27208889</a>
              <a href="#" class="btn btn-danger">官方網站</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col">
          <h5 class="mb-0">你可能會喜歡</h5>
        </div>
      </div>
      <div class="row g-2 row-cols-1 row-cols-md-2 row-cols-lg-4">
        <div class="col" v-for="(item, index) in showData" :key="index">
          <div class="card">
            <div class="row g-0">
              <div class="col-12">
                <img :src="item.imgUrl" class="card-img-top object-fit-cover" :alt="item.imgAlt" />
              </div>
              <div class="col-12">
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
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>


<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
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
    for (let i = 0; i < 4; i++) {
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
