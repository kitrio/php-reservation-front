<template>
    <div id="qnaview">
        <section>
            <h3 class="title">문의사항</h3>
            <div class="content">
            </div>
            <div class="content">
                <table>
                <thead>
                    <th></th>
                    <th class="title-th">제목</th>
                    <th class="row">작성자</th>
                    <th class="row">조회</th>
                    <th class="row">날짜</th>
                </thead>
                <tbody>
                    <tr v-for="(content,index) in contents" :key="index">
                    <td class="idx">{{content.idx}}</td>
                    
                        <router-link :to="{ name: 'Content', params: { num: content.idx}}">
                        <td class="title">
                        <p>{{content.title}}</p>
                        </td>
                        </router-link>
                    
                    <td class="row">{{content.writer}}</td>
                    <td class="row">{{content.count}}</td>
                    <td class="row">{{content.date}}</td>
                    </tr>
                </tbody>
                </table>

                <div class="btn-box">
                    <div></div>
                    <button class="btn-writer"> 글쓰기</button>
                </div>
            </div>
            
        </section>
    </div>
</template>

<script>


export default {
    name: "QnaView",
    data() {
        return {
            contents: null,
            offset: 0
        }
    },
    mounted() {
        this.getContents()
    },
    methods: {
        getContents() {
            axios.get("/api/qna/contents",{
                offset: this.offset
                })
                .then(response =>{
                    this.contents = response.data
                })
                .catch(error =>{
                    if (error.response.status === 404) {
                        alert('페이지를 찾을수 없습니다.')
                    }
            })
        }
    }
}
</script>

<style>
  #qnaview {
    display: flex;
    flex-direction: column;
  }
  .content {
    display: flex;
    flex-direction: column;
  }
  /* table */
  table {
    max-width: 800px;
    width: 100%;
    text-align: center;
    border-spacing: 0px;
    border-collapse: collapse;
  }
  .row {
    display: table-cell;
    width: 6em;
    padding: 0px;
  }

  .idx {
      width: 20px;
  }

  .title-th {
    display: table-cell;
    width: 20em;
  }
  .title {
    display: table-cell;
    width: 20em;
    color: black;
    text-align: left;
    padding-left: 10px;
  }

  th {
    font-family: 'monospace';
    color:dimgrey;
    height: 20px;
  }

  tr, td {
      border-bottom: 1px solid #ccc;
      line-height: 1.2;
      padding: 8px 0;
  }

  .btn-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 10px;
  }
  .btn-writer {
    background: rgb(77, 77, 77);
    padding: 10px;
    border-radius: 1em;
    color: rgb(252, 252, 252);
  }
</style>
