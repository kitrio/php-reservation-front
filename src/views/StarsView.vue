<template>
  <div>  
    <section><SlidePicture v-if="slideImage" :imagesprops='slideImage'/>
        <h3>별자리 지도</h3>
        <div class="content">
            밤하늘 보호공원은 인공조명으로 부터 생태계와 문화유산을 지켜내는 것을 목적으로
            <br>국제 밤하늘 보호협회에서 지정하는 공원입니다.
        </div>
    </section>
  </div>
</template>

<script>
import SlidePicture from '@/components/SlidePicture'
export default {
  name: 'StarsView',
  components: {
    SlidePicture
  },
  data () {
    return {
      slideImage: [
        require('../assets/image/spring.jpg'),
        require('../assets/image/summer.jpg'),
        require('../assets/image/autumn.jpg'),
        require('../assets/image/winter.jpg')
      ]
    }
  }

}
</script>

<style>

</style>
