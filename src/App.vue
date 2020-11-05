<template>
  <div id="app">
    <header>
    <div class='banner'>
      <h1>밤하늘 보호공원</h1>
    </div>
    <nav>
      <ul class='main-manu'>
        <li class='logo'>밤하늘 보호공원</li>
        <li class='submenu'>
          공원소개
          <ul>
            <li>
              <router-link to="/">밤하늘 보호 공원</router-link>
            </li>
            <li>
              <router-link to="/about">빛공해와 밤하늘</router-link>
            </li>
            <li>
              <router-link to="/about">오시는 길</router-link>
            </li>
          </ul>
        </li>
        <li class='submenu'>
          계절별 별자리
          <ul>
            <li>
              별자리 알아보기
            </li>
          </ul>
        </li>
        <li class='submenu'>
          공원 팬션 예약
          <ul>
            <li>
              <router-link to="/reservation">팬션예약</router-link>
            </li>
            <li>문의사항</li>
          </ul>
        </li>
        <li class='submenu'>
          로그인
        </li>
      </ul>
    </nav>
    </header>
    <article></article>
    <footer>
      <div class="footer">
        <p> © 2020 (36518) 경상북도 영양군 수비면 반딧불이로 50</p>
      </div>
    </footer>
  </div>
</template>
