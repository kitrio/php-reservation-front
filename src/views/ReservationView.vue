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
                    class="search-button"
                />
                <br />

            </div>

            <div v-if="isSearch">
                <div class="roomlist"
                    v-for="(room,idx) in roomInfo"
                    :key="idx">
                    <carousel :autoplay="true" :nav="false" :items=1 class="img-carousel">
                        <img v-for="(image,index) in room.image"
                            :key="index"
                            :src=imagepath+image.file_name
                            class="roomimg"
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
                        <button 
                            class="reservation-button"
                            @click="reservation(idx)"
                            >
                            예약하기
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import "flatpickr/dist/flatpickr.css"
import flatPickr from "vue-flatpickr-component"
import { Korean } from "flatpickr/dist/l10n/ko"
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
            roomInfo: null,
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
                .then(response => {
                    if(response.status === 200){
                    this.roomInfo = response.data
                    this.$forceUpdate()
                    this.isSearch = true
                    }
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        alert("로그인이 되어있지 않습니다.")
                        this.$router.push("/")
                    }
                })
            }
        },
        setDate() {
            this.checkIn = new Date(this.date.split('~')[0])
            this.checkOut = new Date(this.date.split('~')[1])
            this.period =  this.dateDiff()
        },
        dateDiff() {
            const checkIn = Date.UTC(this.checkIn.getFullYear(), this.checkIn.getMonth(), this.checkIn.getDate())
            const checkOut = Date.UTC(this.checkOut.getFullYear(), this.checkOut.getMonth(), this.checkOut.getDate())
            
            return Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        },
        reservation(idx) {
            let index = idx
            axios.post("/api/reservation/set", {

                room_number: this.roomInfo[index].room_number,
                checkin: this.checkIn,
                checkout: this.checkOut
            })
            .then(response =>{
                if(response.status === 200){
                    alert('예약 되었습니다.')
                }
            })
            .catch((error) => {
                if (error.response.status === 405) {
                    alert("로그인이 되어있지 않습니다.")
                    this.$router.push("/")
                }
            })
        }
    }
}
</script>

<style scoped>

section {
    padding: 2em;
}

.reservation {
    background-color: rgb(248, 248, 248);
    margin: 2em;
}

.roomlist {
    display: flex;
    flex-direction: row;
    background-color: rgb(248, 248, 248);
    margin: 2em;
}

@media (max-width: 800px) {
    .roomlist {
        display: flex;
        flex-direction: column;
    }
}

.img-carousel {
    max-width: 250px;
    min-width: 200px;
}
.roomimg {
    position: relative;
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

.search-button {
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
