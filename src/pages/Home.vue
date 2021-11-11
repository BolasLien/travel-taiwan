<template>
  <section class="search-group container">
    <!-- <div class="row mb-5"></div> -->
    <div class="row pt-5 mb-2">
      <h1 class="">景點</h1>
    </div>
      <ul class="nav nav-pills row mb-3">
        <li class="nav-item col-sm-1">
          <a class="nav-link active" aria-current="page" href="#">景點</a>
        </li>
        <li class="nav-item col-sm-1">
          <a class="nav-link" href="#">餐飲</a>
        </li>
        <li class="nav-item col-sm-1">
          <a class="nav-link" href="#">旅宿</a>
        </li>
        <li class="nav-item col-sm-1">
          <a class="nav-link">活動</a>
        </li>
      </ul>
    <form class="row gx-3 gy-2 align-items-center pb-3">
      <div class="col-sm-3">
        <label class="visually-hidden" for="specificSizeSelect">選擇地區</label>
        <select class="form-select" id="specificSizeSelect">
          <option selected>選擇地區</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="col-sm-3">
        <label class="visually-hidden" for="specificSizeInputName">請輸入景點名稱</label>
        <input type="text" class="form-control" id="specificSizeInputName" placeholder="請輸入景點名稱" />
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </section>
  <section class="container">
    <div class="row justify-content-between">
      <div class="col-auto">
        <h3>搜尋結果</h3>
      </div>
      <div class="col-auto d-flex">
        <h4>排序</h4>
        <select name="" id="">
          <option value="最新">最新</option>
        </select>
      </div>
    </div>
    <ul class="row">
      <li class="col-sm-3" v-for="(item, index) in todolist" :key="index">
        <div class="card" style="width: 18rem">
          <img src="https://picsum.photos/300/200" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
            <div class="tag">
              <span class="badge bg-secondary">New</span>&nbsp; <span class="badge bg-secondary">New</span>&nbsp;
              <span class="badge bg-secondary">New</span>&nbsp; <span class="badge bg-secondary">New</span>&nbsp;
              <span class="badge bg-secondary">New</span>&nbsp;
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="row">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link">Previous</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script setup>
import TdxTest from '../components/TdxTest.vue'
const todolist = [
  {num: '1', title: '3534'},
  {num: '1', title: '3534'},
  {num: '1', title: '3534'},
  {num: '1', title: '3534'},
  {num: '1', title: '3534'},
  {num: '1', title: '3534'},
  {num: '1', title: '3534'},
  {num: '1', title: '3534'},
]
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: 'Noto Sans TC', 'Microsoft JhengHei', sans-serif;
}
.search-group {
  background: url('../assets/景點banner.png') center;
}
</style>
