<template>
  <div
    ref='popup'
    class='popup'>
    <div>
      <input type=button 
        class='popup-close'
        value='x'
        @click='closePopup'/>
      <div>공지사항</div>
      <br>
        <p>
          {{ value }}
        </p>
    </div>
    <button class="closebar">오늘 하루 그만 보기</button>
  </div>
</template>

<script>
export default {
  name: 'PopupAlert',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    closePopup () {
      this.$refs.popup.parentNode.removeChild(this.$refs.popup);
    }
  }
}
</script>

<style>
  .popup {
    background-color: #e1ece2;
    display: flex;
    flex-direction: column;
    font-size: 1.4em;
    position: absolute;
    width: 480px;
    height: 400px;
    z-index: 1000;
  }

  .popup-close {
    margin-top: 10px;
    margin-right: 0px;
    margin-left: 90%;
    width: 30px;
    height: 30px;
    background-color:white;
    border-radius: 15px;
    border-style: none;
  }
  
  .closebar {
    background-color: black;
    bottom: 0;
    color: white;
    position: absolute;
    width: 100%;
    font-size: 15px;
    padding: 10px;
  }
</style>
