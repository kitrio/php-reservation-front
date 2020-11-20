<template>
    <v-app id="content">
        <section>
            <v-card class="card-container">
                <v-card-title v-text="postOne.title" />
                <v-card-text>
                    {{ postOne.writer }} | {{ postOne.date }}
                </v-card-text>

                <p class="text-content">
                    <v-card-text>
                        {{ postOne.content }}
                    </v-card-text>

                    <v-card-actions
                        v-if="memberinfo === postOne.writer"
                        class="card-action"
                    >
                        <v-btn @click="modifyContent">
                            <v-label>수정</v-label>
                        </v-btn>
                        <v-btn @click="deleteContent">
                            <v-label>삭제</v-label>
                        </v-btn>
                    </v-card-actions>
                </p>
            </v-card>
        </section>
    </v-app>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: "Content",
    data() {
        return {
            postOne: {
                writer: " ",
            },
        }
    },
    computed: {
        ...mapGetters({
            memberinfo: ["member/getMemberId"],
        }),
    },
    mounted() {
        this.content();
    },
    methods: {
        content() {
            axios.get("/api/qna/content", {
                    params: { idx: this.$route.params.num },
                })
                .then((response) => {
                    this.postOne = response.data;
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        alert("해당 게시물이 없습니다.")
                        this.$router.push("/");
                    }
                });
        },
        deleteContent() {
            const isDelete = confirm("정말 삭제하겠습니까?");
            if (isDelete === true) {
                axios.delete( "/api/qna/content/",{
                    idx: this.$route.params.num
                })
                .then((response) => {
                    if (response.status === 200) {
                        alert("삭제 되었습니다.")
                        this.$router.push("/")
                    }
                })
                .catch(() => {
                    alert("삭제 할 수 없습니다.")
                })
            }
        },
        modifyContent() {
            this.$store.dispatch("contents/contentAction", this.postOne)
                .then(() => {
                    this.$router.replace({ name: "Editor" })
                })
        },
    }
}
</script>
<style scoped>
.card-container {
    display: flex;
    flex-direction: column;
}
.text-content {
    font-size: 1em;
    color: black;
    font-family: Arial, Helvetica;
}
.card-action {
    justify-content: center;
}
</style>
