<template>
  <v-app id="signup">
    <section>
      <v-text-field
        v-model="idField"
        class="textField"
        autofocus
        label="아이디"
        required
      />
      <v-text-field
        v-model="passwordField"
        class="textField"
        :rules="[rules.passwd, rules.min]"
        :type="showpasswd ? 'text' : 'password'"
        label="비밀번호"
        counter
        @click:append="showpasswd = !showpasswd"
      />
      <v-text-field
        v-model="nameField"
        class="textField"
        label="성함"
        required
      />

      <v-text-field
        v-model="phoneNumberField"
        class="textField"
        label="휴대폰 번호"
        :rules="[rules.phoneNumberRules,rules.tel]"
        required
      />
      <v-card-actions
        class="justify-center"
      >
        <v-btn
          color="success"
          class="mr-4"
          @click="onSubmitSignUp"
        >
          가입하기
        </v-btn>
      </v-card-actions>
    </section>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      showpasswd: false,
      idField: "",
      passwordField: "",
      nameField: "",
      phoneNumberField: "",
      rules: {
        passwd: (v) => !!v || "비밀번호를 입력해주세요",
        min: (v) => v.length >= 8 || "최소 8자 이상 입력하세요",
        tel: (v) => v.length <= 11 || "전화번호는 11자리입니다",
        phoneNumberRules: (v) => {
          if(isNaN(parseInt(v))){
            return "숫자만 입력해주세요"
          } else {
            return true
          }
        }
      }
    };
  },
  methods: {
    onSubmitSignUp() {
      axios.post("/api/member/signup",{
          memberid: this.idField,
          passwd: this.passwordField,
          name: this.nameField,
          phoneNumber: this.phoneNumberField
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            alert("회원가입 되었습니다.");
            this.$router.push("/");
            
          }
        })
        .catch(error => {
          console.log(error);
          if (error.response.status === 409) {
            alert("아이디가 중복되었습니다.");
          }
        });
    },
  }
};
</script>

<style scoped>

.textField {
  width: 80%;
  height: 5em;
  margin: 0 auto;
}
</style>
