<template>
  <carousel :autoplay="true" :nav="false" :items=1>
    <img src='../assets/slide/youngyang1.jpg'>
    <img src='../assets/slide/youngyang2.jpg'>
    <img src='../assets/slide/youngyang3.jpg'>
    <img src='../assets/slide/youngyang4.jpg'>
  </carousel>
</template>

<script>
import carousel from 'vue-owl-carousel'
export default {
  components: { carousel }
}
</script>

<style>

</style>
