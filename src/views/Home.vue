<template>
    <div id="home">
        <PopupAlert v-if="popupCheck" :value='popupSubject' />
        <SlidePicture v-if="slideImage" :imagesprops='slideImage'/>
        <h2 class="title">대한민국에서 가장 아름다운 밤하늘</h2>
        <section>
        <h3>밤하늘 보호공원이란?</h3>
        <div class="content">
            밤하늘 보호공원은 인공조명으로 부터 생태계와 문화유산을 지켜내는 것을 목적으로
            <br>국제 밤하늘 보호협회에서 지정하는 공원입니다.
        </div>
        <div class="content">영양군 반딧불이 생태공원은 아시아 최초로 국제밤하늘공원으로 지정되었습니다.</div>
        </section>
    </div>
</template>

<script>
import SlidePicture from '@/components/SlidePicture'
import PopupAlert from '@/components/PopupAlert'
export default {
  name: 'Home',
  components: {
    SlidePicture,
    PopupAlert
  },
  data () {
    return {
      popupCheck: true,
      popupSubject: '이 사이트는 실제 공원의 홈페이지가 아닙니다!.',
      slideImage: [
        require('../assets/slide/youngyang1.jpg'),
        require('../assets/slide/youngyang2.jpg'),
        require('../assets/slide/youngyang3.jpg'),
        require('../assets/slide/youngyang4.jpg')
      ]
    }
  },
  beforeMount() {
    this.checkPopupOpen()
  },
  methods: {
    checkPopupOpen () {
      let cookieList = document.cookie.split(";")
      for(let idx in cookieList) {
        let cookie = cookieList[idx].split("=")
        if(cookie[0] === 'popup' && cookie[1] === 'false') {
            this.popupCheck = false
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>

</style>
