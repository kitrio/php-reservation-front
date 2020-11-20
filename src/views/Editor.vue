<template>
  <v-app id="editor">
    <section>
    <v-container>
      <v-card-title>
        문의사항
      </v-card-title>
      <v-card-text> {{ checkModify.writer }} 님 </v-card-text>
      <v-text-field
        v-model="title"
        label="제목"
      />
      <v-textarea
        v-model="textContent"
        label="내용"
      /><v-layout
        row
        wrap
      >
        <p>
          <v-card-actions>
            <v-btn
              v-if="!checkModify"
              color="white"
              @click="submitContent"
            >
              <v-icon>mdi-plus</v-icon>
              올리기
            </v-btn>
            <v-btn
              v-else
              color="orange"
              @click="submitUpdate"
            >
              수정완료
            </v-btn>
          </v-card-actions>
        </p>
      </v-layout>
      <p />
    </v-container>
    </section>
  </v-app>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      idx: '',
      title: '',
      textContent: '',
      writer: '',
      rules: {
        required: value => !!value || '글을 입력해주세요!'
      },
      isSubmitSucees: false
    }
  },
  computed: {
    ...mapGetters({
      contents: (['contents/getContent']),
    }),
    checkModify () {
      return (this.contents != null) ? this.contents : false
    }
  },
  mounted () {
    this.getModifyContent()
  },
  methods: {
    submitContent () {
      axios.post('/api/qna/content',{
        title: this.title,
        content: this.textContent,
      }).then(() => {
        this.isSubmitSucees = true
        this.$router.push('/')
      })
        .catch(() => {
          alert('게시글 등록이 실패했습니다. 다시 시도해주세요')
        })
    },
    getModifyContent () {
      this.idx = this.checkModify.idx
      this.title = this.checkModify.title
      this.writer = this.checkModify.writer
      this.textContent = this.checkModify.content
    },
    submitUpdate () {
      axios.put("/api/qna/content",{
        idx: this.idx,
        title: this.title,
        content: this.textContent
      })
      .then(() => {
        this.isSubmitSucees = true
        this.$router.push('/')
        this.initDefault()

      })
      .catch((error) => {
        alert('게시글 수정이 안되었습니다. 다시 시도해주세요.')
        if(error.response.staus === 405){
          alert('로그인 되어있지 않습니다.')
        }
      })
    },
    initDefault () {
      this.$store.dispatch('contents/contentAction', null)
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.isSubmitSucees === false) {
      const isLeave = confirm('작성 중인 글이 있습니다. 나가시겠습니까?')
      if (isLeave) {
        this.initDefault()
        next()
      } else {
        next(false)
      }
    } else {
      this.initDefault()
      next()
    }
  }
}
</script>

<style>

</style>
