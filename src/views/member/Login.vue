<template>
  <v-app id="login">
    <section>
      <v-text-field
        v-model="memberid"
        class="text-field"
        label="ID"
        :rules="[rules.requiredID,rules.max]"
        counter
      />
      <v-text-field
        v-model="passwd"
        class="text-field"
        :rules="[rules.required, rules.min]"
        :append-icon="showpasswd ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showpasswd ? 'text' : 'password'"
        label="비밀번호"
        counter
        @click:append="showpasswd = !showpasswd"
      />
      <div
        class="login-button"
      >
        <v-btn
          @click="login"
        >
          로그인
        </v-btn>
      </div>
    </section>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      memberid: '',
      passwd: '',
      showpasswd: false,
      rules: {
        requiredID: value => !!value || '아이디를 입력 해주세요',
        required: value => !!value || '비밀번호를 입력 해주세요',
        min: v => v.length >= 8 || '최소 8자 이상 입력 하세요',
        max: v => v.length <= 15 || '15자리 이하로 입력 해주세요'
      }
    }
  },
  methods: {
    login () {
      axios.post('/api/member/login', {
        memberid: this.memberid,
        passwd: this.passwd
      })
      .then(response => {
        if (response.status === 200) {
          this.$store.dispatch('member/login', this.memberid )
          alert('로그인되었습니다.')
          this.$router.push('/')
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          alert('아이디 또는 비밀번호가 맞지 않습니다.')
        }
      })
    }
  }
}
</script>

<style scoped>
  .text-field {
    width: 80%;
    height: 5em;
    margin: 0 auto;
  }
  .login-button {
    display: flex;
    justify-content: center;
  }
</style>
