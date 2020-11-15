<template>
    <div id="reservationView">
        <section>
            <h3 class="title">예약하기</h3>
            <div class="reservation">
                <div class="label">인원</div>
                <v-text-field 
                    v-model="people"
                    required
                    :rules="[rules.required]"
                />
                <div class="label">예약날짜</div>
                <flat-pickr
                    v-model="date"
                    :config="config"
                    placeholder="예약일을 선택해주세요"
                    class="calendar"
                />
                <input
                    type="button"
                    @click="searchRoom"
                    value="검색"
                    class="searchButton"
                />
                <br />

            </div>

            <div v-if="isSearch">
                <div class="roomList"
                    v-for="(room,idx) in roomInfo"
                    :key="idx">
                    <carousel :autoplay="true" :nav="false" :items=1 class="imgcarousel">
                        <img v-for="(image,index) in room.image"
                            :key="index"
                            :src=imagepath+image.file_name
                            class="roomImg"
                            >
                    </carousel>
                    <div class="roominfo">
                        <div>
                            <ul>
                                <li>호실</li>
                                <li>크기</li>
                                <li>최대/최소인원</li>
                                <li>1박 요금</li>
                                <li>총 요금</li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>{{ room.room_number}}</li>
                                <li>{{ room.size }}</li>
                                <li>{{ room.min_people}}  /  {{ room.max_people }}</li>
                                <li>{{ room.price }}</li>
                                <li>{{ room.price * period }}</li>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="button-div">
                        <button class="reservation-button">예약하기</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import "flatpickr/dist/flatpickr.css";
import flatPickr from "vue-flatpickr-component";
import { Korean } from "flatpickr/dist/l10n/ko";
import carousel from 'vue-owl-carousel'
export default {
    components: {
        carousel,
        flatPickr
    },
    data() {
        return {
            people: "",
            checkIn: "",
            checkOut: "",
            period: 0,
            isSearch: false,
            roominfo: null,
            config: { //calendar
                wrap: false, // set wrap to true only when using 'input-group'
                altFormat: "Y - M - d",
                dateFormat: "Y-m-d",
                mode: "range",
                locale: Korean,
            },
            date: null,
            idx: 0,
            rules: {
                required: value => !!value || '인원을 입력해주세요',
            },
            imagepath: process.env.VUE_APP_FILE_URL
        }
    },
    methods: {
        validation() {
            if (this.people === "") {
                alert("인원을 입력해주세요")
                
                return false
            } else if (this.date === null || this.checkOut === undefined)
                alert("숙박기간을 선택해주세요")
            else {
                return true
            }
        },
        searchRoom(){
            this.setDate()
            if (this.validation() === true) {
                axios.post("/api/reservation/check", {
                    people: this.people,
                    checkIn: this.checkIn,
                    checkOut: this.checkOut,
                })
                .then(res => {
                    this.roomInfo = res.data
                    this.$forceUpdate()
                    this.isSearch = true
                })
            }
        },
        setDate() {
            this.checkIn = new Date(this.date.split('~')[0])
            this.checkOut = new Date(this.date.split('~')[1])
            this.period =  this.dateDiff()
            console.log(this.checkIn)
        },
        dateDiff() {
            const checkIn = Date.UTC(this.checkIn.getFullYear(), this.checkIn.getMonth(), this.checkIn.getDate());
            const checkOut = Date.UTC(this.checkOut.getFullYear(), this.checkOut.getMonth(), this.checkOut.getDate());
            return Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        }
    }
};
</script>

<style scoped>

section {
    padding: 2em;
}

.reservation {
    background-color: rgb(248, 248, 248);
    margin: 2em;
}

.roomList {
    display: flex;
    flex-direction: row;
    background-color: rgb(248, 248, 248);
    margin: 2em;
}

@media (max-width: 800px) {
    .roomList {
        display: flex;
        flex-direction: column;
    }
}

.imgcarousel {
    max-width: 300px;
    min-width: 200px;
}
.roomImg {
    /* position: relative; */
    height: 200px;
    width: 100%;
}

.roominfo {
    display: flex;
    flex-direction: row;
}

li {
    list-style: none;
    padding: 1em;
}

.label {
    display: inline-block;
    width: 6em;
    padding: 1em;
}

.searchButton {
    padding: 8px;
    background: rgb(100, 100, 100);
    color: #fff;
}

.calendar {
    width: 14em;
    padding: 8px;
}
.button-div {
    display: flex;
    width: 20%;
}
.reservation-button {
    width: 100%;
    
}
</style>
