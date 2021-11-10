<template>
  <div>
    <input type="text" v-model="keywordTxt">
    <select v-model="limitNum">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
    </select>
    <button @click="search">search</button>
    <ul>
      <li v-for="item in viewData" :key="item.ID">
        <h3>{{item.Name}}</h3>
        <p>{{item.DescriptionDetail}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { tdxGet } from '../services/tdxApi'
export default {
  data() {
    return {
      viewData: null,
      limitNum: 5,
      keywordTxt:''
    }
  },
  methods: {
    search(){
      tdxGet(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=contains(Name,'${this.keywordTxt}')&$top=${this.limitNum}&$format=JSON`)
      .then((response) =>{
        this.viewData = {...response.data}
      })
      .catch((error) =>{
        console.log(error);
      });
    }
  },
  mounted(){
    this.search()
  }
}
</script>