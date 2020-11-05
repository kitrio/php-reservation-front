<template>
  <carousel :autoplay="true" :nav="false" :items=1>
    <img v-for="img in imagesprops"
    :key='img'
    :src="`${img}`" />
  </carousel>
</template>

<script>
import carousel from 'vue-owl-carousel'
export default {
  name: 'SlidePicture',
  components: { carousel },
  props: {
    imagesprops: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>
