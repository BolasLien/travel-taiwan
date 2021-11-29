<template>
<Header />
  <div class="search" :class="bannerClass">
    <div class="container">
    <router-link :to="`/${route.name}/1`">About</router-link>
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <h1 class="display-1 d-none d-lg-block main-page-title">{{route.name}}</h1>
          <div class="row mb-3">
            <div class="col-lg-6">
              <nav class="nav nav-pills">
                <router-link class="flex-fill text-sm-center nav-link mx-2" :class="{active: route.name === 'ScenicSpot'}" to="/ScenicSpot">景點</router-link>
                <router-link class="flex-fill text-sm-center nav-link mx-2" :class="{active: route.name === 'Restaurant'}" to="/Restaurant">餐飲</router-link>
                <router-link class="flex-fill text-sm-center nav-link mx-2" :class="{active: route.name === 'Hotel'}" to="/Hotel">旅宿</router-link>
                <router-link class="flex-fill text-sm-center nav-link mx-2" :class="{active: route.name === 'Activity'}" to="/Activity">活動</router-link>
<!--                 <a class="flex-fill text-sm-center nav-link mx-2 active" href="#">景點</a>
                <a class="flex-fill text-sm-center nav-link mx-2" href="#">餐飲</a>
                <a class="flex-fill text-sm-center nav-link mx-2" href="#">旅宿</a>
                <a class="flex-fill text-sm-center nav-link mx-2" href="#">活動</a> -->
              </nav>
            </div>
          </div>
          <div class="row mb-4">
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
  <div class="search-result bg-main py-5">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="row mb-3 align-items-center">
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
      <div class="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-4">
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
          </div>
        </div>
      </div>
      <div class="row mt-5">
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
  <Footer />
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import {ref, computed, onMounted} from 'vue'
import {tdxGet} from '../services/tdxApi'
import noImg from '../assets/Where-is-image.svg'
import {cityList} from '../services/cityList'
let allData = ref([])
let data = []

let route = useRoute()
let router = useRouter()

const bannerClass = computed(()=>{
  let className = 'scenic-banner'
  switch(route.name){
    default:
    case 'ScenicSpot':
      className = 'scenic-banner'
      break;
    case 'Restaurant':
      className = 'restaurant-banner'
      break;
    case 'Hotel':
      className = 'hotel-banner'
      break;
    case 'Activity':
      className = 'activity-banner'
      break;
  }

  return className
})

// let limitNum = 16

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
  let url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${route.name}/${city.value.en}?$format=JSON`
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
  city.value = cityList[0]
  search()

})
router.afterEach((to, from) => {
  search()
})

</script>
