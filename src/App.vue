<template>
    <div id="app">
    <header>
    <div class='banner'>
        <h1>밤하늘 보호공원</h1>
    </div>
    <nav>
        <ul class='main-manu'>
        <li class='logo'>
            <router-link to="/">
                밤하늘 보호공원
            </router-link>
        </li>
        <li class='submenu'>
            공원소개
            <ul>
            <li>
                <router-link to="/">밤하늘 보호 공원</router-link>
            </li>
            <li>
                <router-link to="/map">오시는 길</router-link>
            </li>
            </ul>
        </li>
        <li class='submenu'>
            계절별 별자리
            <ul>
            <li>
                <router-link to="/star">별자리 알아보기</router-link>
            </li>
            </ul>
        </li>
        <li class='submenu'>
            공원 팬션 예약
            <ul>
            <li>
                <router-link to="/reservation">팬션예약</router-link>
            </li>
            <li>
                <router-link to="/qna">문의사항</router-link>
            </li>
            </ul>
        </li>
        <li class='submenu'>
            회원가입/로그인
            <ul>
            <li><router-link to="/member/signup">회원가입</router-link></li>
            <li><router-link to="/member/login">로그인</router-link></li>
            <li @click="logout"><router-link to="#">로그아웃</router-link></li>
            </ul>
        </li>
        </ul>
    </nav>
    </header>
    <router-view class='article'/>
    <footer>
        <div class="footer">
        <p> © 2020</p>
        </div>
    </footer>
    </div>
</template>

<script>
export default {
  name: "App",
    data() {
        return {
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('member/logout', '')
        }
    }
}
</script>
