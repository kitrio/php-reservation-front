<template>
    <div id="reservationView">
        <section>
            <h3 class="title">예약하기</h3>
            <div class="room">
                <SlidePicture
                    v-if="slideImage"
                    :imagesprops="slideImage"
                />
            </div>
            <div class="reservation">
                <div>
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
                        @change="setDate"
                    />
                    <input
                        type="button"
                        @click="searchRoom"
                        value="검색"
                        class="searchButton"
                    />
                    <br />
                </div>
            </div>
            <!-- form -->

            <table v-if="isSearch"
            class="reservation">
                <thead>
                    <tr>
                        <th><!--사진--></th>
                        <th>호실</th>
                        <th>크기</th>
                        <th>최소/최대인원</th>
                        <th>1박 요금</th>
                        <th>총 요금</th>
                    </tr>

                    <tr v-for="(room,idx) in roomInfo"
                        :key="idx">
                        <th></th>
                        <th>{{ room.room_number}}</th>
                        <th>{{ room.size }}평형</th>
                        <th>{{ room.min_people}}  /  {{ room.max_people }}</th>
                        <th>{{ room.price }}</th>
                        <th>{{ room.price }}</th>
                    </tr>
                </thead>
            </table>
        </section>
    </div>
</template>

<script>
import SlidePicture from "@/components/SlidePicture";
import "flatpickr/dist/flatpickr.css";
import flatPickr from "vue-flatpickr-component";
import { Korean } from "flatpickr/dist/l10n/ko";
export default {
    components: {
        SlidePicture,
        flatPickr,
    },
    data() {
        return {
            people: "",
            checkIn: "",
            checkOut: "",
            isRoomEmpty: false,
            isSearch: false,
            roomImage: [require("../assets/slide/room/1f-room.jpg")],
            slideImage: [],
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
            }
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
        searchRoom() {
            this.setDate()
            if (this.validation() === true) {
                axios.post("/api/reservation/check", {
                    people: this.people,
                    checkIn: this.checkIn,
                    checkOut: this.checkOut,
                })
                .then(res => {
                    this.roomInfo = res.data
                    this.isSearch = true
                    this.$forceUpdate()
                })
            }
        },
        setDate() {
            this.checkIn = this.date.split('~')[0]
            this.checkOut = this.date.split('~')[1]
        }
    }
};
</script>

<style scoped>
    section {
        padding: 3em;
    }
    .reservation {
        background-color: rgb(248, 248, 248);
        width: 50em;
        margin: 2em;
    }
    .label {
        display: inline-block;
        width: 5em;
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
</style>
