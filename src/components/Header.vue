<template>
  <header class="navbar fixed-top navbar-light navbar-expand-lg" :class="cssSticky">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img :src="imgLogo" alt="" />
      </a>
    </div>
  </header>
</template>

<script setup>
import logo from '../assets/icon_logo.svg'
import logo2 from '../assets/icon_logo_2.svg'
import {onMounted, ref} from 'vue'

let cssSticky = ref('')
let imgLogo = ref(logo)

onMounted(() => {
  window.onscroll = function () {
    checkSticky()
  }

  let navbar = document.querySelector('.navbar')
  let sticky = navbar.offsetTop

  const checkSticky = () => {
    if (window.pageYOffset > sticky) {
      cssSticky.value = 'sticky'
      imgLogo.value = logo2
    } else {
      cssSticky.value = ''
      imgLogo.value = logo
    }
  }
})
</script>
